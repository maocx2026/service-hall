let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
if (publicPath.lastIndexOf('/') !== publicPath.length - 1) {
  publicPath += '/';
}

export const PUBLIC_PATH = publicPath;
