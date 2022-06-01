import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommunityDetail from './pages/CommunityDetail';
import CommunityList from './pages/CommunityList';
import CommunityNew from './pages/CommunityNew';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CommunityList />} />
                <Route path="/community/post/:post_pk" element={<CommunityDetail />} />
                <Route path="/community/post/new" element={<CommunityNew />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
