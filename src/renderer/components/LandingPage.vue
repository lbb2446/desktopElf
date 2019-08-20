<template>
  <div id="wrapper">
     背景
     菜单 <amenu></amenu>
     容器 <container></container>
     loading
     对话框
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'
  import amenu from './Menu/index.vue'
  import container from './Container/index.vue'
  // import 'ant-design-vue/lib/date-picker/style/css'
// let v2 = {}
export default {
    name: 'landing-page',
    components: { amenu, container },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
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

