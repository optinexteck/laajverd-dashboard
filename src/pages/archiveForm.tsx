import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SignInView } from 'src/sections/auth/sign-in-view';
import {ArchiveForm} from 'src/sections/Forms/archiveForm'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Archive Form - ${CONFIG.appName}`}</title>
      </Helmet>

      <ArchiveForm />
    </>
  );
}
