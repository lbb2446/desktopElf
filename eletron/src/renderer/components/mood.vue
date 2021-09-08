<template>
  <div class="info">
    {{msg}}
    <input type="text"
      v-model="task"
      @keyup.enter="submit">
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { store, mutations, log } from "./minimood";

function feature(key) {
  //简单分词
  const KEYS = key.split(" ");
  let keyword = "";
  if (KEYS.length > 1) {
    keyword = KEYS[0];
  } else {
    keyword = KEYS;
  }
  switch (keyword) {
    case "t":
      return 1;
  }
}

function personality(mood, excited) {
  return "嘻嘻";
}

//负责情绪调度以及语言模块
export default {
  name: "",
  computed: {
    msg() {
      return store.speak;
    }
  },
  data() {
    return {
      todolist: [],
      task: ""
    };
  },
  mounted() {
    setInterval(() => {
      log(personality());
    }, 60000);
  },
  methods: {
    submit() {
      log("好的，我已经收到了哦");
      this.todolist.push(this.task);
      console.log(this.todolist);
      this.task = "";
    }
  }
};
</script>

<style scoped>
.info {
  position: fixed;
  bottom: 35px;
  z-index: 99999999;
  background: #fff;
  padding: 5px;
  left: 50%;
  margin-left: -50%;
}
</style>