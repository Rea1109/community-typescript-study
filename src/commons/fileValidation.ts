export const checkValidationFile = (file: File | undefined) => {
    if (!file?.size) return false;

    if (!file.type.includes('png') && !file.type.includes('jpeg')) {
        return false;
    }

    if (file.size > 1 * 1024 * 1024) {
        return false;
    }

    return file;
};
