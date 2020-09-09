<template>
  <van-tabs v-model="active">
    <van-tab title="待审批">
      <ApproveRemain />
    </van-tab>
    <van-tab title="已审批"></van-tab>
  </van-tabs>
</template>
<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
import ApproveRemain from "./approveremain";

Vue.use(Tab);
Vue.use(Tabs);
export default {
  components: {
    ApproveRemain,
  },
  data() {
    return { active: 0 };
  },
};
</script>

<style>
</style>