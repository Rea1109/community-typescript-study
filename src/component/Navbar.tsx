import React, { useEffect, useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { theme } from '../commons/theme';
import axios from 'axios';
import { Category, Post } from '../commons/types';

const NavbarWrapper = styled.nav`
    width: 100%;
    padding-top: 20px;
    padding-bottom: 46px;
    background-color: white;
    overflow-x: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    ul {
        display: flex;
        width: 100%;
        margin-left: 22px;
        list-style: none;
    }
`;

const CategoryButton = styled.li`
    height: 38px;
    margin: 0px 2px;
    padding: 0px 16px;
    border: 1px solid ${theme.gray02};
    border-radius: 20px;
    text-align: center;
    line-height: 35px;
    color: ${({ selected }: { selected: boolean }) => (selected ? 'white' : theme.gray05)};
    background-color: ${({ selected }: { selected: boolean }) => (selected ? theme.primary : 'white')};

    :hover {
        background-color: ${theme.primary};
        color: white;
        cursor: pointer;
    }

    span {
        white-space: nowrap;
        font-family: ${theme.title};
        font-size: 1.4rem;
    }
`;

export default function Navbar({ setBoards }: { setBoards: React.Dispatch<React.SetStateAction<Post[]>> }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState(0);

    const getBoards = async () => {
        const { data } = await axios.get('http://localhost:3001/posts');
        setBoards(data);
    };

    const getCategoryBoards = async (category: number) => {
        const { data } = await axios.get(`http://localhost:3001/posts?categoryPk=${category}`);
        setBoards(data);
    };

    const getBestBoards = async () => {
        const { data } = await axios.get(`http://localhost:3001/posts?viewCount_gte=100`);
        setBoards(data);
    };

    const getCategories = async () => {
        const { data } = await axios.get('http://localhost:3001/categories');
        setCategories(data);
    };

    const onClickCategory = (id: number) => (event: MouseEvent<HTMLElement>) => {
        setCategory(id);

        if (id === 0) {
            getBoards();
        } else if (id === 6) {
            getBestBoards();
        } else {
            getCategoryBoards(id);
        }
    };

    const handleSelect = (id: number) => {
        if (category === id) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        getCategories();
        getBoards();
    }, []);

    return (
        <NavbarWrapper>
            <ul>
                <CategoryButton selected={handleSelect(0)} onClick={onClickCategory(0)}>
                    <span>전체</span>
                </CategoryButton>

                <CategoryButton selected={handleSelect(6)} onClick={onClickCategory(6)}>
                    <span>⭐️ 인기글</span>
                </CategoryButton>

                {categories.map(el => (
                    <CategoryButton selected={handleSelect(el.id)} key={el.id} onClick={onClickCategory(el.id)}>
                        <span>{el.categoryName}</span>
                    </CategoryButton>
                ))}
            </ul>
        </NavbarWrapper>
    );
}
