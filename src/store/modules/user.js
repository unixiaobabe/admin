import { getUserInfo, login , getUserDetailById} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo:{}
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state,userinfo){
    state.userInfo = {...userinfo}
  },
  removeUserInfo(state){
    state.userInfo = {}
  }

}

const actions = {
  async login({ commit }, data) {
    const result = await login(data)
    commit('setToken', result) 
  },
  async getUserInfo({commit}){
    const res = await getUserInfo()
    const baseInfo = await getUserDetailById(res.userId)
    const baseRes = {...res,...baseInfo}
    commit('setUserInfo',baseRes)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

