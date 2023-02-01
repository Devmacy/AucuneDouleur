import serviceAxios from "@/utils/axios";

export const getHitkoto = (params:object) => {
    return serviceAxios({
        url: "https://v1.hitokoto.cn",
        method: "get",
        params,
    });
};
