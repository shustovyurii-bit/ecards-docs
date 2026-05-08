import type { ComponentType, ReactNode } from 'react'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath', 'lang')

export async function generateMetadata(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  const params = await props.params
  console.error('[D] generateMetadata lang=%s mdxPath=%s', params.lang, JSON.stringify(params.mdxPath))
  try {
    const { metadata } = await importPage(params.mdxPath, params.lang)
    console.error('[D] generateMetadata ok lang=%s', params.lang)
    return metadata
  } catch (err) {
    console.error('[D] generateMetadata FAIL lang=%s err=%s', params.lang, String(err))
    throw err
  }
}

export default async function Page(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  console.error('[D] Page start')
  const params = await props.params
  console.error('[D] Page params lang=%s mdxPath=%s', params.lang, JSON.stringify(params.mdxPath))
  let MDXContent: ComponentType<{ params: typeof params }>
  let toc: unknown
  let metadata: unknown
  try {
    ;({ default: MDXContent, toc, metadata } = await importPage(params.mdxPath, params.lang))
    console.error('[D] Page importPage ok lang=%s mdxPath=%s', params.lang, JSON.stringify(params.mdxPath))
  } catch (err) {
    console.error('[D] Page importPage FAIL lang=%s mdxPath=%s err=%s', params.lang, JSON.stringify(params.mdxPath), String(err))
    throw err
  }

  const Wrapper = useMDXComponents({}).wrapper as ComponentType<{
    toc: unknown
    metadata: unknown
    children: ReactNode
  }>
  console.error('[D] Page returning JSX lang=%s mdxPath=%s', params.lang, JSON.stringify(params.mdxPath))

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent params={params} />
    </Wrapper>
  )
}
