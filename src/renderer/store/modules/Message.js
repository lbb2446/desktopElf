var state = {
  msg: 0,
  history: []
}

const mutations = {
  send(state, type) {}
}

const getters ={
  info: state => {
    return state.todos.filter(todo => todo.done)
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