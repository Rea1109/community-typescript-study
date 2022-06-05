import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { replaceDate } from '../commons/util';

export const ProfileHeader = styled.header`
    display: flex;
    margin: ${({ page }: { page: string | undefined }) =>
        page === 'detail' ? '0px 20px 20px 20px' : '0px 0px 20px 0px'};

    div {
        width: 32px;
        height: 32px;

        img {
            width: 100%;
            height: 100%;
        }
    }
`;

export const HeaderSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 7px;
`;

export const HeaderText = styled.span`
    color: ${({ color }) => color};
    font-weight: ${({ bold }: { bold: boolean }) => (bold ? 700 : 500)};
    font-size: 1.2rem;
`;

export default function Profile({
    profileUrl,
    nickName,
    categoryName,
    writtenAt,
    page,
}: {
    profileUrl?: string;
    nickName?: string;
    categoryName?: string;
    writtenAt?: string;
    page?: string;
}) {
    return (
        <ProfileHeader page={page}>
            <div>
                <img src={profileUrl} alt="profile" />
            </div>
            <HeaderSection>
                <HeaderText color={theme.black} bold={true}>
                    {nickName}
                </HeaderText>
                <HeaderText color={theme.gray01} bold={false}>
                    {categoryName} ・ {replaceDate(writtenAt || '')}
                </HeaderText>
            </HeaderSection>
        </ProfileHeader>
    );
}
