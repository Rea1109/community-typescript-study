export type Category = {
    categoryCode: string;
    categoryName: string;
    id: number;
};

export type BoardContent = {
    categoryName: string;
    categoryPk: number;
    commentCount: number;
    content: string;
    id: number;
    imageUrl: string[];
    likeCount: number;
    title: string;
    viewCount: number;
    writerNickName: string;
    writerProfileUrl: string;
    writtenAt: string;
};

export type InputBoardContent = {
    title: string;
    text: string;
};

export type InputCategory = {
    pk: number;
    name: string;
};
