export const excerpt = (content, length, delim, appendix) => {

    if (content.length <= length) {
        return content;
    }

    let trimmedStr = content.substr(0, length, delim.length);
    let lastDelimIndex = trimmedStr.lastIndexOf(delim);

    if(lastDelimIndex >= 0) {
        trimmedStr = trimmedStr = trimmedStr.substr(0, lastDelimIndex);
    }

    if(trimmedStr) {
        trimmedStr += appendix;
    }

    return trimmedStr;
};