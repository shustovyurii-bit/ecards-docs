import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'lang')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  return metadata
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
  let result: Awaited<ReturnType<typeof importPage>>
  try {
    result = await importPage(params.mdxPath, params.lang)
  } catch (err) {
    console.error('[ecards-page] importPage failed mdxPath=%s lang=%s error=%s stack=%s', params.mdxPath, params.lang, String(err), err instanceof Error ? err.stack : '')
    throw err
  }
  const { default: MDXContent, toc, metadata } = result

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
