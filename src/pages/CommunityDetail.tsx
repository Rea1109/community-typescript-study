import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from '../component/Board';
import Profile from '../component/Profile';

type Post = {
    categoryName: string;
    categoryPk: number;
    commentCount: number;
    content: string;
    id: number;
    imageUrl: string | null | undefined;
    likeCount: number;
    title: string;
    viewCount: number;
    writerNickName: string;
    writerProfileUrl: string;
    writtenAt: string;
};

export default function CommunityDetail() {
    const [posts, setPosts] = useState<Post>();
    const { post_pk: id } = useParams();

    const getPost = async (id: string | undefined) => {
        const { data } = await axios.get(`http://localhost:3001/posts/${id}`);
        setPosts(data);
    };

    useEffect(() => {
        getPost(id);
    }, []);

    return (
        <div>
            <Profile
                profileUrl={posts?.writerProfileUrl}
                nickName={posts?.writerNickName}
                categoryName={posts?.categoryName}
                writtenAt={posts?.writtenAt}
            />
            <Board title={posts?.title} content={posts?.content} imageUrl={posts?.imageUrl} page="detail" />
        </div>
    );
}
