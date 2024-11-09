import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {GlossaryForm} from 'src/sections/Forms/glossaryForm'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Glossary Form - ${CONFIG.appName}`}</title>
      </Helmet>

      <GlossaryForm />
    </>
  );
}
