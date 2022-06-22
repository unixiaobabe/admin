import Cookies from "js-cookie"
const TimeKey = 'hrsass-timestamp'
const TokenKey = 'hrsass-token'

export function getToken(){
  return localStorage.getItem(TokenKey)
}

export function setToken(token){
  return localStorage.setItem(TokenKey,token)
}

export function removeToken(){
  return localStorage.removeItem(TokenKey)
}

export function setTimestamp(){
  return Cookies.set(TimeKey,Date.now())
}

export function getTimestamp(){
  return Cookies.get(TimeKey)
}