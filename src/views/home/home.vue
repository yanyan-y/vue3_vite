<!-- home -->
<template>
  <div>home</div>
  <h3>{{$store.state.loadingShow}} </h3>
  <h2>{{$filters.textFilter(10)}}</h2>
  <h2>{{$common.getToken('_version_')}}</h2>
  <el-button type="primary">Primary</el-button>

  <el-input :prefix-icon="Avatar" placeholder="用户名1"></el-input>

  <el-icon :size="20">
    <Edit />
  </el-icon>

  <el-image src="/images/logo.png"></el-image>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
import { Avatar, Edit } from '@element-plus/icons-vue'
import $API from '@/common/api.js'
components: {
  Avatar, Edit
}
console.log($API.login)
const internalInstance = getCurrentInstance()
const {$http, $common} = internalInstance.appContext.config.globalProperties
console.log(internalInstance.appContext.config.globalProperties)
console.log($common.getToken('_version_'))
</script>

<style lang='scss' scoped>
</style>
