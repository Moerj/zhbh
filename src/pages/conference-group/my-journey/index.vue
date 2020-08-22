<template>
  <ui-main>
    <template v-slot:header>
      <van-tabs v-model="active" @click="onTabsClick">
        <van-tab v-for="(v,i) of dates" :title="$dayjs(v).format('M月YY号')" :key="i"/>
      </van-tabs>
      <div class="title">
        您的行程
      </div>
    </template>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
    >
      <van-steps direction="vertical" :active="0">
        <van-step v-for="(v,i) of ">
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
      </van-steps>
    </ui-pull>
    <empty :list="list"/>

    <ConferenceGroupTabbar/>
  </ui-main>
</template>

<script>
import ConferenceGroupTabbar from '@/components/ConferenceGroupTabbar'
import empty from '@/components/empty'

function getQuery () {
  return {
    shop: [],
    pageNo: 1,
    pageSize: 0,
  }
}

export default {
  name: 'App',
  components: {
    ConferenceGroupTabbar, empty
  },
  data () {
    return {
      active: 0,
      dates: [
        '2020-08-20',
        '2020-08-21',
        '2020-08-22',
        '2020-08-23',
        '2020-12-24',
        '2020-12-24',
        '2020-12-24',
      ],
      query: getQuery(),
      list: [],
      total: null
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler (newVal) {
        this.getList()
      }
    }
  },
  methods: {
    onTabsClick () {
      this.$refs.pull.reload()
    },
    getList () {
      this.list.length = 0
      /*this.$http.post('', this.query).then(({ data }) => {
        if (data) {
          this.list = data.records || []
          this.total = data.total
        } else {
          this.total = 0
        }
      }).finally(e => {
        this.$refs.pull.endSuccess()
      })*/
      setTimeout(() => {
        this.list = [
          {
            businessTypeId: 1,
            title: '安岳黄柠檬3-3.5斤装岳黄柠檬3-3.5斤装',
            labels: ['销量过千', '超红爆款', '销量过千', '超红爆款'],
            price: '29.9',
            award: '1.5',
            shop: '品质水果旗舰店品质水果旗舰店',
            purchasedNumber: 588,
            isHot: true
          },
        ]
        this.$refs.pull.endSuccess()
      }, 500)
    },
  }
}
</script>

<style lang="scss" scoped>
.title {
  background-image: url(./assets/title-bg.png);
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  height: 82px;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 600;
  color: #292a2c;
}

</style>
