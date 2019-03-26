import React from 'react';

import Auth from './Auth';
// Lib imports
import makerConfig from '../config/makerlog';

const FrontPage = () => (
  <div>
    <Auth name='makerlog' config={ makerConfig } />
  </div>
);

export default FrontPage;
