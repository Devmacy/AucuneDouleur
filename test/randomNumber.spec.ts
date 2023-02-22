import {describe, expect, it} from 'vitest'
import {getRandomNumber, getRandomNumberL, getRandomNumberLR, getRandomNumberR} from "@/utils/number/randomNumbe";

const list = []
for (let i = 0; i < 100; i++) {
    list.push({
        min: 0,
        max: 10
    })
}

describe.each(list)('测试随机数  ($min, $max)', ({min, max}) => {
    it(`returns`, () => {
        expect(getRandomNumber(min, max)).toBeGreaterThan(min)
        expect(getRandomNumber(min, max)).toBeLessThan(max)

        expect(getRandomNumberL(min, max)).toBeGreaterThanOrEqual(min)
        expect(getRandomNumberL(min, max)).toBeLessThan(max)

        expect(getRandomNumberR(min, max)).toBeGreaterThan(min)
        expect(getRandomNumberR(min, max)).toBeLessThanOrEqual(max)

        expect(getRandomNumberLR(min, max)).toBeGreaterThanOrEqual(min)
        expect(getRandomNumberLR(min, max)).toBeLessThanOrEqual(max)
    })
})

