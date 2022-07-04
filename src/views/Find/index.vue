<template>
  <div class="main">
    <div class="headers">
      <van-icon
        name="arrow-left"
        color="#fff"
        class="lefticon"
        @click="$router.push('/home')"
      />
      <div class="searchHeader">
        <div class="address" @click="$router.push('city')">
          <p>{{ $store.state.nowCity }}</p>
          <van-icon name="arrow-down" />
        </div>
        <van-icon name="search" background="#4fc08d" />
        <p>请输入小区或地址</p>
      </div>
      <van-icon name="map-marked" />
    </div>
    <div class="fixdheader">
      <div class="choose" :class="{ active: active === 0 }" @click="area">
        <p>区域</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 1 }" @click="way">
        <p>方式</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 2 }" @click="money">
        <p>租金</p>
        <van-icon name="arrow-down" />
      </div>
      <div class="choose" :class="{ active: active === 3 }" @click="choose">
        <p>筛选</p>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <van-popup v-model="areashow" duration="0.2" :style="{ height: '45%' }">
      <div class="fixdheader">
        <div class="choose" :class="{ active: active === 0 }" @click="area">
          <p>区域</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 1 }" @click="way">
          <p>方式</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 2 }" @click="money">
          <p>租金</p>
          <van-icon name="arrow-down" />
        </div>
        <div class="choose" :class="{ active: active === 3 }" @click="choose">
          <p>筛选</p>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <div class="area" v-show="active === 0">
        <van-picker
          show-toolbar
          title="标题"
          :columns="columns"
          @confirm="onConfirm"
        />
      </div>
      <div class="area" v-show="active === 1">区域页面2</div>
      <div class="area" v-show="active === 2">区域页面3</div>
      <div class="area" v-show="active === 3">区域页面4</div>
    </van-popup>
  </div>
</template>

<script>
import { getCitySon, allCitySon } from '@/api/find'

export default {
  created () {
    this.getCitySon()
  },
  data () {
    return {
      active: 0,
      areashow: false,
      columns: [
        {
          text: '区域',
          children: [{ text: '不限', children: [''] }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      secondCity: [],
      allCityArea: []
    }
  },
  methods: {
    area () {
      this.active = 0
      this.areashow = true
    },
    way () {
      this.active = 1
      this.areashow = true
    },
    money () {
      this.active = 2
      this.areashow = true
    },
    choose () {
      this.active = 3
      this.areashow = true
    },
    async getCitySon () {
      try {
        const res = await getCitySon(this.$store.state.nowCityId)
        this.secondCity = res.data.body
        res.data.body.forEach(item => {
          const obj = { text: item.label, children: ['不限'] }
          this.columns[0].children.push(obj)
        })
      } catch (error) {
        console.log(error)
      }
      this.getAllCitySon()
    },
    onConfirm (value, index) {
      console.log(value, index)
      console.log(this.secondCity[index[1] - 1].value)
      this.$store.commit('setActiveCity', this.secondCity[index[1] - 1].value)
    },
    getAllCitySon () {
      if (this.$store.state.resData.length !== 0) {
        this.columns = this.$store.state.resData
      } else {
        this.$store.commit('setResData', this.columns)
        this.secondCity.forEach(async (item, index) => {
          try {
            const res = await allCitySon(item.value)
            // this.allCityArea.push(res.data.body)
            res.data.body.forEach(item1 => {
              this.columns[0].children[index + 1].children.push(item1.label)
            })
            this.$nextTick(() => {
              this.$store.commit('setResData', this.columns)
            })
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.main {
  height: 667px;
}
.headers {
  background-color: #21b97a;
  display: flex;
  padding-left: 5px;
  align-items: center;
  width: 375px;
  box-sizing: border-box;
  height: 50px;
  .searchHeader {
    display: flex;
    align-items: center;
    border-radius: 3px;
    width: 272px;
    height: 35px;
    background-color: #fff;
    .address {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
      height: 60%;
      border-right: 1px solid rgb(236, 235, 235);
      p {
        font-size: 14px;
        color: #333;
      }
      .van-icon-arrow-down {
        font-size: 12px;
      }
    }
    .van-icon-search {
      margin: 7px;
      margin-left: 10px;
      padding-top: 2px;
      font-size: 18px;
      color: #9c9fa1;
    }
    p {
      font-size: 13px;
      color: #9c9fa1;
    }
  }
  .van-icon-map-marked {
    margin-left: 10px;
    color: #fff;
  }
  .lefticon {
    font-size: 22px;
    margin-right: 20px;
    font-style: normal;
  }
}
.fixdheader {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgb(238, 238, 238);
  width: 375px;
  height: 40px;
  .choose {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #333;
    font-size: 17px;
    .van-icon {
      margin-left: 3px;
      font-size: 12px;
    }
  }
}
.active {
  color: #21b97a !important;
}
.van-popup {
  width: 100%;
  height: 50%;
  margin-top: -134px;
  overflow: hidden;
}
// /deep/.van-picker__toolbar {
//   display: none;
// }
.btn {
  position: absolute;
  display: flex;
  border-top: 1px solid rgb(238, 238, 238);
  width: 100%;
  bottom: 0;
  z-index: 1;
  height: 50px;
  .nosure {
    width: 125px;
    color: #21b97a;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
  .sure {
    color: #fff;
    width: 100%;
    font-size: 18px;
    background-color: #21b97a;
    text-align: center;
    line-height: 50px;
  }
}
</style>
