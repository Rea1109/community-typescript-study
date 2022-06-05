import React, { useState, MouseEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import viewicon from '../assets/images/boardList/eye.png';
import likeicon from '../assets/images/boardList/like.png';
import commenticon from '../assets/images/boardList/comment.png';
import Profile from '../component/Profile';
import Board from '../component/Board';
import { BoardContent } from '../commons/types';
import { theme } from '../commons/theme';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const ListWrapper = styled.div`
    position: relative;
    max-width: 360px;
    width: 100%;
`;

export const Title = styled.h1`
    padding-top: 34px;
    padding-left: 30px;
    background-color: white;
    font-family: ${theme.title};
    font-size: 2.2rem;
`;

export const MainWrapper = styled.main`
    position: relative;
`;

export const Main = styled.section`
    width: 100%;
    margin-bottom: 6px;
    padding: 20px 30px;
    background-color: white;
    font-family: ${theme.text};
`;

export const MainContent = styled.section`
    margin-bottom: 15px;

    :hover {
        cursor: pointer;
    }
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

const NewButton = styled.button`
    position: fixed;
    top: 660px;
    right: 20px;
    width: 100px;
    height: 52px;
    margin-left: 250px;
    padding: 14px 16px;
    border: none;
    border-radius: 8px;
    background-color: ${theme.primary};
    color: white;
    font-size: 1.6rem;

    :hover {
        cursor: pointer;
    }
`;

export default function BoardList() {
    const [boards, setBoards] = useState<BoardContent[]>([]);
    const route = useNavigate();
    let isThrottle = false;

    const updateViewCount = async (id: number, index: number) => {
        await axios.patch(`http://localhost:3001/posts/${id}`, {
            viewCount: (boards[index]?.viewCount || 0) + 1,
        });
    };

    const onClickBoard = (id: number, index: number) => (event: MouseEvent<HTMLElement>) => {
        route(`/community/post/${id}`);
        updateViewCount(id, index);
    };

    const onClickNewBoard = () => {
        route('/community/post/new');
    };

    const onWheel = () => {
        if (!isThrottle) {
            isThrottle = true;
            setListScrollY();
            setTimeout(() => {
                isThrottle = false;
            }, 300);
        }
    };

    const setListScrollY = () => {
        localStorage.setItem('Y', String(window.scrollY));
    };

    useEffect(() => {
        window.scrollTo(0, Number(localStorage.getItem('Y')));
    });

    return (
        <ListWrapper onWheel={onWheel}>
            <Title>커뮤니티</Title>
            <Navbar setBoards={setBoards} />
            <MainWrapper>
                {boards.map((el, index) => (
                    <Main key={uuidv4()} onClick={onClickBoard(el.id, index)}>
                        <Profile
                            profileUrl={el.writerProfileUrl}
                            nickName={el.writerNickName}
                            categoryName={el.categoryName}
                            writtenAt={el.writtenAt}
                        />
                        <MainContent>
                            <Board title={el.title} content={el.content} imageUrl={el.imageUrl} page="list" />
                        </MainContent>
                        <MainFooter>
                            <section>
                                <img src={viewicon} alt="view-icon" />
                                <span>{el.viewCount}</span>
                            </section>
                            <section>
                                <img src={likeicon} alt="like-icon" />
                                <span>{el.likeCount}</span>
                            </section>
                            <section>
                                <img src={commenticon} alt="comment-icon" />
                                <span>{el.commentCount}</span>
                            </section>
                        </MainFooter>
                    </Main>
                ))}
                <NewButton onClick={onClickNewBoard}>글쓰기 ✍️</NewButton>
            </MainWrapper>
        </ListWrapper>
    );
}
