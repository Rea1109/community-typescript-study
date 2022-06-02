import styled from '@emotion/styled';
import { theme } from '../../commons/theme';

export const Title = styled.h1`
    padding-top: 34px;
    padding-left: 30px;
    background-color: white;
    font-family: ${theme.title};
    font-size: 2.2rem;
`;

export const Navbar = styled.nav`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 46px;
    background-color: white;
    overflow-x: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    ul {
        display: flex;
        width: 100%;
        margin-left: 22px;
        list-style: none;

        li {
            height: 38px;
            margin: 0px 2px;
            padding: 0px 16px;
            border: 1px solid ${theme.gray02};
            border-radius: 20px;
            text-align: center;
            line-height: 35px;
            color: ${theme.gray05};

            :hover {
                background-color: ${theme.primary};
                color: white;
                cursor: pointer;
            }
        }

        span {
            white-space: nowrap;
            font-family: ${theme.title};
            font-size: 1.4rem;
        }
    }
`;

export const Main = styled.section`
    width: 100%;
    margin-bottom: 6px;
    padding: 20px 30px;
    background-color: white;
    font-family: ${theme.text};

    :hover {
        cursor: pointer;
    }
`;

export const MainContent = styled.section`
    margin-bottom: 15px;
`;

export const MainFooter = styled.footer`
    display: flex;

    section {
        display: flex;
        margin-right: 22px;

        img {
            margin-right: 5px;
            object-fit: contain;
        }
        span {
            color: ${theme.gray05};
            font-size: 1.2rem;
        }
    }
`;
