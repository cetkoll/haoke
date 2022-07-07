<template>
  <div>
    <form action="/">
      <van-search
        background="#efeff4"
        @cancel="$router.back()"
        v-model="value"
        show-action
        @input="search"
        placeholder="请输入小区或地址"
      />
      <van-cell-group v-if="value !== ''">
        <van-cell
          :title="item.communityName"
          v-for="(item, index) in list"
          :key="index"
          @click="changeAdress(item.communityName)"
        />
      </van-cell-group>
    </form>
  </div>
</template>

<script>
import { getAdress } from '@/api/home'
let timer = null
export default {
  created () { },
  data () {
    return { value: '', list: [] }
  },
  methods: {
    search () {
      this.getAdress()
      this.$store.commit('setAdress', '')
    },
    getAdress () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        try {
          const res = await getAdress({ name: this.value, id: this.$store.state.nowCityId })
          this.list = res.data.body
        } catch (error) {
          console.log(error)
        }
      }, 500)
    },
    changeAdress (item) {
      this.value = item
      this.$store.commit('setAdress', item)
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
