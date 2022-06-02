import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';

export const ProfileHeader = styled.header`
    display: flex;
    margin-bottom: 20px;

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
}: {
    profileUrl?: string;
    nickName?: string;
    categoryName?: string;
    writtenAt?: string;
}) {
    return (
        <ProfileHeader>
            <div>
                <img src={profileUrl} alt="profile" />
            </div>
            <HeaderSection>
                <HeaderText color={theme.black} bold={true}>
                    {nickName}
                </HeaderText>
                <HeaderText color={theme.gray01} bold={false}>
                    {categoryName} ・ {writtenAt}
                </HeaderText>
            </HeaderSection>
        </ProfileHeader>
    );
}
