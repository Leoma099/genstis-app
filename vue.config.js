const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Vue CLI is in maintenance mode, and probably won't merge my PR to fix this in their tooling
        // https://github.com/vuejs/vue-cli/pull/7443
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      })
    ],
  },
  transpileDependencies: true,

  // devServer: {
  //   host: 'genstis.com',  // Your custom domain
  //   port: 8080,           // Port
  //   https: false,          // Set to true if using HTTPS
  //   allowedHosts: [
  //     'genstis.com', // Add your custom domain here
  //     'localhost'    // Allow localhost as well (for fallback)
  //   ],
  // },
});
