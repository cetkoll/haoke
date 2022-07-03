<template>
  <div class="main">
    <van-nav-bar
      title="发布房源"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell
        :style="{ color: '#21b97a', 'font-size': '15px' }"
        title="房源信息"
      />
      <van-cell title="小区名称" is-link value="请输入小区名称" />
      <van-field
        v-model="money"
        name="用户名"
        type="number"
        label="租金"
        right-icon="123"
        placeholder="请输入租金/月"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #extra>
          <span style="color: #888">￥/月</span>
        </template>
      </van-field>
      <van-field
        v-model="size"
        name="用户名"
        type="number"
        label="建筑面积"
        placeholder="请输入建筑面积"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #extra>
          <span style="color: #888">㎡</span>
        </template>
      </van-field>
      <van-cell title="户型" is-link :value="doorModel" @click="show = true" />
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="show = false"
          />
        </div>
      </van-overlay>

      <van-cell title="所在楼层" is-link @click="show1 = true" :value="floor" />
      <van-overlay :show="show1" @click="show1 = false">
        <div class="wrapper">
          <van-picker
            show-toolbar
            :columns="columns1"
            @confirm="onConfirm1"
            @cancel="show1 = false"
          />
        </div>
      </van-overlay>
      <van-cell title="朝向" @click="show2 = true" is-link :value="direction" />
      <van-overlay :show="show2" @click="show2 = false">
        <div class="wrapper">
          <van-picker
            show-toolbar
            :columns="columns2"
            @confirm="onConfirm2"
            @cancel="show2 = false"
          />
        </div>
      </van-overlay>
      <van-cell title="房屋标题" />
    </van-cell-group>
  </div>
</template>

<script>
import { houseParams } from '@/api/home'
export default {
  async created () {
    try {
      const res = await houseParams()
      console.log(res)
      res.data.body.floor.forEach(item => {
        this.columns1.push(item.label)
      })
      res.data.body.oriented.forEach(item => {
        this.columns2.push(item.label)
      })
      res.data.body.roomType.forEach(item => {
        this.columns.push(item.label)
      })
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      doorModel: '请选择',
      floor: '请选择',
      direction: '请选择',
      money: '',
      size: '',
      columns: [],
      columns1: [],
      columns2: [],
      show: false,
      show1: false,
      show2: false
    }
  },
  methods: {
    onConfirm (value) {
      this.doorModel = value
      this.show = false
    },
    onConfirm1 (value) {
      this.floor = value
      this.show1 = false
    },
    onConfirm2 (value) {
      this.direction = value
      this.show2 = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding-top: 45px;
}

/deep/.van-field__label {
  color: #323232;
}
.wrapper {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
