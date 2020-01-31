<template>
  <div class="index">
    <div class="bg">
      <div class="title">
        <img src="@/assets/images/title.png" alt />
      </div>
      <div class="number-bg">
        {{topObj.AcademyName}} 累计
        <span class="number">{{topObj.AcademyAllCount}}</span> 人次已报平安
        今天 累计
        <span class="number">{{topObj.DayCount}}</span> 人次已报平安
      </div>
      <baberrage
        :isShow="barrageIsShow"
        :boxHeight="360"
        :barrageList="barrageList"
        :loop="barrageLoop"
      ></baberrage>
      <div class="footer">
        <div class="reported">
          <div class="top">
            <span style="font-size:24px">{{topObj.MyReportDay}}</span>天
          </div>
          <div class="finish">我已报</div>
        </div>
        <div class="submit" @click="show=true">
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
    </div>
  </div>
</template>
<style scoped lang="less">
.index {
  background-image: linear-gradient(#2852a6, #21869a);
  background-size: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .bg {
    background: url("../../assets/images/bg_image.png");
    background-size: contain;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
  }
  .number-bg {
    margin: auto;
    background: url("../../assets/images/number_bg.png");
    background-size: cover;
    height: 89.5px;
    width: 300px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    padding: 10px 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #def0fd;
    letter-spacing: 0.6px;
    text-align: left;
    line-height: 28px;
    .number {
      font-family: DINCond-Bold;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 0.94px;
      text-align: left;
    }
  }
  .title {
    text-align: center;
    margin: 40px auto 20px auto;
    img {
      height: 36.5px;
    }
  }
  .footer {
    display: flex;
    position: absolute;
    width: 100%;
    justify-content: center;
    bottom: 16px;
    .icon {
      height: 16px;
      width: 16px;
      margin-right: 6px;
    }
    .reported {
      width: 80px;
      margin-right: 16px;
      background: #ffffff;
      border-radius: 30px;
      border-radius: 30px;
      .top {
        font-family: PingFang-SC-Medium;
        font-size: 10px;
        padding-top: 6px;
        color: #fcb521;
        letter-spacing: 0;
        text-align: left;
        line-height: 18px;
        text-align: center;
      }
      .finish {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #888888;
        letter-spacing: 0;
        text-align: left;
        line-height: 16px;
        text-align: center;
      }
    }
    .submit {
      width: 215px;
      background: #fcb521;
      height: 50px;
      line-height: 50px;
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
import { setAntTitle, formatDate } from "../../lib/common";
import { MESSAGE_TYPE } from "../../components/baberrage/constants";

export default {
  name: "index",
  data() {
    return {
      msg: "Hello vue-baberrage",
      barrageIsShow: true,
      currentId: 0,
      barrageLoop: false,
      barrageList: [],
      show: false,
      bizTypes: [],
      LocationProvince: "",
      LocationCity: "",
      serverUrl: "",
      topObj: {
        AcademyAllCount: "",
        AcademyName: "",
        DayCount: "",
        MyReportDay: "",
        UID: "",
        ClassName: ""
      }
    };
  },
  components: {
    baberrage: () => import("../../components/baberrage/vue-baberrage")
  },
  mounted() {},
  created() {
    setAntTitle("我要报平安");
    this.city();
    this.QueryReport();
    setInterval(()=>{this.QueryReport()},12000)
    /*    fetch('https://api.map.baidu.com/location/ip?ak=5UxhchHxBYOnRGhEifyCGoPFtjpOFt1I&coor=bd09ll').then(r=>{
      console.log(r)
    }) */
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
      geolocation.getCurrentPosition(
        function getinfo(position) {
          const address = position.address;
          console.log("city", position);
          _this.LocationProvince = address.province;
          _this.LocationCity = address.city;
        },
        function() {
          //_this.LocationCity = "";
          this.$dialog
            .confirm({
              title: "提示",
              message: "尚未定位到您的位置是否再次尝试一下?"
            })
            .then(() => {
              this.city();
            })
            .catch(() => {
              // on cancel
            });
        },
        { provider: "baidu" }
      );
    },
    QueryReport() {
      QueryLastReport().then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.addToList(res.Data);
        }
      });
    },
    /* 上报 */
    Report(item) {
      if (!this.LocationCity) {
        this.$toast("位置信息尚未获取,请稍等片刻报平安!");
        return;
      }
      const params = { ReportArea: this.LocationCity, ReportCode: item.Code };
      onReport(params).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.$toast(res.FeedbackText);
          this.getTopData();
          this.show = false;
          const date = new Date();
          this.barrageList.push({
            avatar: `${this.serverUrl}/static/headpictures/${this.topObj.UID}.jpg-thumb`,
            msg: `${formatDate(date, "MM月dd日")} 我是${this.topObj.ClassName ||
              ""}${this.topObj.Name || ""}，${item.Name}`,
            time: 8,
            type: MESSAGE_TYPE.NORMAL
          });
        }
      });
    },
    addToList(arr = []) {
      //let url='/static/headpictures/{{item.BuID}}.jpg-thumb';
      arr.forEach(it => {
        let time = 8;
        const have = this.barrageList.find(i => i.RecordID == it.RecordID);
        console.log('have',have)
        if (!have) {
          this.barrageList.push({
            avatar: `${this.serverUrl}/static/headpictures/${it.UID}.jpg-thumb`,
            msg: `${formatDate(it.ReportTime, "MM月dd日")} 我是${it.Class}${
              it.Name
            }，${it.ReportContent}`,
            time: time,
            type: MESSAGE_TYPE.NORMAL
          });
        }
      });
      console.log('barrageList',this.barrageList)
    }
  }
};
</script>


