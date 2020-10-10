<template>
  <div id="wrapper">
     <tomoto></tomoto>

     <div @click="additem">add</div>
     <div @click="updateitem">update</div>
       <div @click="findItem">find</div>
      <amenu></amenu>
     <container></container>
     <div @click="dois">11111</div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import amenu from './Menu/index.vue'
  import container from './Container/index.vue'
  import tomoto from './Tomato.vue'
// import {ipcRenderer} from 'electron'
// const {ipcRenderer} = require('electron')
// import 'ant-design-vue/lib/date-picker/style/css'
// let v2 = {}
// function init (db) {
//   this.$db.findOne({
//           _id: 'id1'
//         }, (err, ret) => {
//           console.log(err, ret)
//         })
//     // check settings
//     // check tomato
//     // check doll
// }

export default {
    name: 'landing-page',
    data: {
  
    },
    components: { amenu,
      container,
      tomoto },
    mounted () {
    },
    methods: {
      findItem () {
        this.$db.findOne({
          _id: 'id1'
        }, (err, ret) => {
          console.log(err, ret)
        })
      },
      updateitem () {
        this.$db.update({ _id: 'tomatos' }, { $set: { planet: 'bob' } }, { multi: true }, function (err, numReplaced) {
          console.log(err, numReplaced)
        // numReplaced = 3
        // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
        })
      },
      additem () {
        this.$db.insert({ _id: 'tomatos',
          timer: [{interval: 45, rest: 15, starttime: '11:20:00'}, {interval: 45, rest: 15, starttime: ''}],
          clock: [{
            time: 'xxxx',
            desc: '',
            music: '',
            enble: true,
            week: [0, 1, 2, 3, 4, 5]
          }],
          states: {
            time: 0,
            clockcheck: []
          } }, (err, ret) => {
          console.log(err, ret)
        })
        console.log('xixi')
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      dois (a) {
        this.$electron.ipcRenderer.send('drink')
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

