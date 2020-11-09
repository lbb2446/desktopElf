<template>
  <div class="hello"
    id="wrapper">
      <div style="position:fixed;z-index:99999">
    <Button shape="circle" icon="md-hand"  style="-webkit-app-region: drag;"></Button>
    <Button shape="circle" icon="md-settings" @click="toggle(!show)"></Button>
    <Button shape="circle" icon="ios-arrow-round-down" @click="save"></Button>
    
    </div>
    <li class="doll"
      :style="{zIndex:1000-i}"
      v-for="(v,k,i) in body"
      :key="v">

      <img v-if="checked.includes(k)"
        :src="getImg(v)"
        :alt="i">
    </li>
    <List  v-if="show"
      class="tool"
      border>
      <CheckboxGroup v-model="checked">

        <ListItem v-for="(v,k) in config"
          :key="k">
          <Checkbox :label="k"></Checkbox>
          <Select style="width:200px" v-model="body[k]"
            >
            <Option v-for="item in v"
              :value="item.value"
              :key="item.value">{{ item.label }}</Option>
          </Select>
        </ListItem>
      </CheckboxGroup>

    </List>
    
    <!-- <div class="anime1"></div> -->

  </div>
</template>

<script>
import {
  face_b,
  face_f,
  bottom,
  acce,
  outer_b,
  outer_f,
  hair_f,
  hair_b,
  hair_s,
  top,
  under,
} from "./doll.js";

function seletedDecoration(arr) {
  return arr.map((t) => {
    return { value: t, label: t };
  });
}
let tmps=[{
  name:"A",
  json:{"cat":"acce_neck","hair_f":"hair_semi_front_main_normal","face_f":"face_cold_front","face_b":"face_normal_back_japan","hair_s":"hair_queen_front_shadow","outside_f":"outer_muffler_red_front","top":"tops_tanktop_white","bottom":"bottoms_tight_black","under":"under_rope","body":"nude","outside_b":"outer_muffler_red_back","hair_b":"hair_semi_back_main_normal"}
}]


//anime,b和f要有关联

export default {
  mounted() {},
  name: "HelloWorld",

  data() {
    return {
        show:false,
      theme: [
        {
          name: "基础",
          cat: "acce_glass_red",
          hair_f: "hair_normal_front_main_normal",
          face_f: "face_shy_front",
          face_b: "face_shy_back_japan",
          hair_s: "hair_normal_front_shadow",
          outside_f: "outer_muton_front",
          top: "tops_neck_no_white",
          bottom: "bottoms_tight_black",
          under: "under_rope",
          body: "nude",
          outside_b: "outer_muton_back",
          hair_b: "hair_semi_back_main_vampire",
        },
      ],
      moods:{
        happy:{
          face_f: "face_shy_front",
          face_b: "face_shy_back_japan",
        },
        sad:{
           face_f: "face_shy_front",
          face_b: "face_shy_back_japan",
        }
      },
      checked: [
        "cat",
        "hair_f",
        "face_f",
        "face_b",
        "outside_f",
        "top",
        "bottom",
        "under",
        "body",
        "outside_b",
        "hair_b",
        "hair_s",
      ],
      body: {
        cat: "acce_glass_red",
        hair_f: "hair_normal_front_main_normal",
        face_f: "face_shy_front",
        face_b: "face_shy_back_japan",
        hair_s: "hair_normal_front_shadow",
        outside_f: "outer_muton_front",

        top: "tops_neck_no_white",
        bottom: "bottoms_tight_black",
        under: "under_rope",
        body: "nude",
        outside_b: "outer_muton_back",
        hair_b: "hair_semi_back_main_vampire",
      },
      config: {
        hair_f: seletedDecoration(hair_f),
        hair_b: seletedDecoration(hair_b),
        hair_s: seletedDecoration(hair_s),
        face_f: seletedDecoration(face_f),
        face_b: seletedDecoration(face_b),
        bottom: seletedDecoration(bottom),
        cat: seletedDecoration(acce),
        outside_f: seletedDecoration(outer_f),
        outside_b: seletedDecoration(outer_b),
        top: seletedDecoration(top),
        under: seletedDecoration(under),
      },
    };
  },
  watch: {
    "body.face_f"(value) {
      if (face_b.includes(value.replace("front", "back"))) {
        this.body.face_b = value.replace("front", "back");
      }
    },
    "body.hair_f"(value) {
      if (hair_b.includes(value.replace("front", "back"))) {
        this.body.hair_b = value.replace("front", "back");
      }
    },
    "body.outside_f"(value) {
      if (outer_b.includes(value.replace("front", "back"))) {
        this.body.outside_b = value.replace("front", "back");
      }
    },
  },
  methods: {
    save(){
        localStorage.setItem("body",JSON.stringify(this.body))
      console.log(JSON.stringify(this.body))//制作模版用
    },
      toggle(show){
        console.log(show)
         this.show=!this.show

         if(this.show){
              this.$electron.ipcRenderer.send('changesize',{
                width:604,
                height:1000
              })
              
          }else{
                this.$electron.ipcRenderer.send('changesize',{
                width:204,
                height:426
              })
          }
        
       
      },
    getImg(name) {
      return require(`./../assets/doll1/${name}.png`);
    },
  },
  props: {
    msg: String,
  },
  mounted(){

      //如果缓存里有数据 就直接读取上次缓存的数据
    if(localStorage.getItem("body")!=null){
        this.body=JSON.parse(localStorage.getItem("body"))
    }
    //每次打开 报下时间和万年历
    //如果设置随机刷新套装就刷新套装

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.anime1 {
  width: 544px;
  height: 416px;
  background-repeat: no-repeat;
  transform: ease 1s;
  background-image: url("./../assets/doll1/anime1.png");
  -webkit-animation: frame 25333ms steps(17) both infinite;
}
@keyframes frame {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -9248px 0;
  }
}
.doll {
  position: fixed;
  width: 208px;
  height: 416px;
  left: 0;
  top: 10;
  
}
.tool {
  position: absolute;
  left: 208px;
  width: 600px;
}
.hello {
     /* position: relative; */
    overflow: hidden;
    background: none;
    /* height: 426px; */
}
body{
    background: none;
}
</style>
