<template>
  <div id="wrapper">
    
     <div @click="dois">i am  mini</div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import amenu from './Menu/index.vue'
  import container from './Container/index.vue'
  // import {ipcRenderer} from 'electron'
  // const {ipcRenderer} = require('electron')
  // import 'ant-design-vue/lib/date-picker/style/css'
// let v2 = {}
export default {
    name: 'landing-page',
    components: { amenu, container },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      dois (a) {
        console.log('xixi')
        this.$electron.ipcRenderer.send('doll')
      }
    }
  }
</script>

<style >
*{
  padding: 0;
  margin: 0;
}
html,
body,
#app{
  height: 100%;
}
</style>

