import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  box-shadow: 0 6px 6px rgba(0 0 0 /6%);
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
`;

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
`;

// export const HeaderIcon = styled(Link)`
//   margin-top: -0.5rem;
//   svg {
//     fill: #ee4d2d;
//     height: 4.2rem;
//     width: auto;
//   }
// `;\

export const HeaderIcon = styled.div`
   svg {
     fill: #ee4d2d;
    height: 4.2rem;
    width: auto;
  }
`

export const HeaderTitle = styled.div`
  color: #222;
  margin-left: 1.2rem;
  font-size: 2.4rem;
`;
