import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            userAvatarSrc: 'https://s1.ax1x.com/2023/01/24/pSYhwB4.jpg', // 用户头像地址
            weatherPublicKey: '',//心知天气公钥
            weatherPrivateKey: '',//心知天气私钥
            firstGetWeatherTimeStamp: 0,//第一次请求天气的接口时间
            TTL: 600,//有效时间
            sign: '',//签名
        }
    },
    persist: true,

    actions: {
        /**
         * 获取用户头像地址
         */
        getUserAvatarSrc(): string {
            return this.userAvatarSrc
        },

        /**
         * 获取心知天气私钥
         */
        getWeatherPubK(): string {
            return this.weatherPublicKey
        },

        /**
         * 获取心知天气公钥
         */
        getWeatherPriK(): string {
            return this.weatherPrivateKey
        },

        /**
         * 获取间隔时间
         */
        getTTL(): number {
            return this.TTL
        },

        /**
         * 获取第一次请求时间
         */
        getFirstTimeStamp(): number {
            return this.firstGetWeatherTimeStamp
        },

        /**
         * 获取签名
         */
        getSign(): string {
            return this.sign
        },

        /**
         * 设置间隔时间
         */
        setTTL(value: number) {
            this.TTL = value
        },

        /**
         * 设置第一次请求时间
         */
        setFirstTimeStamp(value: number) {
            this.firstGetWeatherTimeStamp = value
        },

        /**
         * 设置签名
         */
        setSign(value: string) {
            this.sign = value
        },

        /**
         * 设置用户头像
         * @param src 用户头像地址
         */
        setUserAvatarSrc(src: string): void {
            this.userAvatarSrc = src
        },

        /**
         * 设置心知天气公钥
         * @param value 公钥
         */
        setWeatherPubK(value: string): void {
            this.weatherPublicKey = value
        },

        /**
         * 设置心知天气私钥
         * @param value 私钥
         */
        setWeatherPriK(value: string): void {
            this.weatherPrivateKey = value
        }
    }
})
