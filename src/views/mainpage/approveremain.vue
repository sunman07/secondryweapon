<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        v-for="(item,index) in entryDetails"
        :key="index"
        :title="item"
        @click="pushDetails(item)"
      >
        <van-row>
          <van-col span="4">a</van-col>
          <van-col span="20">
            <van-row>
              <van-col span="16">申请人:测试</van-col>
              <van-col span="8">申请时间:2020-06-21</van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { List, Row, Col } from "vant";
import { getStudentsScoreInfo } from "../../service/common.service";
Vue.use(List).use(Row).use(Col);
export default {
  name: "approveremain",
  data() {
    return {
      list:[],
      entryDetails: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    getStudentsScoreDetails(params) {
      getStudentsScoreInfo(params).then((res) => {
        if (res.status === 200) {
          this.entryDetails = res.data.List;
        }
      });
    },
    pushDetails(item) {
      console.log(item);
      this.$router.push({
        name: "appdetails",
        query: { mark: item },
      });
    },
  },
  mounted() {
    let params = { ApprovalStatus: 10, Page: 1, PageCount: 9999 };
    this.getStudentsScoreDetails(params);
  },
};
</script>

<style lang="less" scoped>
.van-col--16,
.van-col--8 {
  font-size: 14px;
}
</style>