import React, { MouseEvent, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { InputCategory } from '../commons/types';
import { CategoryContext } from '../contexts/CategoryContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import { v4 as uuidv4 } from 'uuid';

const SelectButton = styled(Button)`
    display: flex;
    justify-content: flex-start;
    width: 360px;
    padding-left: 20px;
    border: none;
    border-top: 1px solid #e8e8e8;
    background-color: white;
    color: #222222;
    font-family: ${theme.title};
    font-size: 1.4rem;

    :hover {
        background-color: white;
    }
`;

const SelectMenu = styled(MenuItem)`
    width: 360px;
    font-family: ${theme.title};
    color: ${theme.gray05};
`;

export default function SelectCategory({
    boardCategory,
    setBoardCategory,
}: {
    boardCategory: InputCategory;
    setBoardCategory: React.Dispatch<React.SetStateAction<InputCategory>>;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { categories } = useContext(CategoryContext);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (pk: number, name: string) => () => {
        setAnchorEl(null);
        setBoardCategory({
            pk,
            name,
        });
    };

    return (
        <div>
            <SelectButton onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
                {boardCategory.name}
            </SelectButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {categories?.map(el => (
                    <SelectMenu
                        key={uuidv4()}
                        id={String(el.id)}
                        value={el.categoryName}
                        onClick={handleClose(el.id, el.categoryName)}
                    >
                        {el.categoryName}
                    </SelectMenu>
                ))}
            </Menu>
        </div>
    );
}
