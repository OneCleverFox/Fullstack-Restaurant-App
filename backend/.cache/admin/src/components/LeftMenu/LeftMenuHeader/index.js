import React from 'react';
import Link from 'next/link';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <span className="projectName" />
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
