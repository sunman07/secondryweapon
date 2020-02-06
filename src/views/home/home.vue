<template>
  <div class="index">
    <div class="h-bg"></div>
    <van-panel class="h-header" :title="UserInfo.ClassName||''">
      <ul class="list" style="line-height:44px">
        <li class="item f-s-22" style="color: #0F0F0F;">{{headObj.TotalCount}}</li>
        <li
          class="item f-s-22"
          style="color: #066BFC;"
          @click="finishShow=true;getReportStudent(1)"
        >{{headObj.ReportCount}}</li>
        <li
          class="item f-s-22"
          style="color: #FBB200;"
          @click="unFinishShow=true;getReportStudent(2)"
        >{{parseInt(headObj.TotalCount||0)-parseInt(headObj.ReportCount||0)}}</li>
        <li class="item f-s-22" style="color: #F24724;">{{Percent}}%</li>
      </ul>
      <ul class="list" style="line-height:24px;margin-top:-6px;padding-bottom:12px">
        <li class="item f-s-14">总人数</li>
        <li class="item f-s-14">已上报</li>
        <li class="item f-s-14">未上报</li>
        <li class="item f-s-14">上报率</li>
      </ul>
    </van-panel>
    <van-panel class="home-panel" title="今日报平安" :status="sumTotalCountDes">
      <van-steps direction="vertical" v-if="dataSet.length">
        <van-step v-for="item of dataSet" :key="item.RecordID">
          <div class="m-b-6">{{item.ReportTime}}</div>
          <div class="step-label m-b-6">{{item.Name}}</div>
          <div class="step-context">
            {{item.ReportContent}}
            <span>
              <van-tag round color="#FEF0CD" text-color="#FBB200">{{item.C}}</van-tag>
            </span>
          </div>
        </van-step>
      </van-steps>
      <div class="empty" v-if="!dataSet.length">
        <img src="@/assets/images/no_record.png" alt />
        <div class="desc">今天还没有人报平安哦</div>
      </div>
    </van-panel>
    <div class="footer">
      <div class="status-submit" @click="navReport">
        <img class="icon" src="@/assets/images/report1.png" alt />
        <span>情况上报</span>
      </div>
      <div class="submit1" @click="show=true">
        <img class="icon" src="@/assets/images/report_icon.png" alt />
        <span>我要报平安</span>
      </div>
    </div>
    <!-- action -->
    <van-action-sheet v-model="show">
      <div class="action-content select">
        <div class="a-title">
          我要报平安
          <span class="a-close" @click="show=false">x</span>
        </div>
        <div class="list">
          <div class="item" v-for="(item,ix) of bizTypes" :key="item.Code" @click="Report(item)">
            <img class="icon" :src="getImg(ix)" alt />
            <span class="elip">{{item.Name||''}}</span>
          </div>
        </div>
      </div>
    </van-action-sheet>

    <!-- 已上报 -->
    <van-action-sheet v-model="finishShow">
      <div class="action-content bg-F8F8F8">
        <div class="a-title">
          已上报学生
          <span class="a-close" @click="finishShow=false">x</span>
        </div>
        <div class="t-header">
          <span>姓名</span>
          <span>位置</span>
          <span>上报时间</span>
        </div>

        <div class="tr" v-for="(it,ix) of finishSet" :key="ix">
          <span class="td name">{{it.name}}</span>
          <span class="td van-ellipsis">{{it.report_area}}</span>
          <span class="td">{{it.reportTime}}</span>
        </div>
      </div>
    </van-action-sheet>
    <!-- 未上报 -->
    <van-action-sheet v-model="unFinishShow">
      <div class="action-content">
        <div class="action-content bg-F8F8F8">
          <div class="a-title">
            未上报学生
            <span class="a-close" @click="unFinishShow=false">x</span>
          </div>
          <p class="unName">姓名</p>
          <van-list>
            <van-cell v-for="(item,ix) in unFinishSet" :key="ix" :title="item.name" />
          </van-list>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<style scoped lang="less">
.index {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .h-bg {
    background: url("../../assets/images/bg-image.png");
    background-size: contain;
    background-repeat: no-repeat;
    height: 157.5px;
  }
  .home-panel {
    margin: auto 16px;
    border-radius: 6px;
    height: calc(~"100vh - 320px");
    overflow: auto;
  }
  .van-panel__header {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .van-panel__header-value {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #7b7b7b;
    letter-spacing: 0;
  }
  .h-header {
    border-radius: 6px;
    margin: -50px 16px 16px 16px;
  }
  .list {
    text-align: center;
    .f-s-14 {
      font-size: 14px;
    }
    .f-s-22 {
      font-size: 22px;
    }
    .item {
      display: inline-block;
      width: 25%;
      font-family: PingFangSC-Regular;
      color: #7b7b7b;
      text-align: center;
    }
  }
  .empty {
    padding: 20px;
    text-align: center;
    img {
      width: 98px;
      height: 98px;
    }
    .desc {
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .footer {
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: center;
    align-items: center;
    bottom: 16px;
    .icon {
      height: 16px;
      width: 16px;
      margin-right: 6px;
    }
    .status-submit {
      width: 123px;
      background: #fc5006;
      height: 50px;
      line-height: 52px;
      border-radius: 30px;
      border-radius: 30px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      color: #ffffff;
      letter-spacing: 0.73px;
      text-align: center;
      margin-right: 15px;
    }

    .submit1 {
      width: 215px;
      background: #fcb521;
      height: 50px;
      line-height: 52px;
      border-radius: 30px;
      border-radius: 30px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      color: #ffffff;
      letter-spacing: 0.73px;
      text-align: center;
    }
  }
  .select {
    background: #faf3e3;
    height: 300px;
    overflow: hidden;
    box-shadow: 0 -12px 24px 0 rgba(25, 70, 166, 0.2);
    border-radius: 12px 12px 0 0;
    border-radius: 12px 12px 0px 0px;
  }
  .bg-F8F8F8 {
    background: #f8f8f8;
  }
  .action-content {
    height: 300px;
    .a-title {
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      color: #333333;
      letter-spacing: 0.73px;
      text-align: center;
      line-height: 52px;
    }
    .a-close {
      float: right;
      margin-right: 20px;
      font-size: 22px;
    }
    .list {
      margin: 10px 20px;
      max-height: 235px;
      overflow: auto;
      .item {
        background: #ffffff;
        display: flex;
        margin: 8px auto;
        width: auto;
        align-items: center;
        padding: 10px 8px;
        border-radius: 72px;
        border-radius: 72px;
        font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #333333;
        letter-spacing: 0.73px;
        text-align: left;
        .icon {
          height: 44px;
          width: 44px;
          margin-right: 8px;
        }
      }
    }
  }
  .t-header {
    span {
      display: inline-block;
      width: 30%;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #adadad;
      letter-spacing: 0;
      text-align: center;
      line-height: 30px;
    }
  }
  .tr {
    .name {
      color: #0f0f0f !important;
      font-size: 15px !important;
    }
    .td {
      width: 30%;
      display: inline-block;
      text-align: center;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #adadad;
      letter-spacing: 0;
      line-height: 30px;
    }
  }
  .unName {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #adadad;
    letter-spacing: 0;
    margin-left: 30px;
    line-height: 30px;
  }
}
</style>
<script>
import {
  getBizCode,
  onReport,
  QueryLastReport,
  getConfig,
  getUserInfo,
  QueryClassReportStudent,
  ClassTodayStatistics,
  ClassCumulativeStatistics,
  QueryStudentReportUnusual
} from "../../service/common.service";
import {
  setAntTitle,
  debounce,
  formatDate
} from "../../lib/common";

export default {
  name: "home",
  data() {
    return {
      dataSet: [],
      show: false,
      bizTypes: [],
      finishSet: [],
      unFinishSet: [],
      Percent: "",
      headObj: {
        TotalCount: 0,
        ReportCount: 0
      },
      sumTotalCountDes: "",
      LocationProvince: "",
      LocationCity: "",
      locationCount: 0,
      LocationCheck: true,
      finishShow: false,
      unFinishShow: false,
      serverUrl: "",
      UserInfo: {},
      UID: "",
      Steps: []
    };
  },
  components: {},
  mounted() {},
  created() {
    setAntTitle("平安上报");
    this.city();
  /*   getBasicInfo(data => {
      this.UID = data.UserID || "";
      console.log("sdk", data);
    }); */
    //this.getTopData();
    /* 基本信息 */
    getUserInfo().then(r => {
      const re = r.data;
      if (!re.FeedbackCode) {
        this.UserInfo = re.Data || {};
        this.updateRecord();
        this.$store.commit("saveUserInfo", this.UserInfo);
      }
    });
    getBizCode("studentSafetyReport").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.bizTypes = item || [];
      }
    });
  },
  methods: {
    //去情况上报
    navReport() {
      if (this.Steps.length) {
        this.$router.push({ path: "/reportdetail" });
        return;
      }
      this.$router.push({ path: "/report" });
    },
    /* 取全局配置 */
    getConfig() {
      getConfig().then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          const config = res.Data.Params;
          const item = config.find(item => item.Key == "Store.Public.Host");
          if (item) {
            this.serverUrl = item.Value;
          }
        }
      });
    },
    updateRecord() {
      this.QueryReport();
      this.ClassTodayStatistics(this.UserInfo.ClassCode);
      this.ClassCumulativeStatistics(this.UserInfo.ClassCode);
      //提前查询跟踪记录
      this.getFlowList();
    },
    ClassCumulativeStatistics(ClassCode = "") {
      ClassCumulativeStatistics({ ClassCode }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.sumTotalCountDes = `累计${res.Data.TotalCount}次`;
          console.log("ClassCumulativeStatistics", res);
        }
      });
    },
    ClassTodayStatistics(ClassCode = "") {
      ClassTodayStatistics({ ClassCode }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.headObj = res.Data || {};
          const total = parseInt(this.headObj.TotalCount);
          const report = parseInt(this.headObj.ReportCount);
          if (report) {
            this.Percent = parseInt((report * 100) / total);
          } else {
            this.Percent = 0;
          }

          console.log("ClassTodayStatistics", res);
        }
      });
    },
    /* 获取班级已上报,未上报 */
    getReportStudent(type = 1) {
      const date = new Date();
      QueryClassReportStudent({
        type,
        report_time: formatDate(date, "yyyy-MM-dd"),
        class_code: this.UserInfo.ClassCode
      }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          const items = res.Data.list || [];
          items.forEach(element => {
            element.reportTime = formatDate(element.report_time, "MM-dd mm:ss");
          });
          if (type === 1) {
            this.finishSet = items || [];
          } else {
            this.unFinishSet = items || [];
          }
        }
      });
    },
    getFlowList() {
      QueryStudentReportUnusual().then(r => {
        const re = r.data;
        if (!re.FeedbackCode) {
          this.$store.commit("saveFlowList", re.Data||[]);
          this.Steps = re.Data||[];
          console.log("QueryStudentReportUnusual", re.Data);
        }
      });
    },
    getImg(ix) {
      let ixx = ix;
      if (ix > 2) {
        ixx = Math.floor(Math.random() * 2);
      }
      const img = require(`../../assets/images/${ixx}.png`);
      return img;
    },
    //定义获取城市方法
    city() {
      // eslint-disable-next-line no-undef
      const geolocation = new BMap.Geolocation();
      var _this = this;
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(
        function(position) {
          console.log("status", this.getStatus());
          if (this.getStatus() == 0) {
            const address = position.address;
            console.log("city", position);
            _this.LocationProvince = address.province;
            _this.LocationCity = address.city;
          } else {
            if (_this.locationCount >= 2) {
              _this.LocationCheck = false;
              _this.$toast("多次定位无法获取位置,请直接报平安!");
              return;
            }
            _this.$dialog
              .confirm({
                title: "提示",
                message: "尚未定位到您的位置是否再次尝试一下?"
              })
              .then(() => {
                _this.city();
                _this.locationCount++;
              })
              .catch(() => {
                // on cancel
              });
          }
        },
        { provider: "baidu" }
      );
    },
    QueryReport(Count = 50) {
      QueryLastReport({ Count, ClassCode: this.UserInfo.ClassCode }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.dataSet = res.Data;
        }
      });
    },
    /* 上报 */
    Report(item) {
      if (this.LocationCheck) {
        if (!this.LocationCity) {
          this.$toast("位置信息尚未获取,请稍等片刻报平安!");
          return;
        }
      }
    /*   if (!this.UID) {
        this.$toast("无法识别当前登录人,不能上报!");
        return;
      } */
      const params = {
        ReportArea: this.LocationCity,
        ReportCode: item.Code,
        UID: this.UID
      };
      this.show = false;
      debounce(() => {
        onReport(params).then(r => {
          const res = r.data;
          if (!res.FeedbackCode) {
            this.$toast(res.FeedbackText);
            //更新记录
            this.updateRecord();
          }
        });
      }, 300);
    }
  }
};
</script>


