import serviceAxios from "@/utils/axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from 'crypto-js'

const TTL = 120

const getSign = (location: string, PRIVATE_KEY: string, ts: number,PUBLIC_KEY:string) => {
    const TIME_STAMP = ts ? ts : new Date().getTime()
    const LOCATION = location ? location : 'ip'
    const otherParams = `location=${LOCATION}&public_key=${PUBLIC_KEY}&ts=${TIME_STAMP}&ttl=${TTL}`
    const SIG = CryptoJS.HmacSHA1(otherParams, PRIVATE_KEY).toString(CryptoJS.enc.Base64)
    return {
        otherParams,
        SIG
    }
}

export const getActualWeather = (location: string, PRIVATE_KEY: string, ts: number, PUBLIC_KEY:string) => {
    const {otherParams, SIG} = getSign(location, PRIVATE_KEY, ts, PUBLIC_KEY)
    return serviceAxios({
        url: `https://api.seniverse.com/v3/weather/now.json?${otherParams}&sig=${encodeURI(SIG)}`,
        method: "get"
    });
};

export const getRecentWeather = (location: string, PRIVATE_KEY: string, ts: number, PUBLIC_KEY:string) => {
    const {otherParams, SIG} = getSign(location, PRIVATE_KEY, ts, PUBLIC_KEY)
    return serviceAxios({
        url: `https://api.seniverse.com/v3/weather/daily.json?${otherParams}&sig=${encodeURI(SIG)}`,
        method: "get"
    });
};
