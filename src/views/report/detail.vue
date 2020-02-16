<template>
  <div class="detail">
    <div class="h-bg"></div>
    <!-- 头部信息 -->
    <div class="box" style="margin-top:-80px">
      <div class="header">
        <img class="icon" :src="UserInfo.Icon" @error="imageLoadOnError" alt />
        <span class="name">{{UserInfo.Name}}</span>
        <span class="sex">{{UserInfo.SexName}}</span>
        <span class="status f-r">{{CurentSep.ConfirmStatusName||'未核实'}}</span>
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
        <span class="lable value van-ellipsis">{{UserInfo.ClassName}}</span>
      </div>
    </div>
    <!-- 地址信息 -->
    <div class="box">
      <div>
        <span class="label">当前所在地</span>
        <span class="lable value">{{ReportUnusual.CurrentAddress}}</span>
      </div>
      <div>
        <span class="label">监护人</span>
        <span class="lable value van-ellipsis">{{ReportUnusual.GuardianName}}</span>
        &nbsp;
        <span class="lable value van-ellipsis">{{ReportUnusual.GuardianPhone}}</span>
      </div>
    </div>
    <van-panel style="margin:auto 20px" title="上报跟踪">
      <van-steps direction="vertical">
        <van-step v-for="(step,ix) of Septs" :key="ix">
          <!-- 上报疫情 -->
          <div v-if="step.OpType==1">
            <p class="time">{{$moment(step.ReportTime).format('MM月DD日 hh:mm')}}</p>
            <div class="step-label">情况上报</div>
            <div class="desc">发生日期: {{$moment(step.SituationDate).format('MM月DD日')}}</div>
            <div class="desc">情况说明: {{step.SituationStatusName}}</div>
            <div
              class="desc"
              v-if="step.SituationStatusName.split().includes('其他情况')"
            >{{step.FollowContent}}</div>
            <div class="desc">采取措施: {{step.SituationMeasureName}}</div>
          </div>
          <!-- 老师确定疫情/跟踪疫情 -->
          <div v-if="step.OpType==2">
            <div>
              <p>{{$moment(step.OpTime).format('MM月DD日 hh:mm')}}</p>
              <div class="step-label">
                <span :style="{color:step.Color}">{{step.FollowStatusName}}</span> 辅导员已核实
              </div>
            </div>
          </div>
          <!-- 上报平安 -->
          <div v-if="step.OpType==4">
            <p>{{$moment(step.ReportTime).format('MM月DD日 hh:mm')}}</p>
            <div class="step-label">上报平安</div>
          </div>
          <!-- 未上报 -->
          <div v-if="step.OpType==5">
            <p>{{$moment(step.OpTime).format('MM月DD日')}}</p>

            <div class="step-label">未上报</div>
          </div>
          <!-- 未跟踪 -->
          <div v-if="step.OpType==6">
            <p>{{$moment(step.OpTime).format('MM月DD日')}}</p>
            <div class="step-label">未跟踪</div>
          </div>
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
.detail {
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
  .htitle {
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #0f0f0f;
    letter-spacing: 0;
    text-align: left;
  }
  .desc {
    margin-top: 5px;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    text-align: left;
    line-height: 21px;
  }
}
</style>
<script>
import { setAntTitle } from "../../lib/common";
import { TimeLine } from "../../service/common.service";
import { mapState } from "vuex";
export default {
  name: "reportdetail",
  data() {
    return {
      RecordID: "",
      disabledUpdate: true,
      Septs: [],
      CurentSep: {},
      ReportUnusual: {}
    };
  },
  computed: mapState(["UserInfo"]),
  created() {
    setAntTitle("疫情详情");
    this.getFlowList();
  },
  methods: {
    imageLoadOnError() {
      this.UserInfo.Icon = require("../../assets/images/user.jpg");
    },
    getFlowList() {
      TimeLine().then(r => {
        const re = r.data;
        if (!re.FeedbackCode) {
          const Data = re.Data;
          this.Septs = Data || [];
          console.log("this.Steps", this.Septs);
          if (this.Septs[0].TeachIntelUserCode) {
            this.disabledUpdate = false;
          }
          /*  if (this.CurentSep.ConfirmStatus) {
            this.disabledUpdate = false;
          }
          if (!this.CurentSep.ConfirmStatus) {
            this.Septs.unshift({ mark: true, ConfirmStatusName: "待确定" });
          } */
        }
      });
    },
    statusReportUpdate() {
      console.log("statusReportUpdate");
      this.$router.push({ path: "report" });
    }
  }
};
</script>