import serviceAxios from "@/utils/axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from 'crypto-js'

const PUBLIC_KEY = 'PEmYer2PoPgEU28cb'
const TTL = 60

export const getActualWeather = (location: string,PRIVATE_KEY:string) => {
    console.warn(PRIVATE_KEY)
    const TIME_STAMP = new Date().getTime()
    const LOCATION = location ? location : 'ip'
    const otherParams = `location=${LOCATION}&public_key=${PUBLIC_KEY}&ts=${TIME_STAMP}&ttl=${TTL}`
    const SIG = CryptoJS.HmacSHA1(otherParams, PRIVATE_KEY).toString(CryptoJS.enc.Base64)

    return serviceAxios({
        url: `https://api.seniverse.com/v3/weather/now.json?${otherParams}&sig=${encodeURI(SIG)}`,
        method: "get"
    });
};
