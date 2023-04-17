import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
`;

export const Flex = styled.div`
    width: auto;
`;

export const FlexItem = styled.div`
    padding: 5px;
`;

export const Header = styled.header`
    font-weight: bold;
`;

export default Container;