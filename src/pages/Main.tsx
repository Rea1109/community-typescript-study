import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const route = useNavigate();

    useEffect(() => {
        route('/community');
    });
    return <div>Main</div>;
}
