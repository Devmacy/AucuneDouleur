/**
 * 修剪空格
 * @param str
 */
const trimSpace = (str: string) => {
    return str.replace(/\s*/g, '')
}

export {
    trimSpace
}
