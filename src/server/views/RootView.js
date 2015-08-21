import React, { PropTypes } from 'react';
import config from 'config';

class RootView extends React.Component {
  render () {

    let scriptList = config[(process.env.NODE_ENV === 'production') ? 'productionScripts' : 'developmentScripts'];

    let scripts = scriptList.map((script, k) => {
      return <script src={script} key={k}></script>
    });

    let cssList = config[(process.env.NODE_ENV === 'production') ? 'productionCss' : 'developmentCss'];

    let css = cssList.map((css, k) => {
      return <link rel="stylesheet" href={css} key={k} />
    });

    return (
      <html>
        <head>
          <title>{config.name}</title>
          <meta charSet="utf-8" />
          {css}
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
