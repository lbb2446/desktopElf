<template>
    <div class="info">
        xixixixixixixixixiixixixixixixi
    </div>
</template>

<script>
import { mapState, mapActions,mapGetters } from "vuex";
import {store,mutations} from './ministore'
//负责情绪调度以及语言模块
    export default {
        name: '',
        data() {
            return {
                
            }
        },mounted(){
            //启动的时候默认
            // setInterval(()=>{
            //     mutations.add({b:1234})
            // },1000)
        }
    }
</script>

<style scoped>
    .info{
        position: absolute;
        top:35px;
        z-index: 99999999;
        background: #fff;
        padding: 5px; 
        left:50%;
        margin-left: -50%;
    }
</style>