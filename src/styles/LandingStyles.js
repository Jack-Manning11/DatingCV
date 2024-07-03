import styled from 'styled-components';
import { Link } from 'wouter';

export const LandingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const StartButton = styled.div`
    width: 25vw;
    height: 10vh;
    background-color: #15788C;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    &:hover {
        background-color: #00B9BE;
        color: #46425E;
    }
`

export const Title = styled.h1`
    padding-bottom: 50px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
`