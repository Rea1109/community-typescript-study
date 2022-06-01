import React from 'react';
import styled from '@emotion/styled';

const Navbar = styled.nav`
    max-width: 1440px;
    width: 100%;
    padding-top: 34px;
    padding-left: 30px;
    border: 1px solid red;

    ul {
        display: flex;
        width: 100%;
        height: 100px;
        list-style: none;
        border: 1px solid blue;
    }
`;

export default function CommunityList() {
    return (
        <Navbar>
            <h1>커뮤니티</h1>
            <ul>
                <li>전체</li>
                <li>인기글</li>
                <li>대선청원</li>
                <li>자유글</li>
                <li>뉴스</li>
                <li>노하우</li>
                <li>질문/답변</li>
            </ul>
        </Navbar>
    );
}
