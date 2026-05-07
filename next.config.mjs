import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})
