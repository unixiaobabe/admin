import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken()
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
  }
}

const actions = {
  async login({ commit }, data) {
    const result = await login(data)
    commit('setToken', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

