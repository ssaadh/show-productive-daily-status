import React from 'react';

import Auth from './Makerlog';
// Lib imports
import makerConfig from '../config/makerlog';

const FrontPage = () => (
  <div>
    <Auth name='makerlog' config={ makerConfig } />
  </div>
);

export default FrontPage;
