import React from 'react';

import Auth from './Auth';
import MakerLogFront from './MakerLogFront';

// Lib imports
import makerConfig from '../config/makerlog';

const FrontPage = () => (
  <div>
    <Auth name='makerlog' config={ makerConfig } />
    <MakerLogFront />
  </div>
);

export default FrontPage;
