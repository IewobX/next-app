const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  /* config options here */
})


module.exports = (phase, { defaultConfig }) => {
    return withBundleAnalyzer({
        webpack: (config, { webpack, isServer, dev }) => {
            return config; 
        }
    })
}
