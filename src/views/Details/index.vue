<template>
  <div class="main">
    <van-nav-bar
      :title="list.community"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <div class="img">
      <img :src="'http://liufusong.top:8080' + list.houseImg" alt="" />
    </div>
    <div class="top">
      <div class="title">
        <h4>{{ list.title }}</h4>
        <span v-for="(item, index) in list.tags" :key="index">{{ item }}</span>
      </div>
      <div class="mid">
        <div class="money">
          <p class="top">
            <span>{{ list.price }}</span
            >/月
          </p>
          <p class="bottom">租金</p>
        </div>
        <div class="type">
          <p class="top">{{ list.roomType }}</p>
          <p class="bottom">房型</p>
        </div>
        <div class="size">
          <p class="top">{{ list.size }}平米</p>
          <p class="bottom">面积</p>
        </div>
      </div>
      <div class="bott">
        <div class="left">
          <p>装修：<span>精装</span></p>
          <p>
            楼层：<span>{{ list.floor }}</span>
          </p>
        </div>
        <div class="right">
          <p>
            朝向：<span>{{ orient }}</span>
          </p>
          <p>类型：<span>普通住宅</span></p>
        </div>
      </div>
      <div class="map">
        <p>小区<span>天山星城</span></p>
        <div id="adress">地图</div>
      </div>
      <div class="setion">
        <p>房屋配套</p>
        <div class="tags">
          <van-grid :border="false">
            <van-grid-item
              icon="point-gift-o"
              :text="item"
              v-for="(item, index) in list.supporting"
              :key="index"
            />
          </van-grid>
        </div>
      </div>
      <div class="information">
        <p>房源概况</p>
        <div class="avatar">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
          <div class="text">
            <p>杨先生</p>
            <p>已认证房主</p>
          </div>
          <div class="btn">发消息</div>
        </div>
        <p class="font">
          {{ list.description }}
        </p>
      </div>
    </div>
    <div class="button">
      <div class="left" @click="like">
        <van-icon v-if="flag" name="like-o" /><van-icon
          v-else
          name="like"
        />收藏
      </div>
      <div class="middle">在线咨询</div>
      <div class="right">电话预约</div>
    </div>
  </div>
</template>

<script>
import { getDetails, addLike, delLike } from '@/api/my'
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  async created () {
    try {
      const res = await getDetails(this.$route.params.houseImg)
      this.list = res.data.body
      this.orient = this.list.oriented[0]
      console.log(res)
      this.initMap()
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
    // DOM初始化完成进行地图初始化
  },
  data () {
    return {
      list: [],
      flag: false,
      orient: ''
    }
  },
  methods: {
    async like () {
      if (this.flag === true) {
        try {
          this.flag = false
          const res = await addLike(this.$route.params.houseImg)
          this.$toast.success('收藏成功')
          console.log(res)
        } catch (error) {
          this.$toast.fail('收藏失败')
        }
      } else {
        try {
          this.flag = true
          const res = await delLike(this.$route.params.houseImg)
          this.$toast.success('删除成功')
          console.log(res)
        } catch (error) {
          this.$toast.success('删除成功')
          console.log(error)
        }
      }
    },
    initMap () {
      AMapLoader.load({
        key: 'bc95edbbb7f3fa40bb524b6edc5d2e9b', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const map = new AMap.Map('adress', {
          viewMode: '3D',
          zoom: 16,
          center: [this.list.coord.longitude, this.list.coord.latitude],
          resizeEnable: true
        })

        // 创建纯文本标记
        const text = new AMap.Text({
          text: this.list.community,
          anchor: 'center', // 设置文本标记锚点
          draggable: true,
          cursor: 'pointer',
          angle: 10,
          style: {
            padding: 0,
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            color: 'blue'
          },
          position: [this.list.coord.longitude, this.list.coord.latitude]
        })

        text.setMap(map)
      }).catch(e => {
        console.log(e)
      })
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
  width: 375px;
  overflow: hidden;
}
/deep/.van-nav-bar__title {
  font-size: 16px;
}
img {
  margin-top: 45px;
  height: 252px;
}
.top {
  box-sizing: border-box;
  padding: 0 15px;
  .title {
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(215, 214, 214);
    h4 {
      margin: 10px 0 5px;
      font-weight: 400;
      font-size: 18px;
      color: #333;
    }
    & > span {
      padding: 5px;
      margin-right: 10px;
      border-radius: 3px;
      color: #39becd;
      background: #e1f5f8;
      font-size: 12px;
    }
  }
}
.mid {
  display: flex;
  border-bottom: 1px solid rgb(215, 214, 214);
  padding-bottom: 20px;
  .top {
    color: #fa5741;
    font-size: 18px;
    font-weight: bolder;
  }
  p {
    margin: 20px 0 0;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .bottom {
    margin: 0;
  }
  .money {
    flex: 1;
    p {
      font-size: 400;
      font-size: 12px;
    }
    span {
      color: #fa5741;
      font-size: 18px;
      font-weight: bolder;
    }
  }
  .type {
    flex: 1;
  }
  .size {
    flex: 1;
  }
}
.bott {
  display: flex;
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
  }
  p {
    font-size: 12px;
    color: #999;
    span {
      color: #333;
    }
  }
}
.map {
  border-top: 1px solid rgb(215, 214, 214);
  p {
    font-size: 14px;
    color: #333;
  }
  #adress {
    height: 125px;
  }
}
.setion {
  p {
    font-weight: 600;
    font-size: 15px;
  }
  .tags {
    border-top: 1px solid rgb(223, 221, 221);
    border-bottom: 1px solid rgb(223, 221, 221);
  }
}
.information {
  p {
    font-weight: 600;
    font-size: 15px;
  }
  .avatar {
    display: flex;
    align-items: center;
    img {
      width: 52px;
      height: 52px;
    }
    .text {
      margin-left: 20px;
      p {
        font-size: 14px;
        color: #333;
        font-weight: 400;
        line-height: 4px;
      }
    }
    .btn {
      position: absolute;
      right: 25px;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 3px;
      padding: 3px 15px;
      font-size: 14px;
    }
  }
  .font {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
}
.button {
  display: flex;
  height: 50px;
  border-top: 1px solid rgb(215, 214, 214);
  .left {
    .van-icon {
      margin-right: 5px;
    }
    text-align: center;
    flex: 1;
    font-size: 17px;
    color: #999;
    line-height: 50px;
    border-right: 1px solid rgb(215, 214, 214);
  }
  .middle {
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    color: #999;
    flex: 1;
  }
  .right {
    text-align: center;
    flex: 1;
    font-size: 17px;
    color: #fff;
    line-height: 50px;
    background-color: #21a97b;
  }
}
</style>
