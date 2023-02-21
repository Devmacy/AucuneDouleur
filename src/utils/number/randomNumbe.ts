/**
 * 生成(min,max)的随机整数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomNumber(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min - 1) + min)
}

/**
 * 生成【min,max)的随机整数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomNumberL(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 生成(min,max]的随机整数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomNumberR(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min) + min)
}

/**
 * 生成【min,max]的随机整数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomNumberLR(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
