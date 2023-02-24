import {describe, expect, it} from "vitest";
import {trimSpace} from "@/utils/string";

describe('修剪空格', () => {
    it('should 16,10,10,1', () => {
        expect(trimSpace('rgba(61, 10, 10, 1)')).toBe('rgba(61,10,10,1)')
    });
})
