<template>
  <div>
    <van-nav-bar title="地图" fixed left-arrow @click-left="$router.back()" />
    <div id="container"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  created () {

  },
  data () {
    return {
      map: null
    }
  },
  mounted () {
    // DOM初始化完成进行地图初始化
    this.initMap()
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: 'bc95edbbb7f3fa40bb524b6edc5d2e9b', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const map = new AMap.Map('container', {
          viewMode: '3D',
          zoom: 13,
          center: [116.497552, 39.96603],
          resizeEnable: true
        })

        // 创建纯文本标记
        const text = new AMap.Text({
          text: '1111111',
          anchor: 'center', // 设置文本标记锚点
          draggable: true,
          cursor: 'pointer',
          angle: 10,
          style: {
            padding: 0,
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            width: '1.5rem',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            color: 'blue'
          },
          position: [116.497552, 39.96603]
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
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
