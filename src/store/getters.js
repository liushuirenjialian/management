const getters = {
  sidebar: state => state.app.sidebar,
  navbar: state => state.app.navbar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  data: state => state.user.data,
  userId: state => state.user.userId,
  photo: state => state.user.photo,
  formDatas: state => state.user.formDatas
}
export default getters
