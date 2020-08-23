<template>
  <ui-main>
    <ui-pull @load="getList"
             v-model="list"
             :num.sync="query.pageNo"
             :total="total"
             ref="pull"
    >
      <div class="list-item" v-for="v of list">
        <header>
          <div class="tr">
            <div class="th">嘉宾姓名</div>
            <div class="td ellipsis-1">{{v.name}}</div>
          </div>
        </header>
        <main>
          <div class="tr">
            <div class="th">嘉宾身份</div>
            <div class="td ellipsis-1">{{v.identity}}</div>
          </div>
          <div class="tr">
            <div class="th">嘉宾电话</div>
            <a class="td ellipsis-1" :href="`tel:${v.phone}`">
              <van-icon :name="require('@/imgs/tel.svg')" size="12"/>
              &nbsp;{{v.phone}}
            </a>
          </div>
        </main>
      </div>
    </ui-pull>
    <empty :list="list"/>
  </ui-main>
</template>

<script>
import empty from '@/components/empty'

function getQuery () {
  return {
    pageNo: 1,
    pageSize: 0,
  }
}

export default {
  components: {
    empty
  },
  data () {
    return {
      list: [],
      query: getQuery(),
      total: null
    }
  },
  watch: {
    query: {
      deep: true,
      handler (newVal) {
        this.getList()
      }
    }
  },
  methods: {
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
            phone: '15797426874',
            identity: '联通旅游行业总监',
            name: '张涛',
          }, {
            phone: '15797426874',
            identity: '联通旅游行业总监',
            name: '张涛',
          },
        ]
        this.$refs.pull.endSuccess()
      }, 500)
    },
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

  &:last-child {
    margin-bottom: 0;
  }

  height: 122px;
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
