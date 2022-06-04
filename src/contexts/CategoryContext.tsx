import axios from 'axios';
import React, { createContext, ReactElement, useEffect, useState } from 'react';
import { Category } from '../commons/types';

type ValueType = {
    categories: Category[];
    category: number;
    setCategory: React.Dispatch<React.SetStateAction<number>>;
    lastBoardId: number;
    setLastBoardId: React.Dispatch<React.SetStateAction<number>>;
};

export const CategoryContextProvider = ({ children }: { children: ReactElement }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState(0);
    const [lastBoardId, setLastBoardId] = useState(40);

    const getCategories = async () => {
        const { data } = await axios.get('http://localhost:3001/categories');
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const ContextValue: ValueType = {
        categories,
        category,
        setCategory,
        lastBoardId,
        setLastBoardId,
    };

    return <CategoryContext.Provider value={ContextValue}>{children}</CategoryContext.Provider>;
};
export const CategoryContext = createContext<ValueType>({
    categories: [],
    category: 0,
    setCategory: () => {},
    lastBoardId: 40,
    setLastBoardId: () => {},
});
