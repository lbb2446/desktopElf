var state = {
  msg: "",
  history: []
}

const mutations = {
  send(state, type) {}
}

const getters ={
  info: state => {
    return state.msg
  },
  history(){

  }
}
const actions = {
  send({
    commit
  }) {
    commit('send', {
      type: "s"
    })
  },

}



export default {
  state,
  mutations,
  actions
}