import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RegisterView from 'src/sections/auth/regiter-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
