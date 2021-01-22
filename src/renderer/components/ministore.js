import Vue from 'vue';
//test
//第一次加载先加载缓存TT
let tmp=[]
if(localStorage.getItem("tmps")!=null){
    tmp=JSON.parse(localStorage.getItem("tmps"))
}
export let store =Vue.observable({tmps:tmp});
export let mutations={
    add(count){
        store.tmps.push(count);
        localStorage.setItem("tmps",JSON.stringify(store.tmps))
        //save in cache
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