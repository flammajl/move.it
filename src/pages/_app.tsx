import React from 'react';

import { Provider } from 'next-auth/client';

import '@/styles/global.css';
import { ActivePageProvider } from '@/contexts/ActivePageContext';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ActivePageProvider>
        <Component {...pageProps} />
      </ActivePageProvider>
    </Provider>
  );
}

export default MyApp;
