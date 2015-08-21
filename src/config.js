export default {
  name: "react-isomorphic-starter",
  productionAPI: '',
  developmentAPI: 'http://localhost:3000/api',
  productionCss: [
    '/bundle-lib.css',
    '/bundle.css'
  ],
  developmentCss: [
    '/bundle-lib.css',
    '/bundle.css'
  ],
  productionScripts: [
    '/bundle.js',
    '/bundle-lib.js'
  ],
  developmentScripts: [
    'http://localhost:8080/webpack-dev-server.js',
    'http://localhost:8080/dist/bundle.js',
    '/bundle-lib.js'
  ],

  get(key) {
    return this[process.env.NODE_ENV === 'production' ? `production${key}` : `development${key}`];
  }
}
