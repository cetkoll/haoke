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
    <houseList :list="list"></houseList>

    <van-popup
      class="van-popup1"
      v-model="areashow"
      duration="0.2"
      :style="{ height: '45%' }"
    >
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
      <div class="area" v-show="active === 1">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm1"
        />
      </div>
      <div class="area" v-show="active === 2">
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
        />
      </div>
    </van-popup>
    <van-popup
      v-model="show1"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <div class="area pop" v-show="active === 3">
        <div class="onepice">
          <p>户型</p>
          <div class="choose-house">
            <div
              class="option"
              :class="{ activing: item.active }"
              @click="sure(index)"
              v-for="(item, index) in floor"
              :key="index"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="onepice">
          <p>朝向</p>
          <div class="choose-house">
            <div
              class="option"
              v-for="(item, index) in oriente"
              :key="index"
              :class="{ activing: item.active }"
              @click="sure1(index)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="onepice">
          <p>楼层</p>
          <div class="choose-house">
            <div
              class="option"
              v-for="(item, index) in roomType"
              :key="index"
              :class="{ activing: item.active }"
              @click="sure2(index)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="onepice">
          <p>房屋亮点</p>
          <div class="choose-house">
            <div
              class="option"
              v-for="(item, index) in supporting"
              :key="index"
              :class="{ activing: item.active }"
              @click="sure3(index)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
      <div class="button" v-show="show1">
        <div class="nosure" @click="reject">清除</div>
        <div class="sure" @click="success">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCitySon, allCitySon, getMyHouse } from '@/api/find'
import { houseParams } from '@/api/home'
import houseList from '@/components/houseList'
export default {
  async created () {
    this.getCitySon()
    this.getHouse()
    try {
      const res = await getMyHouse(this.params)
      this.list = res.data.body.list
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      active: 0,
      areashow: false,
      show1: false,
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
      allCityArea: [],
      columns1: ['不限', '整租', '合租'],
      columns2: ['不限', '1000及一下', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-7000', '7000以上'],
      floor: [],
      oriente: [],
      roomType: [],
      supporting: [],
      floorbefore: [],
      orientebefore: [],
      roomTypebefore: [],
      supportingbefore: [],
      params: {
        cityId: this.$store.state.nowCityId,
        area: this.$store.state.activeCity,
        rentType: true,
        roomType: null,
        oriented: null,
        characteristic: null,
        floor: null,
        start: 1,
        end: 20
      },
      list: []
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
      this.areashow = false
      this.show1 = true
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
    async onConfirm (value, index) {
      this.areashow = false
      console.log(value, index)
      if (value[1] === '不限') {
        this.$store.commit('setActiveCity', null)
      } else {
        this.$store.commit('setActiveCity', this.secondCity[index[1] - 1].value)
      }
      this.params.area = this.$store.state.activeCity
      try {
        const res = await getMyHouse(this.params)
        this.list = res.data.body.list
      } catch (error) {
        console.log(error)
      }
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
    },
    async onConfirm1 (value) {
      this.areashow = false

      console.log(value)
      if (value === '整租') {
        this.params.rentType = true
      } else {
        this.params.rentType = false
      }
      try {
        const res = await getMyHouse(this.params)
        this.list = res.data.body.list
      } catch (error) {
        console.log(error)
      }
    },
    async onConfirm2 (value) {
      this.areashow = false

      try {
        const res = await getMyHouse(this.params)
        this.list = res.data.body.list
      } catch (error) {
        console.log(error)
      }
    },
    async getHouse () {
      try {
        const res = await houseParams()
        console.log(res)
        this.floorbefore = res.data.body.floor
        this.floorbefore.forEach(item => {
          item.active = false
        })
        this.floor = this.floorbefore
        this.orientebefore = res.data.body.oriented
        this.orientebefore.forEach(item => {
          item.active = false
        })
        this.oriente = this.orientebefore
        this.roomTypebefore = res.data.body.roomType
        this.roomTypebefore.forEach(item => {
          item.active = false
        })
        this.roomType = this.roomTypebefore

        this.supportingbefore = res.data.body.supporting
        this.supportingbefore.forEach(item => {
          item.active = false
        })
        this.supporting = this.supportingbefore
      } catch (error) {
        console.log(error)
      }
    },
    sure (index) {
      this.floor.forEach(item => {
        item.active = false
      })
      this.floorbefore[index].active = !this.floorbefore[index].active
      this.floor = []
      this.floor = this.floorbefore
    },
    sure1 (index) {
      this.oriente.forEach(item => {
        item.active = false
      })
      this.orientebefore[index].active = !this.orientebefore[index].active
      this.oriente = []
      this.oriente = this.orientebefore
    },
    sure2 (index) {
      this.roomType.forEach(item => {
        item.active = false
      })
      this.roomTypebefore[index].active = !this.roomTypebefore[index].active
      this.roomType = []
      this.roomType = this.roomTypebefore
    },
    sure3 (index) {
      this.supporting.forEach(item => {
        item.active = false
      })
      this.supportingbefore[index].active = !this.supportingbefore[index].active
      this.supporting = []
      this.supporting = this.supportingbefore
    },
    reject () {
      this.show1 = false
    },
    async success () {
      try {
        const floorVal = this.floor.filter(item => item.active === true)
        if (floorVal.length === 0) {
          this.params.floor = null
        } else {
          this.params.floor = floorVal[0].value
        }
        const orienteVal = this.oriente.filter(item => item.active === true)
        if (orienteVal.length === 0) {
          this.params.oriented = null
        } else {
          this.params.oriented = orienteVal[0].value
        }
        const roomTypeVal = this.roomType.filter(item => item.active === true)
        if (roomTypeVal.length === 0) {
          this.params.roomType = null
        } else {
          this.params.roomType = roomTypeVal[0].value
        }
        const supportingVal = this.supporting.filter(item => item.active === true)
        if (supportingVal.length === 0) {
          this.params.characteristic = null
        } else {
          this.params.characteristic = supportingVal[0].value
        }
        const res = await getMyHouse(this.params)
        this.list = res.data.body.list
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {
    houseList
  }
}
</script>

<style scoped lang="less">
// .main {
// }
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
.van-popup1 {
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
.van-popup {
  .pop {
    padding-left: 20px;
    overflow: auto;
    height: 616px;
    p {
      margin: 20px 0;
      font-size: 15px;
    }
    .onepice {
      position: relative;
      .choose-house {
        display: flex;
        flex-flow: wrap;
        position: relative;
        width: 211px;
        left: 45px;
        border-bottom: 1px solid #e6e6e7;
        .option {
          height: 32px;
          width: 70px;
          margin: 0 18px 15px 0;
          border: 1px solid #ddd;
          border-radius: 3px;
          line-height: 32px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      }
    }
  }
}
.button {
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  height: 51px;
  width: 295px;
  display: flex;
  background-color: #fff;
  .sure {
    width: 197px;
    background-color: #21b97a;
    text-align: center;
    line-height: 51px;
    font-size: 18px;
    color: #fff;
  }
  .nosure {
    text-align: center;
    width: 98px;
    color: #21b97a;
    font-size: 18px;
    line-height: 51px;
  }
}
.activing {
  background-color: #21b97a;
}
</style>
