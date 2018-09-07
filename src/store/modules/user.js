import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
  getPhoto,
  // setPhoto,
  removePhoto
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    name: '',
    avatar: '',
    photo: getPhoto(), // 用户头像
    data: [],
    formDatas: []
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_DATA: (state, data) => {
      state.data = data
    },
    SET_FORMDATAS: (state, formDatas) => {
      state.formDatas = formDatas
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const name = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(name, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          setUserId(data.lsUser.id)

          // sessionStorage.setItem("userId",data.user.id)
          // sessionStorage.setItem("photo",data.user.photo)
          // setPhoto(data.lsUser.photo)
          commit('SET_TOKEN', data.token)
          commit('SET_USERID', data.lsUser.id)
          // commit('SET_PHOTO', data.lsUser.photo)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(getUserId()).then(response => {
          const data = response.data
          if (data && data.length > 0) { // 验证返回的data是否是一个非空数组
            commit('SET_DATA', data)
          } else {
            reject('getInfo: data must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_DATA', [])
          removeToken()
          resolve()
          // sessionStorage.removeItem('photo');
          removePhoto()
          removeUserId()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserId()
        removePhoto()
        resolve()
      })
    }
  }
}

export default user
