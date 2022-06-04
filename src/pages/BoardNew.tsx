import React from 'react';

export default function BoardNew() {
    return (
        <main>
            <header>
                <h1>글쓰기</h1>
                <button>완료</button>
            </header>
            <section>
                <select name="" id="">
                    <option value="1" defaultChecked>
                        카테고리
                    </option>
                    <option value="2">대선청원</option>
                    <option value="3">자유글</option>
                </select>
                <input type="text" placeholder="제목을 작성해주세요" />
                <input type="text" placeholder="내요을 작성해주세요" />
            </section>
            <section>
                <div>사진 미리보기 공간</div>
                <button>사진</button>
            </section>
        </main>
    );
}
