import Vue from 'vue';

export let store =Vue.observable({tmps:[]});
export let mutations={
    add(count){
        store.tmps.push(count);

    },
    getInfo(name){
       let info= store.tmps.filter((t)=> t.name==name);
      return info
    },
    getList(){
       return store.tmps
    },
    delete(){
        
    }
}