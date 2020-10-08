// creating url param from a string. e.g => Collection 2 => collection%202
export const createUrlParam = (str: string) =>
    str
        .toLowerCase()
        .split(' ')
        .join('%20');
