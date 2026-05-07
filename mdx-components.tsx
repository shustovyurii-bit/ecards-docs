import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Frame from '@/components/Frame'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const themeComponents = getThemeComponents()
  return {
    ...themeComponents,
    img: ({ src, alt, ...props }) => (
      <Frame caption={alt}>
        <Image
          src={src as string}
          alt={alt ?? ''}
          width={1200}
          height={800}
          style={{ width: '100%', height: 'auto' }}
          {...(props as object)}
        />
      </Frame>
    ),
    a: ({ href, children, ...props }) => {
      const isExternal = typeof href === 'string' && href.startsWith('http')
      return (
        <a
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {children}
        </a>
      )
    },
    ...components,
  }
}
