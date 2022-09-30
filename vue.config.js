module.exports = {
    devServer: {
        allowedHosts: "all"
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    },

    pwa: {
      themeColor: '#808000',
      msTileColor: '#ffffff',
      name: 'Bob Menu'
    }
};
