import React, { useState, useEffect, MouseEvent } from 'react';

import viewicon from '../../assets/images/eye.png';
import likeicon from '../../assets/images/like.png';
import commenticon from '../../assets/images/comment.png';
import { Title, Navbar, Main, MainContent, MainFooter } from './CommunityList.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../../component/Profile';
import Board from '../../component/Board';

type Category = {
    categoryCode: string;
    categoryName: string;
    id: number;
};

type Post = {
    categoryName: string;
    categoryPk: number;
    commentCount: number;
    content: string;
    id: number;
    imageUrl: null | string;
    likeCount: number;
    title: string;
    viewCount: number;
    writerNickName: string;
    writerProfileUrl: string;
    writtenAt: string;
};

export default function CommunityList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const route = useNavigate();

    const getCategories = async () => {
        const { data } = await axios.get('http://localhost:3001/categories');
        setCategories(data);
    };

    const getCommunityList = async () => {
        const { data } = await axios.get('http://localhost:3001/posts');
        setPosts(data);
    };

    const getData = async (category: number) => {
        const { data } = await axios.get(`http://localhost:3001/posts?categoryPk=${category}`);
        setPosts(data);
    };

    const getData2 = async () => {
        const { data } = await axios.get(`http://localhost:3001/posts?viewCount_gte=100`);
        setPosts(data);
    };

    const clickCategory = (id: number) => (event: MouseEvent<HTMLElement>) => {
        getData(id);
    };

    const clickPost = (id: number) => (event: MouseEvent<HTMLElement>) => {
        route(`/community/post/${id}`);
    };

    useEffect(() => {
        getCategories();
        getCommunityList();
    }, []);

    return (
        <React.Fragment>
            <Title>커뮤니티</Title>
            <Navbar>
                <ul>
                    <li onClick={getCommunityList}>
                        <span>전체</span>
                    </li>
                    <li onClick={getData2}>
                        <span>⭐️ 인기글</span>
                    </li>
                    {categories.map(el => (
                        <li key={el.id} onClick={clickCategory(el.id)}>
                            <span>{el.categoryName}</span>
                        </li>
                    ))}
                </ul>
            </Navbar>
            {posts.map(el => (
                <Main key={el.id} onClick={clickPost(el.id)}>
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
        </React.Fragment>
    );
}
