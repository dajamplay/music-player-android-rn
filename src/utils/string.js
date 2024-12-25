export const truncate = (str, num) => {
    if (!str) return '';
    if (str.length < num) {
        return str;
    }
    else {
        str = str.slice(0, num);
        return str + "...";
    }
}
