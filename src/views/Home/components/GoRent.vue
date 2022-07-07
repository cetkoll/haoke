<template>
  <div class="main">
    <van-nav-bar title="发布房源" left-arrow fixed @click-left="onLeft" />
    <van-cell-group>
      <van-cell
        :style="{ color: '#21b97a', 'font-size': '15px' }"
        title="房源信息"
      />
      <van-cell
        title="小区名称"
        is-link
        :value="
          $store.state.adress === '' ? '请输入小区名称' : $store.state.adress
        "
        @click="$router.push('/adress')"
      />
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
      <van-cell title="房屋标题">
        <template #label
          ><van-field
            v-model.trim="value"
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
          />
        </template>
      </van-cell>
      <van-cell title="房屋图像">
        <template #label> </template>
      </van-cell>
      <van-cell title="房屋配置">
        <template #label>
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              @click="onClick(item, index)"
              v-for="(item, index) in columns3"
              :key="index"
            >
              <template #text>
                <p class="vantext" :class="{ active: item.active }">
                  {{ item.label }}
                </p>
              </template>
              <template #icon>
                <van-icon
                  :class="{ active: item.active }"
                  name="point-gift-o"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
      <van-cell title="房屋描述">
        <template #label>
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </template>
      </van-cell>
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
      this.beforeColumns = res.data.body.roomType
      this.beforeColumns1 = res.data.body.floor
      this.beforeColumns2 = res.data.body.oriented
      this.columns3 = res.data.body.supporting
      this.beforeColumns3 = res.data.body.supporting
      this.columns3.forEach(item => {
        item.active = false
      })
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
      message: '',
      value: '',
      doorModel: '请选择',
      floor: '请选择',
      direction: '请选择',
      money: '',
      size: '',
      columns: [], // 三室 roomType
      columns1: [], // 楼层 floor
      columns2: [], // 朝向
      columns3: [], // 配置
      beforeColumns: [],
      beforeColumns1: [],
      beforeColumns2: [],
      beforeColumns3: [],
      show: false,
      show1: false,
      show2: false,
      beforeColumnsValue: null, // 三室value
      beforeColumns1Value: null, // 楼层value
      beforeColumns2Value: null, // 朝向value
      beforeColumns3Value: [], // 配置value
      supportingValue: ''// 最后发请求的值

    }
  },
  methods: {
    onLeft () {
      this.$router.back()
      this.$store.commit('setAdress', '')
    },
    onConfirm (value) {
      this.doorModel = value
      this.show = false
      this.beforeColumns.forEach(item => {
        if (item.label === value) {
          this.beforeColumnsValue = item.value
        }
      })
      console.log(this.beforeColumnsValue)
    },
    onConfirm1 (value) {
      this.floor = value
      this.show1 = false
      this.beforeColumns1.forEach(item => {
        if (item.label === value) {
          this.beforeColumns1Value = item.value
        }
      })
      console.log(this.beforeColumns1Value)
    },
    onConfirm2 (value) {
      this.direction = value
      this.show2 = false
      this.beforeColumns2.forEach(item => {
        if (item.label === value) {
          this.beforeColumns2Value = item.value
        }
      })
      console.log(this.beforeColumns2Value)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    onClick (item, index) {
      this.beforeColumns3[index].active = !this.beforeColumns3[index].active
      this.columns3 = []
      this.columns3 = this.beforeColumns3
      if (item.active) {
        this.beforeColumns3Value.push(item.label)
      } else {
        const index = this.beforeColumns3Value.findIndex(item1 => item1 === item.label)
        this.beforeColumns3Value.splice(index, 1)
      }
      this.supportingValue = ''
      this.beforeColumns3Value.forEach((item, index) => {
        if (index === this.beforeColumns3Value.length - 1) {
          this.supportingValue = this.supportingValue + item
        } else {
          this.supportingValue = this.supportingValue + item + '|'
        }
      })
      console.log(this.supportingValue)
      console.log(this.beforeColumns3Value)
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
.vantext {
  font-size: 14px;
  color: #333;
}
.van-icon-point-gift-o {
  color: #333;
  font-size: 24px;
}
.active {
  color: #21b97a;
}
</style>
