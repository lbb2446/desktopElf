<template>
  <div class="hello"
    id="wrapper">
       <Modal
        v-model="modal1"
        title="保存当前的服饰与表情到缓存中"
        @on-ok="save1"
       >
        <p>套装名称：</p> <Input v-model="addtmp.name" placeholder="Enter something..." style="width: 300px" />
        <p>心情节点</p> <InputNumber
            :max="100"
            v-model="addtmp.happy"
            :formatter="value => `${value}%`"
            :parser="value => value/100"></InputNumber>
        <p>情绪节点：</p><InputNumber
            :max="100"
            v-model="addtmp.excited"
            :formatter="value => `${value}%`"
            :parser="value => value/100"></InputNumber>

    </Modal>
    <Modal
        v-model="modal2"
        title="缓存列表"
      
       >
        <List>
            <ListItem v-for="(t,i) in list" :key="i" >
                <div @click="reshow(i)" >{{t.name}}</div> <div @click="deletecache(i)">删除</div>
            </ListItem>
        </List>

    </Modal>
     <Modal
        v-model="modal3"
        title="透明度调整"
      
       >
       <p>outside_f</p>  <Slider v-model="opcity.outside_f"  ></Slider>
       <p>bottom</p>  <Slider v-model="opcity.bottom"  ></Slider>
       <p>outside_b</p>  <Slider v-model="opcity.outside_b"  ></Slider>
       <p>top</p>  <Slider v-model="opcity.top"  ></Slider>
       <p>under</p>  <Slider v-model="opcity.under"  ></Slider>

    </Modal>
    <div class="mood">
      <heart :excited="excited" :happy="happy"></heart>
    </div>
    <div style="position:fixed;z-index:99999">
      <Button shape="circle"
        icon="md-hand"
        style="-webkit-app-region: drag;"></Button>
      <Button shape="circle"
        icon="md-settings"
        @click="toggle(!show)"></Button>
      <Button shape="circle"
        icon="ios-arrow-round-down"
        @click="save"></Button>
         <Button shape="circle"
        icon="ios-arrow-round-up"
        @click="modal1=true"></Button>
        <Button shape="circle"
        icon="md-list"
        @click="modal2=true"></Button>
      <Button shape="circle"
        icon="ios-happy"
        @click="randomChange"></Button>
        <Button shape="circle"
        icon="md-body"
        @click="modal3=true"></Button> 
      好感{{happy}} 心情 {{excited}}  
    </div>
    <mood></mood>
    <li class="doll"
      :style="{zIndex:1000-i}"
      v-for="(v,k,i) in body"
      :key="v">

      <img v-if="checked.includes(k)"
        :src="getImg(v)" :style="{
          opacity:getOpacity(k)
        }"
        :alt="i">
    </li>
    <List v-if="show"
      class="tool" 
      border>
      <CheckboxGroup v-model="checked">

        <ListItem v-for="(v,k) in config"
          :key="k">
          <Checkbox :label="k"></Checkbox>
          <Select @on-change="clothChange" style="width:200px"
            v-model="body[k]">
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
import { mapState, mapActions } from "vuex";
import {store,mutations} from './ministore'
import heart from './Menu/heart.vue'
import {log} from './minimood'
import mood from './mood.vue';
import {} from './utils.js';
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
  under
} from "./doll.js";

function seletedDecoration(arr) {
  return arr.map(t => {
    return { value: t, label: t };
  });
}
let tmps = [
  {
    name: "A",
    json: {
      cat: "acce_neck",
      hair_f: "hair_semi_front_main_normal",
      face_f: "face_cold_front",
      face_b: "face_normal_back_japan",
      hair_s: "hair_queen_front_shadow",
      outside_f: "outer_muffler_red_front",
      top: "tops_tanktop_white",
      bottom: "bottoms_tight_black",
      under: "under_rope",
      body: "nude",
      outside_b: "outer_muffler_red_back",
      hair_b: "hair_semi_back_main_normal"
    }
  }
];

let eystype = {
  0: "jspan",
  1: "normal",
  2: "vampire"
};

//anime,b和f要有关联
var moodType = {
  cold: {
    name: "有点冷",
    coordinate: [0, -0.1],
    value: [
      "face_cold_back_japan",
      "face_cold_back_normal",
      "face_cold_back_vampire",
      "face_cold_front"
    ]
  },
  happy: {
    name: "开心",
    coordinate: [0.3, 0],
    value: [
      "face_fsmile2_back_japan",
      "face_fsmile2_back_normal",
      "face_fsmile2_back_vampire",
      "face_fsmile2_front"
    ]
  },
  happy2: {
    coordinate: [0.5, 0.1],
    value: [
      "face_fsmile_back_japan",
      "face_fsmile_back_normal",
      "face_fsmile_back_vampire",
      "face_fsmile_front"
    ]
  },
  veryhappy: {
    coordinate: [0.6, 0.2],
    value: [
      "face_smile_back_japan",
      "face_smile_back_normal",
      "face_smile_back_vampire",
      "face_smile_front"
    ]
  },
  veryhappy1: {
    coordinate: [0.8, 0.3],
    value: [
      "face_wsmile_back_japan",
      "face_wsmile_back_normal",
      "face_wsmile_back_vampire",
      "face_wsmile_front"
    ]
  },
  batsu: {
    name: "挣扎",
    coordinate: [-0.5, -0.5],
    value: ["face_batsu1_back", "face_batsu1_front"]
  },
  batsu1: {
    name: "挣扎2",
    coordinate: [-0.75, -0.75],
    value: ["face_batsu2_back", "face_batsu2_front"]
  },
  cry1: {
    coordinate: [-0.5, 0],
    value: ["face_cry_back", "face_cry_front"]
  },
  cry2: {
    coordinate: [-0.7, 0],
    value: ["face_cry2_back", "face_cry2_front"]
  },
  hurry: {
    coordinate: [0, -0.2],
    value: [
      "face_hurry_back_japan",
      "face_hurry_back_normal",
      "face_hurry_back_vampire",
      "face_hurry_front"
    ]
  },
  loneliness: {
    coordinate: [-0.8, -0.8],
    value: [
      "face_loneliness_back_japan",
      "face_loneliness_back_normal",
      "face_loneliness_back_vampire",
      "face_loneliness_front"
    ]
  },
  normal: {
    coordinate: [0, 0],
    value: [
      "face_normal_back_japan",
      "face_normal_back_normal",
      "face_normal_back_vampire",
      "face_normal_front"
    ]
  },
  shame: {
    coordinate: [0, 0.3],
    value: [
      "face_shame1_back_japan",
      "face_shame1_back_normal",
      "face_shame1_back_vampire",
      "face_shame1_front"
    ]
  },
  shame1: {
    coordinate: [0, 0.5],
    value: [
      "face_shame2_back_japan",
      "face_shame2_back_normal",
      "face_shame2_back_vampire",
      "face_shame2_front"
    ]
  },
  shy: {
    coordinate: [0, 0.1],
    value: [
      "face_shy_back_japan",
      "face_shy_back_normal",
      "face_shy_back_vampire",
      "face_shy_front"
    ]
  },
  surprice: {
    coordinate: [0.2, 0.2],
    value: [
      "face_surprise_back_japan",
      "face_surprise_back_normal",
      "face_surprise_back_vampire",
      "face_surprise_front"
    ]
  },
  talk: {
    coordinate: [0.1, 0.1],
    value: [
      "face_talk_back_japan",
      "face_talk_back_normal",
      "face_talk_back_vampire",
      "face_talk_front"
    ]
  },
  temptation: {
    coordinate: [0.1, 0.5],
    value: [
      "face_temptation_back_japan",
      "face_temptation_back_normal",
      "face_temptation_back_vampire",
      "face_temptation_front"
    ]
  }, //诱惑
  worry: {
    coordinate: [-0.1, -0.5],
    value: [
      "face_worry_back_japan",
      "face_worry_back_normal",
      "face_worry_back_vampire",
      "face_worry_front"
    ]
  }
};

/**
 * 两点之间求最短距离
 * @date 2020-11-21
 * @param {any} p1
 * @param {any} p2
 * @returns {any}
 */
function twoPointDistance(p1, p2) {
  let dep = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  return dep;
}

//搜索最近的情绪表情

function findMood(happy, excited) {
  let coord = [happy, excited];
  let arr = Object.keys(moodType);

  let { keys, values, entries } = Object;
  let minKey = "";
  let minNum = 100;
  for (let [key, value] of entries(moodType)) {
    let dis = twoPointDistance(coord, value.coordinate);
    if (dis < minNum) {
      minKey = key;
      minNum = dis;
    }
    //   console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
  }
  return minKey;
}
// findMood(1,1)

export default {
  name: "lotus",
components:{
  mood,
  heart
},
  data() {
    return {
      addtmp:{
        name:"",
        excited:0,
        happy:0
      },
      modal1:false,
       modal2:false,
       modal3:false,
      show: false,
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
          hair_b: "hair_semi_back_main_vampire"
        }
      ],
      moods: {
        eyetype: 0,
        excited: 0,
        happy: 0,
        impression: 0
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
        "hair_s"
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
        hair_b: "hair_semi_back_main_vampire"
      },
      opcity:{
        outside_f:100,
        bottom:100,
        outside_b:100,
        top:100,
        under:100
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
        under: seletedDecoration(under)
      }
    };
  },
  watch: {
    checked() {
      this.$store.dispatch("smallhappy");
    },
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
    }
  },
  methods: {
    getOpacity(i){
    
        if(this.opcity[i]!=0&&this.opcity[i]!=undefined){
          return this.opcity[i]/100
        }
        return 1

    },
    deletecache(i){
        this.$delete(store.tmps,i)
    },
    reshow(i){
      this.$store.dispatch("smallexcited");
      this.body= store.tmps[i].body
      if(store.tmps[i].checked){
     this.checked= store.tmps[i].checked
      }
 
      this.modal2=false
    },
    save1(){
      mutations.add({name:this.addtmp.name,
      excited:this.addtmp.excited,
      happy:this.addtmp.happy,
      body:this.body,
      checked:this.checked})
    },
    clothChange(){
      this.$store.dispatch("smallexcited");
    },
    saveInTmp(){
      this.theme.push({
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
          hair_b: "hair_semi_back_main_vampire"
        })
      
    },
    save() {
      this.$store.dispatch("smallhappy");
      this.$store.dispatch("smallexcited");
      localStorage.setItem("body", JSON.stringify(this.body));
      localStorage.setItem("checked", JSON.stringify(this.checked));
    
    },
    toggle(show) {
      this.$store.dispatch("smallhappy");
       this.show = !this.show;
      if (this.show) {
        this.$electron.ipcRenderer.send("changesize", {
          width: 604,
          height: 430
        });
      } else {
        this.$electron.ipcRenderer.send("changesize", {
          width: 204,
          height: 430
        });
      }
     

    },
    getImg(name) {
      return require(`./../assets/doll1/${name}.png`);
    },
    moodChange(type) {
      let mood = moodType[type];
      if (mood != undefined) {
        if (mood.value.length >= 4) {
          this.body.face_f = mood.value[3];
          this.body.face_b = mood.value[this.moods.eyetype];
        } else {
          this.body.face_f = mood.value[1];
          this.body.face_b = mood.value[0];
        }
      } else {
        log("没有对应的情绪");
      }
    },
    randomChange() {
      let arr = Object.keys(moodType);
      this.$store.dispatch("smallexcited");
      var index = Math.floor(Math.random() * arr.length);
      this.moodChange(arr[index]);
    }
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      happy(state) {
        this.moodChange(findMood(state.Counter.happy, state.Counter.excited));
        return state.Counter.happy.toFixed(2);
      },
      excited(state) {
        this.moodChange(findMood(state.Counter.happy, state.Counter.excited));
        return state.Counter.excited.toFixed(2);
      }
    }),
    list(){
      return store.tmps
    }
  },
  mounted() {
    log("我是芙蓉~")
    //如果缓存里有数据 就直接读取上次缓存的数据
    if (localStorage.getItem("body") != null) {
      this.body = JSON.parse(localStorage.getItem("body"));
    }
    //缓存开关设置
    if (localStorage.getItem("checked") != null) {
      this.checked = JSON.parse(localStorage.getItem("checked"));
    }

    setInterval(() => {
     this.$http.get("http://v3.wufazhuce.com:8000/api/channel/one/0/%E6%9D%AD%E5%B7%9E").then(({data})=>{
        let {data:{
          weather,content_list
        }}=data;
        let  {city_name,date,climate,humidity,hurricane,temperature,wind_direction}=weather;
        let [info]=content_list
        log(`今天是${date},${city_name}的天气是${climate}.现在的温度是${temperature}度.我想对你说：${info.forward}`)
        this.$store.dispatch("smallhappy");
      })
         }, 600000);
    setInterval(() => {
      this.$store.dispatch("smallunhappy");
      this.$store.dispatch("smallunexcited");

    }, 6000000);

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
  top: 40px;
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
body {
  background: none;
}
.mood{
    position: fixed;
    z-index: 99999;
    bottom: 18px;
    transform: scale(0.3);
    left: 35px;
}
</style>
