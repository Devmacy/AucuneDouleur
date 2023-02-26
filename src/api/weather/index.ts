import serviceAxios from "@/utils/axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CryptoJS from 'crypto-js'
import {useUserStore} from "@/store/user";

const userStore = useUserStore()

const getSign = () => {
    const params = `location=ip&public_key=${userStore.getWeatherPubK()}&ts=${userStore.getFirstTimeStamp()}&ttl=${userStore.getTTL()}`
    console.warn(params)
    return CryptoJS.HmacSHA1(params, userStore.getWeatherPriK()).toString(CryptoJS.enc.Base64)
}

const setStore = (ts: number) => {
    if ((ts - userStore.getFirstTimeStamp()) > (userStore.getTTL() * 1000)) {
        userStore.setFirstTimeStamp(ts)
        userStore.setSign(getSign())
    }
}

const getActualWeather = (location: string, ts: number) => {
    setStore(ts)
    return serviceAxios({
        url: `https://api.seniverse.com/v3/weather/now.json?location=${location}&public_key=${userStore.getWeatherPubK()}&ts=${ts}&ttl=${userStore.getTTL()}&sig=${encodeURI(userStore.getSign())}`,
        method: "get"
    });
};

const getRecentWeather = (location: string, ts: number) => {
    setStore(ts)
    return serviceAxios({
        url: `https://api.seniverse.com/v3/weather/daily.json?location=${location}&public_key=${userStore.getWeatherPubK()}&ts=${ts}&ttl=${userStore.getTTL()}&sig=${encodeURI(userStore.getSign())}`,
        method: "get"
    });
};

export {
    getSign,
    getActualWeather,
    getRecentWeather
}
