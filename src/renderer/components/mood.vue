<template>
    <div class="info">
        {{msg}}
        {{todolist}}
        <input type="text" v-model="task" @keyup.enter="submit">
    </div>
</template>

<script>
import { mapState, mapActions,mapGetters } from "vuex";
import {store,mutations,log} from './minimood'

//负责情绪调度以及语言模块
    export default {
        name: '',
        computed:{
            msg(){
                return store.speak
            }
        },
        data() {
            return {
                todolist:[],
                task:""
            }
            
        },mounted(){
        },
        methods:{
            submit(){
                log("好的，我已经收到了哦")
                this.todolist.push(this.task)
                console.log(this.todolist)
                this.task=""
            }
        }
    }
</script>

<style scoped>
    .info{
        position: absolute;
        bottom:35px;
        z-index: 99999999;
        background: #fff;
        padding: 5px; 
        left:50%;
        margin-left: -50%;
    }
</style>