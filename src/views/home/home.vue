<template>
  <div class="index">
    <div class="h-bg"></div>
    <van-panel class="h-header" title="xxxxxx班级">
      <ul class="list" style="line-height:44px">
        <li class="item f-s-22" style="color: #0F0F0F;">40</li>
        <li class="item f-s-22" style="color: #066BFC;">0</li>
        <li class="item f-s-22" style="color: #FBB200;">50</li>
        <li class="item f-s-22" style="color: #F24724;">20%</li>
      </ul>
      <ul class="list" style="line-height:24px;margin-top:-6px;padding-bottom:12px">
        <li class="item f-s-14">总人数</li>
        <li class="item f-s-14">已上报</li>
        <li class="item f-s-14">未上报</li>
        <li class="item f-s-14">上报率</li>
      </ul>
    </van-panel>
    <van-panel class="home-panel" title="今日报平安" status="累计2000次">
      <van-steps direction="vertical" v-if="dataSet.length">
        <van-step v-for="item of dataSet" :key="item.RecordID">
          <div class="m-b-6">{{item.ReportTime}}</div>
          <div class="step-label m-b-6">{{item.Name}}</div>
          <div class="step-context">
            {{item.ReportContent}}
            <span>
              <van-tag round color="#FEF0CD" text-color="#FBB200">210</van-tag>
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
      <div class="action-content">
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
      <div class="action-content">
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
    height: calc(~'100vh - 320px');
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

  .action-content {
    background: #faf3e3;
    height: 300px;
    overflow: hidden;
    box-shadow: 0 -12px 24px 0 rgba(25, 70, 166, 0.2);
    border-radius: 12px 12px 0 0;
    border-radius: 12px 12px 0px 0px;
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
}
</style>
<script>
import {
  getBizCode,
  QueryReportTopStatistics,
  onReport,
  QueryLastReport,
  getConfig
} from "../../service/common.service";
import { setAntTitle, debounce } from "../../lib/common";

export default {
  name: "home",
  data() {
    return {
      dataSet: [],
      show: false,
      bizTypes: [],
      LocationProvince: "",
      LocationCity: "",
      locationCount: 0,
      LocationCheck: true,
      finishShow:false,
      unFinishShow:false,
      serverUrl: "",
      topObj: {
        AcademyAllCount: "",
        AcademyName: "",
        DayCount: "",
        MyReportDay: "",
        UID: "",
        ClassName: ""
      },
      Interval: "",
      myFlag: false
    };
  },
  components: {},
  mounted() {},
  destroyed() {
    clearInterval(this.Interval);
  },
  created() {
    this.QueryReport();
    setAntTitle("我要报平安");
    this.city();
    this.Interval = setInterval(() => {
      this.QueryReport();
    }, 30000);
    this.getTopData();
    getBizCode("studentSafetyReport").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.bizTypes = item || [];
      }
    });
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
  methods: {
    //去上报疫情
    navReport() {
      this.$router.push({ path: "/report" });
    },
    getImg(ix) {
      let ixx = ix;
      if (ix > 2) {
        ixx = Math.floor(Math.random() * 2);
      }
      const img = require(`../../assets/images/${ixx}.png`);
      return img;
    },
    getTopData() {
      QueryReportTopStatistics().then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          const item = res.Data;
          this.topObj = item || [];
        }
      });
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
      QueryLastReport({ Count }).then(r => {
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
      const params = { ReportArea: this.LocationCity, ReportCode: item.Code };
      this.show = false;
      debounce(() => {
        onReport(params).then(r => {
          const res = r.data;
          if (!res.FeedbackCode) {
            this.$toast(res.FeedbackText);
            this.getTopData();
          }
        });
      }, 300);
    }
  }
};
</script>


