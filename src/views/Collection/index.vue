<template>
  <div>
    <van-nav-bar
      title="收藏列表"
      left-text
      left-arrow
      @click-left="$router.push('/my')"
    />
    <houseList :list="list"></houseList>
  </div>
</template>

<script>
import houseList from '@/components/houseList'
import { getMyFavorite } from '@/api/my'
export default {
  async created () {
    try {
      const res = await getMyFavorite()
      this.list = res.data.body
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      list: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    houseList
  }
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
