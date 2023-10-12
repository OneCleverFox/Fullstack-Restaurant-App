import { Link as Base } from 'next/link';

import styled from 'styled-components';

const Link = styled(Base)`
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: 0;
  }
`;

export default Link;
