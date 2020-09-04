<template>
  <ui-main>
    <template #header>
      <van-search
        v-model="query.searchNameOrPhone"
        shape="round"
        placeholder="输入嘉宾姓名或手机号搜索"
      />
      <van-tabs v-model="tab" @click="onClickTab">
        <van-tab title="我的" name="1"/>
        <van-tab title="全部" name="0"/>
      </van-tabs>
    </template>

    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
             v-if="list&&list.length>0"
    >
      <div class="list-item" v-for="v of list">
        <header>
          <div class="tr">
            <div class="th">嘉宾姓名</div>
            <div class="td ellipsis-1">{{ v.realName }}</div>
          </div>
        </header>
        <main>
          <div class="tr">
            <div class="th">嘉宾身份</div>
            <div class="td ellipsis-1">{{ v.duty }}</div>
          </div>
          <div class="tr">
            <div class="th">嘉宾电话</div>
            <a class="td ellipsis-1" :href="`tel:${v.phoneNo}`">
              <van-icon :name="require('@/imgs/tel.svg')" size="12"/>
              &nbsp;{{ v.phoneNo }}
            </a>
          </div>
          <template v-if="schType===3">
            <div class="tr">
              <div class="th">车辆类型</div>
              <div class="td ellipsis-1">{{ v.carType }}</div>
            </div>
            <div class="tr">
              <div class="th">车号</div>
              <div class="td ellipsis-1">{{  }}</div>
            </div>
            <div class="tr">
              <div class="th">车牌号</div>
              <div class="td ellipsis-1">{{ v.carNo }}</div>
            </div>
            <div class="tr">
              <div class="th">司机姓名</div>
              <div class="td ellipsis-1">{{ v.driver }}</div>
            </div>
            <div class="tr">
              <div class="th">司机电话</div>
              <div class="td ellipsis-1">{{ v.driverPhone }}</div>
            </div>
          </template>
          <template v-else-if="schType===2">
            <div class="tr">
              <div class="th">桌号</div>
              <div class="td ellipsis-1" v-if="!$isEmpty(v.tabNo)">{{ v.tabNo + '号' }}</div>
            </div>
          </template>
          <template v-else-if="schType===1">
            <div class="tr">
              <div class="th">座位</div>
              <div class="td ellipsis-1">{{ v.tabNo + v.seatNo }}
              </div>
            </div>
          </template>
        </main>
      </div>
    </ui-pull>
    <empty v-else :list="list"/>

    <template #footer>
      <Tabbar/>
    </template>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'
import Tabbar from '../Tabbar'

function getQuery () {
  return {
    userId: localStorage.user ? JSON.parse(localStorage.user).id : null,
    searchNameOrPhone: '',
    isMine: '1',
  }
}

export default {
  components: {
    empty, Tabbar
  },
  data () {
    return {
      tab: 0,
      list: [],
      query: getQuery(),
      total: null,
      schType: Number(this.$route.query.schType)
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
    getList () {
      this.list.length = 0
      this.$http.get('h5api/meet/get/serveuser', {
        params: {
          ...this.query,
          schId: this.$route.query.schId
        }
      }).then(({ data }) => {
        this.list = data || []
      }).finally(e => {
        this.$refs.pull?.endSuccess()
      })
    },
    onClickTab (name, title) {
      this.query.isMine = name
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.list-item {
  margin: 0 10px 10px 10px;

  &:first-child {
    margin-top: 10px;
  }

  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.08);
  padding: 0 10px;

  & > header {
    & > .tr {
      height: 43px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .th {
        font-size: 16px;
        color: #2e3032;
        flex-shrink: 0;
      }

      & > .td {
        font-size: 16px;
        font-weight: 500;
        color: #2e3032;
      }
    }
  }

  & > main {
    padding-top: 5px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #e5e6ea;
    }

    & > .tr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 35px;

      & > .th {
        font-size: 16px;
        font-weight: 300;
        color: #595b64;
        flex-shrink: 0;
      }

      & > .td {
        font-size: 16px;
        color: #292a2c;
      }
    }
  }
}
</style>
