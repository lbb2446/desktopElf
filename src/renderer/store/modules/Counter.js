//默认读取一下缓存
let happy=0,excited=0
if(localStorage.getItem("happy")!=null){
  happy=parseFloat(localStorage.getItem("happy"))
}
if(localStorage.getItem("excited")!=null){
  excited=parseFloat(localStorage.getItem("excited"))
}
const state = {
  happy: happy,
  excited:excited
}

const mutations = {
  HAPPY (state,{type}) {
    if(state.happy<=1){
      if(type=="s"){
        state.happy+=0.01
      }else{
        state.happy+=0.05
      }
      
    }
    localStorage.setItem("happy",state.happy)
  },
  UNHAPPY (state,{type}) {
    if(state.happy>=-1){
      if(type=="s"){
        state.happy-=0.01
      }else{
        state.happy-=0.05
      }
    }
    localStorage.setItem("happy",state.happy)
  },
  EXCITED (state,{type}) {
    console.log(type)
    if(state.excited<=1){
      if(type=="s"){
        state.excited+=0.01
      }else{
        state.excited+=0.05
      }
      
    }
    localStorage.setItem("excited",state.excited)
  },
  UNEXCITED (state,{type}) {
    if(state.excited>=-1){
      if(type=="s"){
        state.excited-=0.01
      }else{
        state.excited-=0.05
      }
    }
    localStorage.setItem("excited",state.excited)
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
