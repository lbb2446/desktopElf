//默认读取一下缓存

const state = {
  happy: 0,
  excited:0
}

const mutations = {
  HAPPY (state,type) {
    if(state.happy<=1){
      if(type=="s"){
        state.happy+=0.01
      }else{
        state.happy+=0.05
      }
      
    }
  },
  UNHAPPY (state,type) {
    if(state.happy>=-1){
      if(type=="s"){
        state.happy-=0.01
      }else{
        state.happy-=0.05
      }
    }
  },
  EXCITED (state,type) {
    if(state.excited<=1){
      if(type=="s"){
        state.excited+=0.01
      }else{
        state.excited+=0.05
      }
      
    }
  },
  UNEXCITED (state,type) {
    if(state.excited>=-1){
      if(type=="s"){
        state.excited-=0.01
      }else{
        state.excited-=0.05
      }
    }
  },
}

const actions = {
  smallhappy ({ commit }) {
    commit('HAPPY',{
      type:"s"
    })
  },
  bighappy ({ commit }) {
    commit('HAPPY',{
      type:"b"
    })
  },
  smallunhappy ({ commit }) {
    commit('UNHAPPY',{
      type:"s"
    })
  },
  bigunhappy ({ commit }) {
    console.log("我擦")
    commit('UNHAPPY',{
      type:"b"
    })
  },
  smallexcited ({ commit }) {
    commit('EXCITED',{
      type:"s"
    })
  },
  bigexcited ({ commit }) {
    commit('EXCITED',{
      type:"b"
    })
  },
  smallunexcited ({ commit }) {
    commit('UNEXCITED',{
      type:"s"
    })
  },
  bigunexcited ({ commit }) {
    commit('UNEXCITED',{
      type:"b"
    })
  }
}



export default {
  state,
  mutations,
  actions
}
