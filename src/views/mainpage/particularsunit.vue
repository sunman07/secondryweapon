<template>
  <div class="bottom-particular">
    <p class="header-particular">积分明细</p>
    <van-row v-for="(item,index) in entryOfParticulars" @click="pushDetails(item)" :key="index">
      <van-col span="6">{{item.ApprovalDate}}</van-col>
      <van-col span="6">
        <a class="line-particular" href="#">论文</a>
      </van-col>
      <van-col span="6">{{item.StandardName}}</van-col>
      <van-col span="6">{{index}}分</van-col>
    </van-row>
    <van-loading v-if="loadingSet" size="16px" />
    <van-divider v-if="!loadingLine" class="loading-particular" @click="loadingSum" dashed>点击加载</van-divider>
    <van-divider v-if="loadingLine" class="loading-particular" dashed>我是有底线的</van-divider>
  </div>
</template>

<script>
import Vue from "vue";
import { Col, Row, Toast, Button, Loading } from "vant";
import {
  getStudentsScoreDetailed,
  getRecordOfApprove,
} from "../../service/common.service";
Vue.use(Col).use(Row).use(Toast).use(Button).use(Loading);
export default {
  name: "particularsunit",
  props: ["headprops"],
  data() {
    return {
      entryOfParticulars: [],
      infoForParams: { Page: 1, PageCount: 5, Types: "", Code: "" },
      loadingSet: false,
      loadingLine: false,
    };
  },
  watch: {
    headprops(newVal) {
      const paramsBackup = JSON.parse(JSON.stringify(newVal));
      this.infoForParams = { Page: 1, PageCount: 5, ...paramsBackup };
      this.getParticularsStudents(this.infoForParams);
    },
  },
  methods: {
    //按下加载一页
    loadingSum() {
      this.infoForParams.Page++;
      this.getParticularsStudents(this.infoForParams);
    },
    //获取明细列表
    getParticularsStudents(params) {
      this.loadingSet = true;
      getStudentsScoreDetailed(params).then((res) => {
        if (res.status === 200) {
          if (res.data.List !== null) {
            console.log(res);
            this.loadingSet = false;
            this.entryOfParticulars.push(...res.data.List);
          } else {
            this.loadingSet = false;
            this.loadingLine = true;
          }
        } else {
          Toast("获取积分明细列表失败");
        }
      });
    },
    //跳转明细查看
    pushDetails(item) {
      console.log(item.RecordId);
      getRecordOfApprove(item.RecordId).then((res) => {
        if (res.status === 200) {
          console.log(res.data.ScoreDetails);
          this.$router.push({
            name: "appdetails",
            query: { mark: res.data.ScoreDetails },
          });
        }
      });
      /*  this.$router.push({
        name: "appdetails",
        query: { mark: item },
      }); */
    },
  },
  mounted() {
    //第一次加载
    const params = {
      Page: 1,
      PageCount: 5,
    };
    this.getParticularsStudents(params);
  },
};
</script>

<style lang="less" scoped>
.bottom-particular {
  background: #fff;
  padding: 0px 0px 16px 0px;
}
.header-particular {
  font-size: 14px;
  letter-spacing: 3px;
  text-indent: 15px;
  line-height: 32px;
  margin: 15px 0px 0px 0px;
}
.van-row .van-col--6 {
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 22px;
  text-indent: 18px;
}
.line-particular {
  color: #405fff;
}
.van-loading--circular {
  text-align: center;
  padding: 6px;
}
.loading-particular {
  font-size: 12px;
  padding: 0 12px;
}
</style>