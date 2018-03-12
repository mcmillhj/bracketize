import React from 'react';
import { Redirect } from 'react-router-dom';

import withAuthorization from 'hoc/withAuthorization';

export default withAuthorization(() => (
  <Redirect to={'/brackets'} />
));
