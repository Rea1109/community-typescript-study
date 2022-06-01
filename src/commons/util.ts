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
