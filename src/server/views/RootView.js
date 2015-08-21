import React, { PropTypes } from 'react'

class RootView extends React.Component {
  render () {

    let scripts;

    if(process.env.NODE_ENV === 'production') {
      scripts = [
        <script src="/bundle.js" key={1}></script>
      ]
    } else {
      scripts = [
        <script src="http://localhost:8080/webpack-dev-server.js" key={1}></script>,
        <script src="http://localhost:8080/dist/bundle.js" key={2}></script>
      ]
    }

    return (
      <html>
        <head>
          <title>React Isomorphic Starter</title>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
        </head>
        <body>
          <div id="root-view" dangerouslySetInnerHTML={{__html: this.props.html}}>
          </div>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(this.props.data)};`}} />
          {scripts}
        </body>
      </html>
    )
  }
}

export default RootView;
