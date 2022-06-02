import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { replaceText, replaceTitle } from '../commons/util';

export const BoardTitle = styled.h1(({ mb, size }: { mb: string; size: string }) => ({
    marginBottom: mb,
    fontSize: size,
}));

export const BoardContent = styled.span`
    display: block;
    margin-bottom: 17px;
    color: ${theme.gray05};
    font-weight: 400;
    font-size: ${({ size }: { size: string }) => size};
`;

export const BoardImage = styled.img`
    width: 100%;
    height: 160px;
    border-radius: 4px;
    object-fit: cover;
`;

export default function Board({
    title,
    content,
    imageUrl,
    page,
}: {
    title?: string;
    content?: string;
    imageUrl?: string | null;
    page?: string;
}) {
    return page === 'list' ? (
        <>
            <BoardTitle mb="6px" size="1.6rem">
                {replaceTitle(title || '')}
            </BoardTitle>
            <BoardContent size="1.4rem">{replaceText(content || '')}</BoardContent>
            {imageUrl && <BoardImage src={imageUrl} alt="content" />}
        </>
    ) : (
        <>
            <BoardTitle mb="8px" size="1.8rem">
                {title}
            </BoardTitle>
            <BoardContent size="1.6rem">{content}</BoardContent>
            {imageUrl && <BoardImage src={imageUrl} alt="content" />}
        </>
    );
}
