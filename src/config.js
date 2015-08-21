export default {
  name: "react-isomorphic-starter",
  productionCss: [
    //'/bundle.css',
    '/bundle-lib.css'
  ],
  developmentCss: [
    //'/bundle.css',
    '/bundle-lib.css'
  ],
  productionScripts: [
    '/bundle.js',
    '/bundle-lib.js'
  ],
  developmentScripts: [
    'http://localhost:8080/webpack-dev-server.js',
    'http://localhost:8080/dist/bundle.js',
    '/bundle-lib.js'
  ]
}
