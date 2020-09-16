<template>
  <div class="my-tabs">
    <div class="tabs-bar">
      <div class="tabs-bar-nav">
        <div class="tabs-tab" v-for="tab in tabList" :class="[tabIndex == tab.index ? 'tabs-active' : '']"
             :style="tab.index!=0?'margin-left: 30px':''" @click="changeTab(tab)">
          <slot name="title" :data="tab">{{tab.name}}</slot>
        </div>
      </div>
    </div>
    <div class="tabs-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'QTabTop',
    props:{
      tabList: Array,
      tabIndex: Number
    },
    watch: {

    },
    data(){
      return {

      }
    },
    mounted(){

    },
    methods:{
      changeTab: function (tab) {
        this.$emit('changeTab', tab)
      }
    }
  }
</script>

<style scoped >
  .my-tabs {
    font-size: 14px;
    color: #444;
  }
  .tabs-bar {
    position: relative;
    height: 32px;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 0.1rem;
    margin-bottom: -.2rem;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;
  }
  .tabs-bar::-webkit-scrollbar{
    display: none;
  }
  .tabs-bar-nav {
    display: flex;
    position: absolute;
  }
  .tabs-tab {
    min-width: 90px;
    padding: 4px 6px;
    position: relative;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border-radius: 32px;
    color: #BEB3B3;
    font-weight: 900;
    background: white;
    border: 1px solid white;
  }
  .tabs-active {
    border: 1px solid white;
    background: #CB1512;
    color: #FFFFFF;
  }
  .tabs-content {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
  }
</style>
