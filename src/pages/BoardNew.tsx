import React, { useState } from 'react';
import styled from '@emotion/styled';
import backicon from '../assets/images/boardDetail/back.png';
import { theme } from '../commons/theme';

import UploadImage from '../component/UploadImage';

const NewWrapper = styled.main`
    max-width: 360px;
    width: 100%;
    background-color: white;
`;

const NewHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    height: 56px;
    border: 1px solid red;

    img {
        :hover {
            cursor: pointer;
        }
    }
`;

const HeaderButton = styled.button`
    width: 64px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background-color: ${({ disable }: { disable: boolean }) => (disable ? theme.gray05 : theme.primary)};
    color: white;
    font-size: 1.4rem;
    :hover {
        cursor: pointer;
    }
`;

const InputContent = styled.section`
    border: 1px solid gold;
    display: flex;
    flex-direction: column;
`;

const CategorySelect = styled.select`
    height: 45px;
    padding: 10px 0px 11px 20px;
    border: 1px solid ${theme.gray01};
`;

const InputTitle = styled.input`
    height: 45px;
    padding: 10px 0px 11px 20px;
    border: 1px solid ${theme.gray01};
`;

const InputText = styled.textarea`
    height: 179px;
    padding: 10px 0px 11px 20px;
    resize: none;
    border: 1px solid ${theme.gray01};
`;

export default function BoardNew() {
    const [imageUrl, setImageUrl] = useState<string[]>([]);

    const submit = () => {
        console.log(imageUrl);
    };

    return (
        <NewWrapper>
            <NewHeader>
                <img src={backicon} alt="back icon" />
                <h1>글쓰기</h1>
                <HeaderButton disable={false} onClick={submit}>
                    완료
                </HeaderButton>
            </NewHeader>
            <InputContent>
                <CategorySelect name="" id="">
                    <option value="" defaultChecked>
                        카테고리
                    </option>
                    <option value="">대선청원</option>
                    <option value="">자유글</option>
                </CategorySelect>
                <InputTitle type="text" placeholder="제목을 작성해주세요" />
                <InputText placeholder="내용을 작성해주세요" />
            </InputContent>
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </NewWrapper>
    );
}
