// config/plugin.ts
const webpackPlugin = (config: any) => {
  config.merge({
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        automaticNameDelimiter: '.',
        cacheGroups: {
          lfpantdesigns: {
            name: 'antdesigns',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](antd|@ant-design)/,
            priority: 10,
          },
          lfpvendors: {
            name: 'vendors',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](lodash|moment|react|postcss)/,
            priority: 10,
          },
          rctree: {
            name: 'rctree',
            test: /[\\/]node_modules[\\/]rc-tree/,
            chunks: 'all',
            priority: -1,
          },
          rcselect: {
            name: 'rcselect',
            test: /[\\/]node_modules[\\/]rc-rcselect/,
            chunks: 'all',
            priority: -1,
          },
          // // 最基础的
          // 'async-commons': {
          //   // 其余异步加载包
          //   name: 'async-commons',
          //   chunks: 'async',
          //   minChunks: 2,
          //   priority: 2,
          // },
          lfpcommons: {
            name: 'commons',
            // 其余同步加载包
            chunks: 'all',
            minChunks: 2,
            priority: 1,
            // 这里需要注意下，webpack5会有问题， 需加上这个 enforce: true，
            // refer: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/257#issuecomment-432594711
            enforce: true,
          },
        },
      },
    },
  })
}

export default webpackPlugin
