import React, { useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import viewicon from '../assets/images/boardList/eye.png';
import likeicon from '../assets/images/boardList/like.png';
import commenticon from '../assets/images/boardList/comment.png';
import Profile from '../component/Profile';
import Board from '../component/Board';
import { Post } from '../commons/types';
import { theme } from '../commons/theme';
import Navbar from '../component/Navbar';
import axios from 'axios';

export const ListWrapper = styled.div`
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

export const MainWrapper = styled.main``;

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
    top: 80%;
    right: 5%;
    width: 100px;
    height: 52px;
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
    const [boards, setBoards] = useState<Post[]>([]);
    const route = useNavigate();

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

    return (
        <ListWrapper>
            <NewButton onClick={onClickNewBoard}>글쓰기 ✍️</NewButton>
            <Title>커뮤니티</Title>
            <Navbar setBoards={setBoards} />
            <MainWrapper>
                {boards.map((el, index) => (
                    <Main key={el.id} onClick={onClickBoard(el.id, index)}>
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
            </MainWrapper>
        </ListWrapper>
    );
}
