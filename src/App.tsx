import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import BoardList from './pages/BoardList';
import BoardDetail from './pages/BoardDetail';
import BoardNew from './pages/BoardNew';

function App() {
    useEffect(() => {
        return () => {
            localStorage.removeItem('Y');
        };
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/community/list" element={<BoardList />} />
                <Route path="/community/post/:post_pk" element={<BoardDetail />} />
                <Route path="/community/post/new" element={<BoardNew />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
