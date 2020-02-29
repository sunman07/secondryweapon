<template>
  <div class="detail">
    <div class="h-bg" :style="{background:ReportUnusual.Color}"></div>
    <!-- 头部信息 -->
    <div class="box" style="margin-top:-80px">
      <div class="header">
        <img class="icon" :src="UserInfo.Icon" @error="imageLoadOnError" alt />
        <span class="name">{{UserInfo.Name}}</span>
        <span class="sex">{{UserInfo.SexName}}</span>
        <span
          class="status f-r"
          :style="{color:ReportUnusual.Color}"
        >{{ReportUnusual.ConfirmStatusName||'未核实'}}</span>
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
    <div class="box" style="padding:0">
      <div class="record">上报记录</div>
      <div class="van-hairline--bottom"></div>
      <van-steps direction="vertical" style="margin-bottom: 100px;" active-color="#969799">
        <van-step v-for="(step,ix) of Septs" :key="ix">
          <!-- 上报疫情 -->
          <div v-if="step.OpType==1">
            <p class="time">{{$moment(step.OpTime).format('MM月DD日 HH:mm')}}</p>
            <div class="step-label">学生情况上报</div>
             <div v-if="step.Temperature" class="desc">当天实测体温:
              <span
                :style="{color:
                item.Temperature == '0' ?'#409eff':
               item.Temperature == '1' ?'#67c23a': 
               item.Temperature == '2' ? '#67c23a' : 
               item.Temperature == '3' ? '#f56c6c' :
               item.Temperature == '4' ? '#f10303' : 
               item.Temperature == '5' ? '#f10303' :''
               }"
              >
                {{item.Temperature == '0' ? "暂无数据":
                item.Temperature == '1' ? "小于37°C":
                item.Temperature == '2' ? '37°C ～ 37.3°C' :
                item.Temperature == '3' ? '37.3°C ~ 38°C' :
                item.Temperature == '4' ? '38°C ~ 39°C' :
                item.Temperature == '5' ? '高于39°C' : ''}}
              </span></div>
            <div class="desc">发生日期: {{$moment(step.SituationDate).format('MM月DD日')}}</div>
            <div class="desc">情况说明: {{step.SituationStatusNameArrStr}}</div>
            <div
              class="desc"
              v-if="step.SituationStatusName.split(',').includes('其他情况')"
            >其他情况:{{step.FollowContent}}</div>
            <div class="desc">采取措施: {{step.SituationMeasureName}}</div>
          </div>
          <!-- 老师确定疫情/跟踪疫情 -->
          <div v-if="step.OpType==2">
            <div>
              <p class="time">{{$moment(step.OpTime).format('MM月DD日 HH:mm')}}</p>
              <div class="step-label">
                <span :style="{color:step.Color}">{{step.FollowStatusName}}</span>
                <span v-if="code">辅导员新增上报</span>
                <span v-if="!code"> 辅导员已核实</span>
              </div>
            </div>
          </div>
          <!-- 上报平安 -->
          <div v-if="step.OpType==4">
            <p class="time">{{$moment(step.OpTime).format('MM月DD日 HH:mm')}}</p>
            <div class="step-label" v-if="step.IsFollowed==1">老师代上报平安</div>
            <div class="step-label" v-else>学生上报平安</div>
          </div>
          <!-- 未上报 -->
          <div v-if="step.OpType==5">
            <p class="time">{{$moment(step.OpTime).format('MM月DD日')}}</p>

            <div class="step-label">学生未上报</div>
          </div>
          <!-- 未跟踪 -->
          <div v-if="step.OpType==6">
            <p class="time">{{$moment(step.OpTime).format('MM月DD日')}}</p>
            <div class="step-label">辅导员未跟踪</div>
          </div>
        </van-step>
      </van-steps>
    </div>
    <div class="footer">
      <van-button
        class="submit"
        @click="statusReportUpdate"
        :disabled="disabledUpdate"
        type="primary"
        icon="add-o"
      >新增情况上报</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.detail {
  height: 100vh;
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */

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
  .record {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #7b7b7b;
    letter-spacing: 0;
    text-align: left;
    line-height: 42px;
    margin-left: 12px;
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
      vertical-align: middle;
    }
    .sex {
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #7b7b7b;
      letter-spacing: 0;
      text-align: left;
      line-height: 36px;
      vertical-align: middle;
    }
    .icon {
      margin-right: 10px;
      border-radius: 18px;
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
    .status {
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #fbb200;
      letter-spacing: 0;
      text-align: left;
      line-height: 36px;
      margin-top: 5px;
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
    margin-top: 0px;
  }
  .status {
    color: #fbb200;
  }
  .footer {
    position: fixed;
    width: 100%;
    left: 50%;
    background: #ffffff;
    transform: translateX(-50%);
    padding: 0 0 10px 0;
    bottom: 0px;
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
import {
  TimeLine,
  QueryStudentReportUnusual
} from "../../service/common.service";
import { mapState } from "vuex";
export default {
  name: "reportdetail",
  data() {
    return {
      RecordID: "",
      disabledUpdate: true,
      name: "",
      code: "",
      color: "",
      Septs: [],
      CurentSep: {},
      ReportUnusual: {},
      IntelUserCode: ""
    };
  },
  computed: mapState(["UserInfo"]),
  created() {
    setAntTitle("上报详情");
    this.IntelUserCode = this.$route.query.IntelUserCode || "";
    this.name = this.$route.query.name || "";
    this.code = this.$route.query.code || "";
    this.color = this.$route.query.color || "";
    console.log("this.color", this.color);
    console.log("his.$route.query", this.$route.query);
    //情况上报信息
    QueryStudentReportUnusual(this.IntelUserCode).then(r => {
      const re = r.data;
      if (!re.FeedbackCode) {
        const Data = re.Data;
        this.ReportUnusual = Data.ReportUnusual || {};
        //状态为空可以上报
        if (!this.ReportUnusual) {
          this.disabledUpdate = false;
        }
        if (this.ReportUnusual && this.ReportUnusual.ConfirmStatus) {
          this.disabledUpdate = false;
        }
      }
    });
    this.getFlowList(this.IntelUserCode);
  },
  methods: {
    imageLoadOnError() {
      this.UserInfo.Icon = require("../../assets/images/user.jpg");
    },
    getFlowList(IntelUserCode) {
      TimeLine(IntelUserCode).then(r => {
        const re = r.data;
        if (!re.FeedbackCode) {
          const Data = re.Data;
          this.Septs = Data || [];
          console.log("this.Steps", this.Septs);
          this.Septs.forEach(s => {
            if (s.OpType == 1) {
              const arrs = s.SituationStatusName.split(",");
              if (arrs.includes("其他情况")) {
                s.SituationStatusNameArrStr = arrs
                  .splice(0, arrs.length - 1)
                  .join();
              } else {
                s.SituationStatusNameArrStr = arrs.join();
              }
            }
          });
          /*  if (this.Septs[0].TeachIntelUserCode) {
            this.disabledUpdate = false;
          } */
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