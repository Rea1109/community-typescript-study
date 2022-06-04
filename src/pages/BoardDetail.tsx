import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../commons/types';
import Board from '../component/Board';
import Profile from '../component/Profile';
import styled from '@emotion/styled';
import likeicon from '../assets/images/boardDetail/like-btn.png';
import commenticon from '../assets/images/boardDetail/comment-btn.png';
import backicon from '../assets/images/boardDetail/back.png';

import { theme } from '../commons/theme';

const DetailWrapper = styled.main`
    max-width: 360px;
    width: 100%;
    background-color: white;
`;

const DetailHeader = styled.header`
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 56px;

    span {
        margin-left: 11px;
        color: #b4b4b4;
        font-weight: 700;
        font-size: 1.4rem;

        :hover {
            cursor: pointer;
        }
    }

    img {
        :hover {
            cursor: pointer;
        }
    }
`;

const DetailFooter = styled.footer`
    display: flex;
    padding: 15px 0px 15px 25px;

    section {
        display: flex;
        align-items: center;
        margin-right: 10px;
        padding: 9px;
        height: 32px;
        border-radius: 6px;
        background-color: ${theme.gray04};

        :hover {
            cursor: pointer;
        }

        span {
            margin-left: 5px;
            color: ${theme.gray05};
            font-size: 1.2rem;
        }
    }
`;

export default function BoardDetail() {
    const [board, setBoard] = useState<Post>();
    const [isLike, setIsLike] = useState(false);
    const { post_pk: id } = useParams();
    const route = useNavigate();

    const getBoard = async (id: string | undefined) => {
        const { data } = await axios.get(`http://localhost:3001/posts/${id}`);
        setBoard(data);
    };

    const updateLikeCount = async () => {
        if (isLike) return;
        setIsLike(true);
        await axios.patch(`http://localhost:3001/posts/${id}`, {
            likeCount: (board?.likeCount || 0) + 1,
        });
        getBoard(id);
    };

    const onClickBack = () => {
        route('/community');
    };

    const onClickLike = () => {
        updateLikeCount();
    };

    useEffect(() => {
        getBoard(id);
    }, []);

    return (
        <DetailWrapper>
            <DetailHeader onClick={onClickBack}>
                <img src={backicon} alt="back icon" />
                <span>글 목록으로</span>
            </DetailHeader>
            <Profile
                profileUrl={board?.writerProfileUrl}
                nickName={board?.writerNickName}
                categoryName={board?.categoryName}
                writtenAt={board?.writtenAt}
                page="detail"
            />
            <Board title={board?.title} content={board?.content} imageUrl={board?.imageUrl} page="detail" />
            <DetailFooter>
                <section onClick={onClickLike}>
                    <img src={likeicon} alt="like-icon" />
                    <span>{board?.likeCount}</span>
                </section>
                <section>
                    <img src={commenticon} alt="comment-icon" />
                    <span>{board?.commentCount}</span>
                </section>
            </DetailFooter>
        </DetailWrapper>
    );
}
