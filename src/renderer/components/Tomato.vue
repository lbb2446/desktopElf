<template>
  <div>
    <!-- {{states.nowTime}} -->
    当前是第{{states.time+1}}个时钟，
    {{tomotoIsStart?"工作时间":"休息"}}，
    {{msg}}
    已经过了{{tomotoTime}}分钟,还剩下{{tomotoLastTime*-1}}分钟

  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: '',
  computed: {
  },
  data () {
    return {
      tomotoIsStart: false,
      tomotoTime: '',
      msg: '',
      tomotoLastTime: '',
      timer: [
        { interval: 45, rest: 15, starttime: '9:30:00' },
        { interval: 45, rest: 15, starttime: '10:30:00' },
        { interval: 45, rest: 15, starttime: '13:30:00' },
        { interval: 45, rest: 15, starttime: '14:30:00' },
        { interval: 45, rest: 15, starttime: '15:30:00' },
        { interval: 45, rest: 15, starttime: '16:30:00' }
      ],
      clock: [
        {
          time: '11:20:00',
          desc: '',
          music: '',
          week: [0, 1, 2, 3, 4, 5]
        }
      ],
      states: {
        time: 0,
        states: 'work', // [work,rest,outwork]
        clockcheck: [],
        nowTime: '13:33:00'
      }
    }
  },
  mounted () {
    // 读取基础数据到data里
    setInterval(() => {
      this.states.nowTime = moment(Date.now()).format('HH:mm:ss')
      let index = this.states.time
      var m1 = moment(moment(Date.now()).format('YYYY-MM-DD') + ' ' + this.timer[index].starttime)
      let intervalTime = m1.clone().add(45, 'minutes')
      let restTime = intervalTime.clone().add(15, 'minutes')
      var m2 = moment(Date.now())
      var du = m2.diff(m1, 'minutes')
      //  输出结果为“10 分钟”
      this.tomotoTime = du
      this.tomotoLastTime = m2.diff(restTime, 'minutes')
      if (this.tomotoIsStart) {
        this.msg = '现在是今天第' + (this.states.time + 1) + '个工作时间'
      } else {
        this.msg = '现在是今天第' + (this.states.time + 1) + '个休息时间，喝点水，动一动吧'
      }
      // 判断是否已经过了一个钟
      for (let i = 0; i < this.timer.length; i++) {
        if (this.states.states !== 'outwork') {
          if (this.states.time < this.timer.length) { // 进入时间判断循环
            this.tomotoIsStart = du < this.timer[index].interval
            if (this.tomotoLastTime > 0) {
              this.states.time = this.states.time + 1
              this.tomotoIsStart = true
              break
            } else {
              // this.tomotoIsStart = false
            }
          } else { // 今天已经完成所有的钟了，进入disable状态
            this.states.states = 'outwork'
            this.msg = '今天的工作结束拉！'
          }
        }
      }

      console.log(du)
    }, 3000)
  }
}
</script>

<style lang="" scoped>
</style>