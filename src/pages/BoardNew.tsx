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
    const [boardCategory, setBoardCategory] = useState<InputCategory>({ pk: 0, name: '????????????' });
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
                writerNickName: '???????????????',
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
        if (boardCategory.name !== '????????????' && boardContent.title !== '' && boardContent.text !== '') {
            return true;
        } else {
            return false;
        }
    };

    return (
        <NewWrapper>
            <NewHeader>
                <img src={backicon} alt="back icon" onClick={() => route('/community/list')} />
                <h1>?????????</h1>
                <HeaderButton able={inputValidation()} onClick={submit}>
                    ??????
                </HeaderButton>
            </NewHeader>
            <InputContent>
                <SelectCategory boardCategory={boardCategory} setBoardCategory={setBoardCategory} />
                <InputTitle
                    type="text"
                    placeholder="????????? ??????????????????"
                    id="title"
                    maxLength={100}
                    value={boardContent.title}
                    onChange={onChangeInput}
                />
                <InputText
                    placeholder={`????????? ??????????????????. \n\n????????? ??? ?????? ????????? ????????? ????????? ??????! \n?????????, ????????? ??? ?????? ???????????? https:// ????????? ??????????????????. ????????? ???????????? ???????????????. \n???????????? ??????, ????????? ????????? ???????????????.`}
                    id="text"
                    value={boardContent.text}
                    onChange={onChangeInput}
                />
            </InputContent>
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </NewWrapper>
    );
}
