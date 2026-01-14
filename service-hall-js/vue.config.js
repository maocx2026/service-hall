const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const useDevApi = require('./env-proxy');

let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
if (publicPath.lastIndexOf('/') !== publicPath.length - 1) {
  publicPath += '/';
}

const templateFunction = function (data) {
  const shared = '.spirte { background-image: url(I);background-size: Wpx Hpx;}'
    .replace('I', data.sprites[0].image)
    .replace('W', data.spritesheet.width / 2)
    .replace('H', data.spritesheet.height / 2);
  const perSprite = data.sprites
    .map((sprite) => {
    return '.spirte-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width / 2)
      .replace('H', sprite.height / 2)
      .replace('X', sprite.offset_x / 2)
      .replace('Y', sprite.offset_y / 2);
})
.join('\n');
  return `${shared}\n${perSprite}`;
};


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  chainWebpack: (config) => {
  config.plugin('define').tap((definitions) => {
    Object.assign(definitions[0], {
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    });
return definitions;
});
},
/*
devServer: {
  port: process.env.VUE_APP_PORT || 8080,
    proxy: {
  ...useDevApi(),
  },
},
*/
devServer: {
  proxy: {
    '/api': {
      target:'http://10.0.42.35:10105',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, //10.0.42.35:10105
      //  pathRewrite: { '^/api': '/api' },   // http://58.60.2.84:8881
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {
        console.log('[Proxy] Request:', req.method, req.url);
      },
      onError: (err, req, res) => {
        console.error('[Proxy] Error:', err.message);
      }
    }
  }
},

publicPath,

  configureWebpack: (config) => {
  // 生成的sprite图片存放地址
  // eslint-disable-next-line no-param-reassign
  config.resolve.modules = ['node_modules', './src/assets/img'];
  const Plugins = [
    new SpritesmithPlugin({
      // 目标小图片
      src: {
        cwd: path.resolve(__dirname, './src/assets/img/sprit-icon'),
        glob: '*.png',
      },
      // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式
      target: {
        image: path.resolve(__dirname, './src/assets/img/sprite.png'),
        css: [
          [path.resolve(__dirname, './src/styles/sprite.less'), {
            // 引用自己的模板
            format: 'function_based_template',
          }],
        ],
      },
      // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
      customTemplates: {
        function_based_template: templateFunction,
      },
      // 样式文件中调用雪碧图地址写法（Readme这么写的）
      apiOptions: {
        cssImageRef: '~sprite.png',
      },
      // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
      spritesmithOptions: {
        padding: 20,
      },
    }),
  ];
  // config里面，覆盖掉以前的，要不然不好使
  // eslint-disable-next-line no-param-reassign
  config.plugins = [...config.plugins, ...Plugins];
},
});

