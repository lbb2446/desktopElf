import Vue from 'vue';

//第一次加载先加载缓存
export let store =Vue.observable({history:[],speak:""});
export let mutations={
    say(type,msg){
        store.speak=msg
        store.history.push({
            type:type,
            createdtime:new Date()
            ,msg});
        //save in cache
    }
}