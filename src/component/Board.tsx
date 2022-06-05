import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { checkLink, replaceText, replaceTitle } from '../commons/util';
import { v4 as uuidv4 } from 'uuid';

export const BoardTitle = styled.h1(({ mb, ml, mr, size }: { mb: string; ml?: string; mr?: string; size: string }) => ({
    marginBottom: mb,
    marginLeft: ml,
    marginRight: mr,
    lineHeight: '24px',
    fontFamily: theme.title,
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
    fontFamily: theme.text,
    fontSize: size,
}));

export const BoardContentLink = styled.span`
    margin: 0px 5px;
    color: ${theme.primary};
`;

export const BoardContentText = styled.span`
    display: inline-block;
    margin-left: 10px;
`;

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
    const onClickLink = (value: string) => () => {
        window.open(value);
    };

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
                {checkLink(content || '').map(el =>
                    el.includes('https') ? (
                        <BoardContentLink key={uuidv4()} onClick={onClickLink(el)}>
                            {el}
                        </BoardContentLink>
                    ) : (
                        <React.Fragment key={uuidv4()}>{el} </React.Fragment>
                    )
                )}
            </BoardContent>
            {imageUrl?.map(url => (
                <BoardImage key={uuidv4()} src={url} alt="content" height="auto" />
            ))}
        </>
    );
}
