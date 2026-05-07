import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'lang')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  const params = await props.params
  console.error('[D] generateMetadata mdxPath=%s lang=%s', JSON.stringify(params.mdxPath), params.lang)
  try {
    const { metadata } = await importPage(params.mdxPath, params.lang)
    console.error('[D] generateMetadata ok title=%s', metadata?.title)
    return metadata
  } catch (err) {
    console.error('[D] generateMetadata FAIL mdxPath=%s lang=%s err=%s', JSON.stringify(params.mdxPath), params.lang, String(err))
    throw err
  }
}

const Wrapper = useMDXComponents({}).wrapper as React.ComponentType<{
  toc: unknown
  metadata: unknown
  children: React.ReactNode
}>

export default async function Page(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  const params = await props.params
  console.error('[D] Page start mdxPath=%s lang=%s', JSON.stringify(params.mdxPath), params.lang)
  let result: Awaited<ReturnType<typeof importPage>>
  try {
    result = await importPage(params.mdxPath, params.lang)
    console.error('[D] Page importPage ok mdxPath=%s lang=%s toc=%s', JSON.stringify(params.mdxPath), params.lang, Array.isArray(result.toc) ? result.toc.length : typeof result.toc)
  } catch (err) {
    console.error('[D] Page importPage FAIL mdxPath=%s lang=%s err=%s stack=%s', JSON.stringify(params.mdxPath), params.lang, String(err), err instanceof Error ? err.stack : '')
    throw err
  }
  const { default: MDXContent, toc, metadata } = result

  console.error('[D] Page returning JSX mdxPath=%s lang=%s Wrapper=%s', JSON.stringify(params.mdxPath), params.lang, typeof Wrapper)
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
