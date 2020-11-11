<template>
  <div class="hello"
    id="wrapper">
      <div style="position:fixed;z-index:99999">
    <Button shape="circle" icon="md-hand"  style="-webkit-app-region: drag;"></Button>
    <Button shape="circle" icon="md-settings" @click="toggle(!show)"></Button>
    <Button shape="circle" icon="ios-arrow-round-down" @click="save"></Button>
    <Button shape="circle" icon="ios-happy" @click="save"></Button>
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

let eystype={
  0:"jspan",
  1:"normal",
  2:"vampire"
}

//anime,b和f要有关联
var moodType={
  cold:{
    name:"有点冷",
    coordinate:[0,-3],
    value:["face_cold_back_japan",
"face_cold_back_normal",
"face_cold_back_vampire",
"face_cold_front"]
  },
  happy:{
    name:"开心",
    coordinate:[-1,-1],
   value:["face_fsmile2_back_japan",
"face_fsmile2_back_normal",
"face_fsmile2_back_vampire",
"face_fsmile2_front"]
},
  happy2:{
    value:["face_fsmile_back_japan",
"face_fsmile_back_normal",
"face_fsmile_back_vampire",
"face_fsmile_front"]
  },
  veryhappy:{
    value:["face_smile_back",
"face_smile_back_japan",
"face_smile_back_normal",
"face_smile_back_vampire",
"face_smile_front"]
  },
   veryhappy1:{
    value:["face_wsmile_back",
"face_wsmile_back_japan",
"face_wsmile_back_normal",
"face_wsmile_back_vampire",
"face_wsmile_front"]
  },
  batsu:{
    name:"挣扎",
    coordinate:[-1,-1],
   value: ["face_batsu1_back",
"face_batsu1_front"]
},
batsu1:{
   name:"挣扎2",
  coordinate:[-2,-2],
  value:["face_batsu2_back",
"face_batsu2_front"]
},
  cry1:{
value:["face_cry_back",
"face_cry_front"]
  },
  cry2:{
value:["face_cry2_back",
"face_cry2_front"]
  },
  hurry:{
    value:["face_hurry_back_japan",
"face_hurry_back_normal",
"face_hurry_back_vampire",
"face_hurry_front"]
  },
  loneliness:{
    value:["face_loneliness_back_japan",
"face_loneliness_back_normal",
"face_loneliness_back_vampire",
"face_loneliness_front"]
  },
  normal:{
    value:["face_normal_back_japan",
"face_normal_back_normal",
"face_normal_back_vampire",
"face_normal_front"]
  },
  shame:{
    value:["face_shame1_back_japan",
"face_shame1_back_normal",
"face_shame1_back_vampire",
"face_shame1_front"]
  },
  shame1:{
    value:["face_shame2_back_japan",
"face_shame2_back_normal",
"face_shame2_back_vampire",
"face_shame2_front"]
  },shy:{

    value:[
"face_shy_back_japan",
"face_shy_back_normal",
"face_shy_back_vampire",
"face_shy_front"]
  },
  surprice:{
    value:["face_surprise_back_japan",
"face_surprise_back_normal",
"face_surprise_back_vampire",
"face_surprise_front"]
  },talk:{
    value:["face_talk_back_japan",
"face_talk_back_normal",
"face_talk_back_vampire",
"face_talk_front"]
  },
  temptation:{
    value:["face_temptation_back_japan",
"face_temptation_back_normal",
"face_temptation_back_vampire",
"face_temptation_front"]
  },//诱惑
  worry:{
    value:[
"face_worry_back_japan",
"face_worry_back_normal",
"face_worry_back_vampire",
"face_worry_front"]
  }
}







export default {
  mounted() {},
  name: "doll",

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
        eyetype:0,
        excited:0,
        happy:0,
        impression:0
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
        localStorage.setItem("checked",JSON.stringify(this.checked))
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
    moodChange(type){

      let mood=moodType[type]
      if(mood!=undefined){
         console.log(mood)
        if(mood.value.length>=4){
         this.body.face_f=mood.value[3]
          this.body.face_b=mood.value[this.moods.eyetype]
          
        }else{
           this.body.face_f=mood.value[1]
          this.body.face_b=mood.value[0]
         
        }
       
      }
      else{
        console.log("没有对应的情绪")
      }
      
    }
  },
  props: {
    msg: String,
  },
  mounted(){

      //如果缓存里有数据 就直接读取上次缓存的数据
    if(localStorage.getItem("body")!=null){
        this.body=JSON.parse(localStorage.getItem("body"))
        
    }
    //缓存开关设置
     if(localStorage.getItem("checked")!=null){
this.checked=JSON.parse(localStorage.getItem("checked"))
     }
    //每次打开 报下时间和万年历
    //如果设置随机刷新套装就刷新套装
//       setInterval(()=>{
//           let arr=["temptation","happy","shy","cry1"]
          
// var index = Math.floor((Math.random()*arr.length)); 
//  console.log(arr[index])
//            this.moodChange(arr[index])

//       },1000)


//powerMonitor.getSystemIdleState() 使用监听API 来控制 芙蓉好感度
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
  background: #fff;
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
