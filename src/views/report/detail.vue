<template>
  <div class="reportdetail">
    <div class="h-bg"></div>
    <!-- 头部信息 -->
    <div class="box" style="margin-top:-80px">
      <div class="header">
        <img class="icon" :src="UserInfo.Icon" @error="imageLoadOnError" alt />
        <span class="name">{{UserInfo.Name}}</span>
        <span class="sex">{{UserInfo.SexName}}</span>
        <span class="status f-r">已确定</span>
      </div>
      <div>
        <span class="label">学号</span>
        <span class="lable value">{{UserInfo.UserCode}}</span>
      </div>
      <div>
        <span class="label">学院</span>
        <span class="lable value van-ellipsis">{{UserInfo.StudentAcademy}}</span>
      </div>
      <div>
        <span class="label">班级</span>
        <span class="lable value van-ellipsis">{{UserInfo.Class}}</span>
      </div>
    </div>
    <!-- 地址信息 -->
    <div class="box">
      <div>
        <span class="label">当前所在地</span>
        <span class="lable value van-ellipsis">{{UserInfo.Class}}</span>
      </div>
      <div>
        <span class="label">监护人</span>
        <span class="lable value van-ellipsis">{{UserInfo.Class}}</span>
        <span class="lable value van-ellipsis">{{UserInfo.Class}}</span>
      </div>
    </div>
    <van-panel style="margin:auto 20px" title="上报跟踪">
      <van-steps direction="vertical">
        <van-step>
          <p>2月2日 10:50</p>
          <div class="step-label">
            老师已确定，标记
            <span class="status">疑似</span>
          </div>
        </van-step>
        <van-step>
          <p class="time">2月2日 10:50</p>
          <div class="step-label">上报疫情</div>
          <div class="desc">这是学生上报的内容详情，这是学生上报的内容详情这是学生上报的内容详情，这是学生上报的内容详情这是学生上报的内容详情，这是学生上报的内容详情这是学生上报的内容详情</div>
        </van-step>
      </van-steps>
    </van-panel>
    <van-button
      class="submit"
      @click="statusReportUpdate"
      :disabled="disabledUpdate"
      type="primary"
    >更新状态</van-button>
  </div>
</template>
<style scoped lang="less">
.reportdetail {
  height: 100vh;
  overflow: auto;
  .h-bg {
    background: #fbb200;
    height: 114.5px;
  }
  .box {
    background: #ffffff;
    margin: 20px 20px 20px 20px;
    border-radius: 6px;
    padding: 16px 12px;
  }
  .header {
    .name {
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      text-align: left;
      line-height: 36px;
      margin-right: 6px;
      vertical-align: super;
    }
    .sex {
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #7b7b7b;
      letter-spacing: 0;
      text-align: left;
      line-height: 36px;
      vertical-align: super;
    }
    .icon {
      margin-right: 10px;
      border-radius: 18px;
      width: 36px;
      height: 36px;
      vertical-align: sub;
    }
    .status {
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #fbb200;
      letter-spacing: 0;
      text-align: left;
      line-height: 36px;
    }
  }
  .label {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 3px;
    color: #7b7b7b;
    line-height: 32px;
    margin-right: 8px;
  }
  .value {
    color: #333333;
    font-size: 18px;
  }
  .time {
    color: #7b7b7b;
  }
  .status {
    color: #fbb200;
  }
  .desc {
      margin-top: 5px;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    line-height: 21px;
  }
}
</style>
<script>
import { setAntTitle } from "../../lib/common";
import { getUserInfo } from "../../service/common.service";
export default {
  name: "reportdetail",
  data() {
    return {
      RecordID: "",
      disabledUpdate: true,
      UserInfo: {}
    };
  },
  created() {
    this.RecordID = this.$route.query.RecordID;
    setAntTitle("疫情详情");
    getUserInfo().then(r => {
      const re = r.data;
      if (!re.FeedbackCode) {
        this.UserInfo = re.Data || {};
      }
    });
  },
  methods: {
    imageLoadOnError() {
      this.UserInfo.Icon = require("../../assets/images/user.jpg");
    },
    statusReportUpdate() {
      console.log("statusReportUpdate");
    }
  }
};
</script>