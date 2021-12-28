import { request } from "./request";
// export const login = (form) => request({ url: '/admin/login',method: 'post', data:form })
export function login(from) {
    return request({
        url: '/user/login',
        method: 'post',
        data: from
    })
}