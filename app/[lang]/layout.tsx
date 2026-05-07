import { type ReactNode } from 'react'
import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import Logo from '@/components/Logo'

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  let pageMap: Awaited<ReturnType<typeof getPageMap>>
  try {
    pageMap = await getPageMap(`/${lang}`)
  } catch (err) {
    console.error('[ecards-layout] getPageMap failed for lang=%s error=%s stack=%s', lang, String(err), err instanceof Error ? err.stack : '')
    throw err
  }

  const navbar = (
    <Navbar
      logo={<Logo />}
      projectLink="https://ecards.cab"
      chatLink="https://t.me/ecards_support"
    />
  )

  const footer = (
    <Footer>
      <div className="flex flex-col gap-2 text-sm text-gray-500">
        <div>
          <strong className="text-gray-800 dark:text-gray-200">eCards</strong> — виртуальные карты для арбитражников
        </div>
        <div className="flex gap-4">
          <a href="https://t.me/ecards_support" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            Поддержка
          </a>
          <a href="https://t.me/eCards_cab" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            Новости
          </a>
          <a href="https://ecards.cab" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
            Сервис
          </a>
        </div>
      </div>
    </Footer>
  )

  return (
    <Layout
      pageMap={pageMap}
      navbar={navbar}
      footer={footer}
      i18n={[
        { locale: 'ru', name: 'Русский' },
        { locale: 'en', name: 'English' },
      ]}
      docsRepositoryBase="https://github.com/shustovyurii-bit/ecards-docs"
      editLink={null}
      feedback={{ content: null }}
      sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
      toc={{ backToTop: 'Наверх' }}
      darkMode
      nextThemes={{ defaultTheme: 'light', attribute: 'class' }}
    >
      {children}
    </Layout>
  )
}
