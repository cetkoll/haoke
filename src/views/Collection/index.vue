<template>
  <div>
    <van-nav-bar
      title="收藏列表"
      left-text
      left-arrow
      @click-left="$router.push('/my')"
    />
    <div class="list" v-for="(item, index) in getMyFavoriteList" :key="index">
      <div class="photo">
        <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
      </div>
      <div class="text">
        <h4 class="van-ellipsis">{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
        <div class="describe">
          <div
            class="descibeSon"
            v-for="(item1, index1) in item.tags"
            :key="index1"
          >
            {{ item1 }}
          </div>
        </div>
        <p class="money">
          <span>{{ item.price }}</span
          >元/月
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyFavorite } from '@/api/my'
export default {
  async created () {
    try {
      const res = await getMyFavorite()
      this.getMyFavoriteList = res.data.body
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      getMyFavoriteList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #e5e5e5;
  .photo {
    position: relative;
    width: 106px;
    height: 80px;
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
    }
  }
  .text {
    width: calc(100vw - 106px);
    height: 100%;
    padding-top: 32px;
    margin-left: 15px;
    h4 {
      margin: 0;
      font-size: 15px;
      color: #394043;
    }
    p {
      margin: 0;
      line-height: 22px;
      font-size: 12px;
      color: #afb2b3;
    }
    .describe {
      display: flex;
      .descibeSon {
        font-size: 12px;
        border-radius: 3px;
        padding: 5px 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        line-height: 12px;
        &:nth-child(1) {
          color: #39becd;
          background: #e1f5f8;
        }
        &:nth-child(2) {
          color: #3fc28c;
          background: #e1f5ed;
        }
        &:nth-child(3) {
          color: #5aabfd;
          background: #e6f2ff;
        }
      }
    }
    .money {
      line-height: 22px;
      font-size: 12px;
      color: #fa5741;
      span {
        font-size: 16px;
        color: #fa5741;
        font-weight: 600;
      }
    }
  }
}
</style>
