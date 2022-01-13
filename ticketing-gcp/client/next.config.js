// this file will load up automatically by nextjs whenever project starts up
// nextjs then will attempt to read this thing in, it will look into webpackDevMiddleware function
// and it's going to call it with middlepack configuration that it created by default
// we a changing a single option, to tell a webpack to instead of watching files in some automated fashion,
// do a complete pull every XXXX ms (e.g. = 300 ms)
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 1000;
    return config;
  },
};
