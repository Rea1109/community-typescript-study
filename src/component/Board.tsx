import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { replaceText, replaceTitle } from '../commons/util';

export const BoardTitle = styled.h1(({ mb, ml, mr, size }: { mb: string; ml?: string; mr?: string; size: string }) => ({
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    lineHeight: '24px',
    fontSize: size,
}));

export const BoardContent = styled.span(({ ml, mr, size }: { ml?: string; mr?: string; size: string }) => ({
    display: 'block',
    marginBottom: '17px',
    marginLeft: ml,
    marginRight: mr,
    lineHeight: '24px',
    color: theme.gray05,
    fontWeight: 400,
    fontSize: size,
}));

export const BoardImage = styled.img`
    width: 100%;
    height: ${({ height }: { height: string }) => height};
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
    imageUrl?: string[];
    page?: string;
}) {
    return page === 'list' ? (
        <>
            <BoardTitle mb="6px" size="1.6rem">
                {replaceTitle(title || '')}
            </BoardTitle>
            <BoardContent size="1.4rem">{replaceText(content || '')}</BoardContent>
            {imageUrl && imageUrl.length !== 0 && <BoardImage src={imageUrl?.[0]} alt="content" height="160px" />}
        </>
    ) : (
        <>
            <BoardTitle mb="8px" ml="26px" mr="26px" size="1.8rem">
                {title}
            </BoardTitle>
            <BoardContent ml="26px" mr="26px" size="1.6rem">
                {content}
            </BoardContent>
            {imageUrl?.map(url => (
                <BoardImage key={url} src={url} alt="content" height="" />
            ))}
        </>
    );
}
