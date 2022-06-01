import React from 'react';

function App() {
    const handleData = () => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(data => console.log(data));
    };

    const createData = () => {
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test',
                content: 'I am testing!',
                id: 41,
            }),
        }).then(res => console.log(res));
    };

    return (
        <div>
            <button onClick={handleData}>데이터 가져오기</button>
            <button onClick={createData}>데이터 등록해보기</button>
        </div>
    );
}

export default App;
