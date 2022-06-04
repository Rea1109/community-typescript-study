export const checkValidationFile = (file: File | undefined) => {
    if (!file?.size) return false;

    if (!file.type.includes('png') && !file.type.includes('jpeg')) {
        alert('이미지 파일만 등록 됩니다.');
        return false;
    }

    if (file.size > 1 * 1024 * 1024) {
        alert('1MB 이하만 등록 됩니다.');
        return false;
    }

    return file;
};
