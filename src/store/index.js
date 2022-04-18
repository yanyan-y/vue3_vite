import { createStore } from 'vuex'

export default createStore({
  state: {
    loadingShow:false,//加载中...
    headText: '',//头部输入类容
    isLoginOrRegs: 0, // 是否为登录0、忘记密码1、注册2
    cdnUrl: `https://img.gxb.keyun123.com`, // 统一用正式域名
    userInfo: null, //y用户信息
    provinceCity: [], // 城市地区
    msgNum: 0 // 消息未读条数
  },
  getters: {
    getLoginOrRegs: state => state.isLoginOrRegs,
    getloading: state => state.loadingShow,
    getUserInfo: state => state.userInfo,
    getArea: state => state.provinceCity,
    getMsgNum: state => state.msgNum,
  },
  mutations: {
    loadingShow(state,data){
			state.loadingShow = data
    },
    setLoginOrRegs (state,data) {
      state.isLoginOrRegs = data
    },
    setUserInfo (state,data) {
      state.userInfo = data
    },
    setheadText (state,data) {
      state.headText = data
    },
    setArea (state,data) {
      state.provinceCity = data;
    },
    setMsgNum (state,data) {
      state.msgNum = data
    }
  },
  actions: {
  },
  modules: {
  }
})
