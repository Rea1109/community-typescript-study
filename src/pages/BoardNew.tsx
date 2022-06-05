import React, { ChangeEvent, useContext, useState } from 'react';
import styled from '@emotion/styled';
import backicon from '../assets/images/boardDetail/back.png';
import { theme } from '../commons/theme';

import UploadImage from '../component/UploadImage';
import { CategoryContext } from '../contexts/CategoryContext';
import { useNavigate } from 'react-router-dom';
import { InputBoardContent, InputCategory } from '../commons/types';
import axios from 'axios';
import SelectCategory from '../component/SelectCategory';

const NewWrapper = styled.main`
    max-width: 360px;
    width: 100%;
    background-color: white;
    font-family: ${theme.title};
`;

const NewHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    height: 56px;

    h1 {
        margin-left: 20px;
    }

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
    background-color: ${({ able }: { able: boolean }) => (able ? theme.primary : theme.gray05)};
    color: white;
    font-size: 1.4rem;
    :hover {
        cursor: pointer;
    }
`;

const InputContent = styled.section`
    display: flex;
    flex-direction: column;
`;

const InputTitle = styled.input`
    height: 45px;
    padding: 10px 0px 11px 20px;
    border: none;
    border-top: 1px solid #e8e8e8;
    font-family: ${theme.text};
    font-size: 1.4rem;

    ::placeholder {
        color: ${theme.gray01};
        font-family: ${theme.text};
        font-size: 1.4rem;
    }
`;

const InputText = styled.textarea`
    height: 179px;
    padding: 10px 20px 11px 20px;
    resize: none;
    border: none;
    border-top: 1px solid #e8e8e8;
    font-family: ${theme.text};
    font-size: 1.4rem;

    ::placeholder {
        line-height: 2.4rem;
        color: ${theme.gray01};
        font-family: ${theme.text};
        font-size: 1.4rem;
    }
`;

export default function BoardNew() {
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    const [boardContent, setBoardContent] = useState<InputBoardContent>({ title: '', text: '' });
    const [boardCategory, setBoardCategory] = useState<InputCategory>({ pk: 0, name: '카테고리' });
    const { lastBoardId, setLastBoardId } = useContext(CategoryContext);
    const route = useNavigate();

    const submit = async () => {
        if (inputValidation()) {
            await axios.post('http://localhost:3001/posts', {
                categoryPk: boardCategory.pk,
                categoryName: boardCategory.name,
                id: lastBoardId,
                title: boardContent.title,
                content: boardContent.text,
                viewCount: 0,
                likeCount: 0,
                commentCount: 0,
                imageUrl,
                writtenAt: new Date().toISOString(),
                writerNickName: '무늬만여우',
                writerProfileUrl: 'https://static.zaritalk.com/profiles/profile-57-img-chick-39-39%403x.png',
            });
            localStorage.removeItem('Y');
            route(`/community/list`);
            setLastBoardId(pre => pre + 1);
        }
    };

    const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBoardContent(pre => ({ ...pre, [event.target.id]: event.target.value }));
    };

    const inputValidation = () => {
        if (boardCategory.name !== '카테고리' && boardContent.title !== '' && boardContent.text !== '') {
            return true;
        } else {
            return false;
        }
    };

    return (
        <NewWrapper>
            <NewHeader>
                <img src={backicon} alt="back icon" onClick={() => route('/community/list')} />
                <h1>글쓰기</h1>
                <HeaderButton able={inputValidation()} onClick={submit}>
                    완료
                </HeaderButton>
            </NewHeader>
            <InputContent>
                <SelectCategory boardCategory={boardCategory} setBoardCategory={setBoardCategory} />
                <InputTitle
                    type="text"
                    placeholder="제목을 작성해주세요"
                    id="title"
                    maxLength={100}
                    value={boardContent.title}
                    onChange={onChangeInput}
                />
                <InputText
                    placeholder={`내용을 작성해주세요. \n\n◎사진 및 외부 콘텐츠 첨부시 영향력 상승! \n◎뉴스, 블로그 등 외부 콘텐츠는 https:// 링크를 붙여넣으세요. 본문에 썸네일로 표시됩니다. \n◎광고글 금지, 서비스 이용이 제한됩니다.`}
                    id="text"
                    value={boardContent.text}
                    onChange={onChangeInput}
                />
            </InputContent>
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </NewWrapper>
    );
}
