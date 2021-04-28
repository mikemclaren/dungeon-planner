import { ColorModeScript } from '@chakra-ui/color-mode';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './components/AppRouter';
import theme from './theme';

function render() {
  ReactDOM.render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AppRouter />
    </>,
    document.getElementById('root'),
  );
}

declare let module: { hot: any };

if (module.hot) {
  module.hot.accept('./components/AppRouter', () => {
    // eslint-disable-next-line global-require
    const NewApp = require('./components/AppRouter').default;

    ReactDOM.render(
      <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NewApp />
      </>,
      document.getElementById('root'),
    );
  });
}

render();
