import React, { useRef, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { checkValidationFile } from '../commons/fileValidation';
import closeicon from '../assets/images/boardNew/close.png';
import pictureicon from '../assets/images/boardNew/picture.png';
import { v4 as uuidv4 } from 'uuid';

const UploadWrapper = styled.section`
    display: flex;
    align-items: center;
    height: 100px;
    margin: 20px 0px;
    margin-left: 20px;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const UploadPreview = styled.span`
    display: inline-block;
    white-space: nowrap;
`;

const PreviewImage = styled.div`
    position: relative;
    display: inline-block;
    width: 89px;
    height: 89px;
    margin-right: 16px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        object-fit: cover;
    }
`;

const PreviewPlaceHolder = styled.div`
    display: flex;
    align-items: center;
    width: 89px;
    height: 89px;
    border-radius: 4px;
    background-color: ${theme.gray02};

    h1 {
        margin: 0px 5px;
        color: ${theme.primary};
        font-size: 1rem;
        text-align: center;
        white-space: pre-wrap;
    }
`;

const DeleteButton = styled.div`
    position: absolute;
    top: 3px;
    right: 5px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: black;
    opacity: 0.5;
    text-align: center;
    line-height: 30px;

    img {
        width: 50%;
        height: 50%;
    }

    :hover {
        cursor: pointer;
    }
`;

const UploadButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 86px;
    height: 32px;
    margin-bottom: 20px;
    margin-left: 20px;
    border: none;
    border-radius: 6px;
    background-color: #dbe9ff;
    color: ${theme.primary};
    font-size: 1.2rem;
    font-weight: 700;

    span {
        margin-left: 5px;
    }

    :hover {
        cursor: pointer;
    }
`;

export default function UploadImage({
    imageUrl,
    setImageUrl,
}: {
    imageUrl: string[];
    setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const fileRef = useRef<HTMLInputElement>(null);
    const fileUpload = () => {
        setImageUrl([]);
        fileRef.current?.click();
    };
    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            const fileList = Array.prototype.slice.call(event.target.files);
            const previewList = fileList.filter(file => {
                return checkValidationFile(file);
            });

            if (previewList.length > 6) {
                alert('사진은 최대 6장 등록 가능합니다.');
                return;
            }

            previewList.forEach(img => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(img);
                fileReader.onload = data => {
                    if (data.target !== null) {
                        setImageUrl(pre => [...pre, String(data.target?.result)]);
                    }
                };
            });
        }
    };

    const deleteImage = (id: number) => () => {
        setImageUrl(pre => {
            return pre.filter((_, idx) => {
                return id !== idx;
            });
        });
    };

    return (
        <>
            <UploadWrapper>
                <UploadPreview>
                    {imageUrl.length !== 0 ? (
                        imageUrl.map((url, index) => (
                            <PreviewImage key={uuidv4()}>
                                <img src={url} alt="client upload image" />
                                <DeleteButton onClick={deleteImage(index)}>
                                    <img src={closeicon} alt="close icon" />
                                </DeleteButton>
                            </PreviewImage>
                        ))
                    ) : (
                        <PreviewPlaceHolder>
                            <h1>1MB 이하만 등록 가능합니다.</h1>
                        </PreviewPlaceHolder>
                    )}
                </UploadPreview>
            </UploadWrapper>
            <UploadButton onClick={fileUpload}>
                <img src={pictureicon} alt="picture icon" />
                <span>사진 ({imageUrl.length}/6)</span>
            </UploadButton>
            <input type="file" multiple hidden ref={fileRef} onChange={onChangeFile} />
        </>
    );
}
