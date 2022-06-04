export type Category = {
    categoryCode: string;
    categoryName: string;
    id: number;
};

export type Post = {
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
