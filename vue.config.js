module.exports = {

  publicPath: '/',

  devServer: {
    proxy: '' //http://xxxxxx
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
