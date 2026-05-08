import type { ComponentType, ReactNode } from 'react'
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

export default async function Page(props: {
  params: Promise<{ mdxPath: string[]; lang: string }>
}) {
  const params = await props.params
  const { default: MDXContent, toc, metadata } = await importPage(params.mdxPath, params.lang)

  const Wrapper = useMDXComponents({}).wrapper as ComponentType<{
    toc: unknown
    metadata: unknown
    children: ReactNode
  }>

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent params={params} />
    </Wrapper>
  )
}
