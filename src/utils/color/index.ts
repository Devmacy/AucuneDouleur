import {trimSpace} from "@/utils/string";

/**
 * 从rgba字符串转换为rgba数组
 * @param str rgba字符串
 */
const RGBAStrToList = (str: string) => {
    if (!str) {
        return [0, 0, 0, 0]
    }

    const rgbaArray = trimSpace(str).match(/(?<=\()\S+(?=\))/g) as Array<string>
    return rgbaArray[0].split(',')
}

/**
 * 从rgba数组转换为rgba数组字符串
 * @param arr rgba数组
 */
const RGBAListToStr = (arr: Array<string>) => {
    if (arr.length !== 4) {
        return 'rgba(0,0,0,0)'
    }

    return `rgba(${arr.join(',')})`
}

export {
    RGBAStrToList,
    RGBAListToStr
}
