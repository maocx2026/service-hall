let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
if (publicPath.lastIndexOf('/') !== publicPath.length - 1) {
  publicPath += '/';
}

// const PUBLIC_PATH = publicPath;

// const apis = {
//   LOCAL_SZLIB_WX_API_BASE_URL: `${PUBLIC_PATH}x-szlib-wx-api`,
//   LOCAL_OPAC_API_BASE_URL: `${PUBLIC_PATH}x-szlib-opac-api`,
// };

const urls = {
  // [apis.LOCAL_SZLIB_WX_API_BASE_URL]: process.env.VUE_APP_SZLIB_WX_API_BASE_URL,
  // [apis.LOCAL_OPAC_API_BASE_URL]: process.env.VUE_APP_OPAC_API_BASE_URL,
};

// 开发环境下使用
const useDevApi = () => {
  const config = {};
  Object.entries(urls).forEach(([localUrl, remoteUrl]) => {
    Object.assign(config, {
      [localUrl]: {
        target: remoteUrl,
        secure: true,
        changeOrigin: true,
      },
    });
  });
  return config;
};

// eslint-disable-next-line no-undef
module.exports = useDevApi;
