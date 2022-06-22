import request from '@/utils/request'

export function login(data) {
    return request({
        url:'/sys/login',
        method:'post',
        data
    })
}

export function getUserInfo(data) {
    return request({
        url:'/sys/profile',
        method:'post',
        data
    })
}

export function getUserDetailById(id) {
    return request({
        url:`/sys/user/${id}`
    })
}


