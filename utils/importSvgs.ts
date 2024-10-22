const importAll = (r: __WebpackModuleApi.RequireContext) => {
  return r.keys().map(r);
};

export const svgs = importAll(
  require.context("../public/devicons-SVGs", false, /\.svg$/)
);
