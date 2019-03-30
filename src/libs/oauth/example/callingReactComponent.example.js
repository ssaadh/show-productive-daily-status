import React from 'react';
import Auth from './reactComponent.example';

// Lib imports
import tokenConfig from './config-token.example';
import codeConfig from './config-code.example';

const Calling = () => (
  <div>
    <Auth name='tokenAuth' config={ tokenConfig } />
    <Auth name='codeAuth' config={ codeConfig } />
  </div>
);

export default Calling;
