<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前用户： {{ name }}</div>
    <p>毕业设计项目 ： MyCloud</p>
    <p>@中南林业科技大学 - - - - - 18级软件工程一班  - - - - - -  - 黄卓远 -  学号：20183353</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
