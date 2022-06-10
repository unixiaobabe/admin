const Tokenkey = 'hrsass-token'

export function getToken(){
  return localStorage.getItem(Tokenkey)
}

export function setToken(token){
  return localStorage.setItem(Tokenkey,token)
}

export function removeToken(){
  return localStorage.removeItem(Tokenkey)
}