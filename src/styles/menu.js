import styled from 'styled-components';

export const FlexRow = styled.div`
    display: flex;
    flex-direction: column;
    background: ${props => props.background};
    color: ${props => props.color};
    height: 100vh;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const Item = styled.div`
    flex: 1;
    overflow: auto;
`;

export const Header = styled.header`
    height: auto;
`;

export const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    height: 50px;
`;

export default FlexColumn;