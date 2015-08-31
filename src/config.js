export default {
  name: 'react-isomorphic-starter',

  production: {
    API: '',
    Css: [
      '/bundle-lib.css',
      '/bundle.css'
    ],
    Scripts: [
      '/bundle-lib.js',
      '/bundle.js'
    ]
  },

  development: {
    API: 'http://localhost:3000/api',
    Css: [
      '/bundle-lib.css',
      '/bundle.css'
    ],
    Scripts: [
      '/bundle-lib.js',
      'http://localhost:8080/webpack-dev-server.js',
      'http://localhost:8080/dist/bundle.js'
    ]
  },

  get(key) {
    return this[process.env.NODE_ENV === 'production' ? `production` : `development`][key];
  }
}
