export const replaceTitle = (pre: string) => {
    if (pre.length > 19) {
        return pre.slice(0, 19) + ' ...';
    }

    return pre;
};

export const replaceText = (pre: string) => {
    if (pre.length > 46) {
        return pre.slice(0, 46) + ' ...';
    }

    return pre;
};

export const replaceDate = (writtenAt: string) => {
    const today = new Date();
    const writtenDay = new Date(writtenAt);
    const milliSeconds = Number(today) - Number(writtenDay);

    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    return `${String(writtenDay.getFullYear()).slice(2)}-${String(writtenDay.getMonth() + 1).padStart(2, '0')}-${String(
        writtenDay.getDate()
    ).padStart(2, '0')}`;
};

export const checkLink = (content: string) => {
    const temp = content.split('\n').join(' ').split(' ');
    return temp;
};
