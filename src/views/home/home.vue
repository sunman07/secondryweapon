  <template>
  <div class="index">
    <div class="h-bg"></div>
    <div class="address">
      <van-loading v-if="position" size="24px">获取定位中...</van-loading>
    </div>
    <van-panel class="h-header" :title="UserInfo.ClassName||''">
      <ul class="list" style="line-height:44px">
        <li class="item f-s-22" style="color: #0F0F0F;">
          {{
          parseInt(headObj.ReportCount||0) + parseInt(headObj.UnReportCount||0)}}
        </li>
        <li
          v-if="headObj.ReportCount!='NULL'"
          class="item f-s-22"
          style="color: #066BFC;"
          @click="finishShow=true"
        >{{headObj.ReportCount}}</li>
        <li v-if="headObj.ReportCount=='NULL'" class="item f-s-22" style="color: #066BFC;">0</li>
        <li
          v-if="headObj.UnReportCount!='NULL'"
          class="item f-s-22"
          style="color: #FBB200;"
          @click="unFinishShow=true"
        >{{parseInt(headObj.UnReportCount||0)}}</li>
        <li v-if="headObj.UnReportCount=='NULL'" class="item f-s-22" style="color: #FBB200;">0</li>
        <li class="item f-s-22" style="color: #F24724;">{{Percent}}%</li>
      </ul>
      <ul class="list" style="line-height:24px;margin-top:-6px;padding-bottom:12px">
        <li class="item f-s-14">总人数</li>
        <li class="item f-s-14">已上报</li>
        <li class="item f-s-14">未上报</li>
        <li class="item f-s-14">上报率</li>
      </ul>
    </van-panel>
    <van-panel class="home-panel" title="今日报平安" :status="'累计'+sumTotalCount+'次'">
      <van-steps direction="vertical" active-color="#969799" v-if="dataSet.length">
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
      <div class="submit1" @click="onSafe">
        <img class="icon" src="@/assets/images/report_icon.png" alt />
        <span>我要报平安</span>
      </div>
    </div>
    <!-- action -->
    <van-action-sheet v-model="show">
      <div class="action-content select">
        <div class="a-title">
          我要报平安
          <span
            class="a-close"
            @click="show=false, bizColor = Number, value2 =0, temdata = '', 
            temcode = '0', CurrentAddress = '', CurrentAddressCode = ''"
          >x</span>
        </div>
        <div class="list">
          <div
            class="item"
            v-for="(item,ix) of bizTypes"
            :key="item.Code"
            @click="Report(item)"
            :style="{background: ix === bizColor ? '#fbb200': ''}"
          >
            <img class="icon" :src="getImg(ix)" alt />
            <span class="elip">{{item.Name||''}}</span>
          </div>
          <p style="font-size: 16px">当天实测体温</p>
          <div class="sliders" style="padding: 15px 13px;">
            <div :style="{'font-size': '16px','text-align':'center',color:color }">{{temdata}}</div>
            <el-slider
              v-model="value2"
              :marks="marks"
              :show-tooltip="false"
              :change="temperature()"
            ></el-slider>
          </div>
          <p style="font-size: 16px">当前所在位置</p>
          <div class="sliders" style="padding: 2px 3px;">
            <van-cell
              :title="CurrentAddress? CurrentAddress:'请选择所在位置'"
              icon="location-o"
              is-link
              @click="address()"
            />
          </div>
          <div style="margin-top:20px">
            <van-button color="#fbb200" round type="primary" block @click="reportSubmit()">确定</van-button>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 省市县 -->

    <van-popup v-model="areaShow" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList" title="当前位置" @cancel="areaShow=false" @confirm="selectArea" />
    </van-popup>

    <!-- 已上报 -->
    <van-action-sheet v-model="finishShow" style="height:80%">
      <div class="action-content bg-F8F8F8">
        <div class="a-title">
          已上报学生
          <span class="a-close" @click="finishShow=false">x</span>
        </div>
        <!-- <div class="t-header">
          <span>姓名</span>
          <span>位置</span>
       </div>
        <van-list>
          <van-cell v-for="(item,i) in finishSet" :key="i" :title="item.Name" :value="item.ReportAreaChoiceName"/>
        </van-list>-->
        <div class="t-header">
          <span>姓名</span>
          <span>位置</span>
        </div>
        <div class="tr tables" v-for="(it,ix) of finishSet" :key="ix">
          <span class="name van-ellipsis">{{it.Name}}</span>
          <span class="td van-ellipsis">{{it.ReportAreaChoiceName}}</span>
        </div>
      </div>
    </van-action-sheet>
    <!-- 未上报 -->
    <van-action-sheet v-model="unFinishShow" style="height:80%">
      <div class="action-content">
        <div class="action-content bg-F8F8F8">
          <div class="a-title">
            未上报学生
            <span class="a-close" @click="unFinishShow=false">x</span>
          </div>
          <p class="unName">姓名</p>
          <van-list>
            <van-cell v-for="(item,ix) in unFinishSet" :key="ix" :title="item.Name" />
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
  .address {
    position: absolute;
    right: 4px;
    bottom: 80px;
    z-index: 4;
  }
  .h-bg {
    background: url("../../assets/images/bg-image.png");
    background-size: contain;
    background-repeat: no-repeat;
    height: 157.5px;
  }
  .home-panel {
    margin: auto 16px;
    border-radius: 6px;
    height: calc(~"100vh - 330px");
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
    bottom: 0;
    padding-bottom: 10px;
    width: 100%;
    background: #fff;
    padding-top: 10px;
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
    height: 600px;
    // overflow: auto;
    box-shadow: 0 -12px 24px 0 rgba(25, 70, 166, 0.2);
    border-radius: 12px 12px 0 0;
    border-radius: 12px 12px 0px 0px;
  }
  .bg-F8F8F8 {
    background: #f8f8f8;
  }
  .action-content {
    // height: 100%;
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
      // max-height: 400px;
      // overflow: auto;
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
  .sliders {
    background: #ffffff;
    // display: flex;
    margin: 10px auto;
    width: auto;
    align-items: center;
    // padding: 15px 13px;
    font-family: PingFangSC-Regular;
    font-size: 17px;
    color: #333333;
    letter-spacing: 0.73px;
    text-align: left;
    border-radius: 7px;
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
  .tables {
    background: #fff;
    border-bottom: 1px solid #f2f6fc;
    padding: 5px 0px;
  }
  .tr {
    font-family: PingFang-SC-Regular;
    letter-spacing: 0;
    .name {
      color: #0f0f0f !important;
      font-size: 15px !important;
      width: 30%;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      vertical-align: middle;
    }
    .td {
      width: 70%;
      display: inline-block;
      font-size: 14px;
      color: #adadad;
      line-height: 30px;
      vertical-align: middle;
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
  ClassTodayStatistics,
  ClassCumulativeStatistics,
  CheckIsRu,
  CheckIsNeedSafeReport,
  getAddress,
  getArealist
} from "../../service/common.service";
import { setAntTitle, debounce } from "../../lib/common";

export default {
  name: "home",
  data() {
    return {
      dataSet: [],
      show: false,
      Need: true,
      position: true,
      bizTypes: [],
      finishSet: [],
      unFinishSet: [],
      Percent: "",
      headObj: {
        TotalCount: 0,
        ReportCount: 0
      },
      sumTotalCount: 0,
      LocationProvince: "",
      LocationCity: "",
      locationCount: 0,
      countClick: 0,
      LocationCheck: true,
      finishShow: false,
      unFinishShow: false,
      disabledSubmit: false,
      areaShow: false,
      areaList: '',
      serverUrl: "",
      UserInfo: {},
      UID: "",
      IsReport: "",
      value2: 0,
      marks: {
        15: "37°C",
        30: "37.3°C",
        60: "38°C",
        85: "39°C"
      },
      temdata: "",
      temcode: "0",
      color: "",
      bizColor: Number,
      repsub: "",
      CurrentAddress: "",
      CurrentAddressCode: "",
      point: ""
    };
  },
  components: {},
  mounted() {},
  created() {
    setAntTitle("平安上报");
    this.disabledSubmit = false;
    const location = this.$store.state.Location;
    console.log("this.$store.state", this.$store.state);
    if (location) {
      this.LocationCity = location;
      this.position = false;
    } else {
      this.city();
      setTimeout(() => {
        this.position = false;
      }, 7000);
    }
    this.CheckIsNeedSafeReport();
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
        this.$store.commit("saveUserInfo", re.Data);
        this.ClassCumulativeStatistics(this.UserInfo.ClassCode);
        this.QueryReport();
        this.ClassTodayStatistics(this.UserInfo.ClassCode);
      }
    });
    this.CheckIsRu();
    getBizCode("studentSafetyReport").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.bizTypes = item || [];
      }
    });
  },
  methods: {
    // 手动增加位置
    selectArea(e) {
      console.log(e);
      if (e[2]) {
        this.CurrentAddress = `${e[0].name}${e[1].name}${e[2].name}`;
        this.CurrentAddressCode = e[2].code;
      } else {
        this.CurrentAddress = `${e[0].name}${e[1].name}`;
        this.CurrentAddressCode = e[1].code;
      }
      this.areaShow = false;
    },
    //去情况上报
    navReport() {
      if (this.IsReport == 1) {
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
      //手动增加总数
      this.sumTotalCount++;
    },
    ClassCumulativeStatistics(ClassCode = "") {
      ClassCumulativeStatistics({ ClassCode }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.sumTotalCount = res.Data.TotalCount;
          console.log("ClassCumulativeStatistics", res);
        }
      });
    },
    // 加载总人数已上报未上报
    ClassTodayStatistics(ClassCode = "") {
      ClassTodayStatistics({ ClassCode }).then(r => {
        const res = r.data;
        console.log(res);
        if (!res.FeedbackCode) {
          this.headObj = res.Data || {};
          // 已上报列表
          this.finishSet = res.Data.ReportData || [];
          // 未上报列表
          this.unFinishSet = res.Data.UnReportData || [];
          const UnReportCount = this.headObj.UnReportCount;
          const report = this.headObj.ReportCount;
          const cover = report / (report + UnReportCount);
          if (cover) {
            this.Percent = Math.floor(cover * 10000) / 100;
          } else {
            this.Percent = 0;
          }
        }
      });
    },

    /* 检查是否情况上报过 */
    CheckIsRu() {
      CheckIsRu().then(r => {
        const re = r.data;
        if (!re.FeedbackCode) {
          this.IsReport = re.Data.Is;
          console.log("ddddd方法", re);
        }
      });
    },
    //检查是否可以上报平安
    CheckIsNeedSafeReport() {
      CheckIsNeedSafeReport().then(r => {
        const res = r.data;
        this.Need = res.Data.Need;
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
            _this.point = JSON.stringify(position.point);
            console.log(_this.point);

            console.log("city", position);
            _this.LocationProvince = address.province;
            _this.LocationCity = address.city;
            _this.$store.commit("saveLocation", _this.LocationCity);
          } /* else {
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
            } */
        },
        { provider: "baidu" }
      );
    },
    QueryReport(Count = 50) {
      QueryLastReport({ Count, ClassCode: this.UserInfo.ClassCode }).then(r => {
        const res = r.data;
        if (!res.FeedbackCode) {
          this.dataSet = res.Data || [];
        }
      });
    },
    // 加载位置
    address(){
      getArealist().then(res => {
        console.log(res);
        if (res.data.FeedbackCode === 0) {
          this.areaList = res.data.Data;
           this.areaShow = true;
        }
      })
    },
    temperature() {
      if (this.value2 > 0 && this.value2 < 15) {
        this.temdata = "<37°C";
        this.temcode = "1";
        this.color = "#67c23a";
      } else if (this.value2 >= 15 && this.value2 < 30) {
        this.temdata = "37°C ～ 37.3°C";
        this.temcode = "2";
        this.color = "#fbb200";
      } else if (this.value2 <= 0) {
        this.temdata = "请选择温度";
        this.temcode = "0";
        this.color = "red";
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "您的体温处于异常状态，需要去填写情况上报",
            confirmButtonText: "情况上报",
            confirmButtonColor: "#fbb200",
            cancelButtonText: "我手滑了",
            cancelButtonColor: "#7B7B7B"
          })
          .then(() => {
            this.show = false;
            this.$router.push({ path: "/report" });
          })
          .catch(() => {
            this.show = false;
            // on cancel
            this.value2 = 0;
          });
      }
    },
    submit(params = {}) {
      this.show = false;
      debounce(() => {
        onReport(params).then(r => {
          const res = r.data;
          if (!res.FeedbackCode) {
            this.disabledSubmit = true;
            this.$toast(res.FeedbackText);
            //更新记录
            this.bizColor = Number;
            this.value2 = 0;
            this.temdata = "";
            this.temcode = "0";
            this.CurrentAddress = "";
            this.CurrentAddressCode = "";
            this.updateRecord();
            this.CheckIsNeedSafeReport();
          }
        });
      }, 300);
    },
    onSafe() {
      console.log(!this.Need);
      if (!this.Need) {
        this.$toast("您今天已报平安，或您今天无需报平安!");
        return;
      }
      if (this.position) {
        this.$toast("尚在获取定位中,不能上报!");
        return;
      }
      this.show = true;
      getAddress().then(r => {
        if (r.data.Data) {
          this.CurrentAddressCode = r.data.Data.ReportAreaChoiceCode;
          this.CurrentAddress = r.data.Data.ReportAreaChoiceName;
        }
      });
    },
    /* 上报 */
    Report(item) {
      this.repsub = item;
      if (this.disabledSubmit) {
        this.$toast("您已成功报平安,无需再报!");
        return;
      }
      this.bizTypes.forEach((items, i) => {
        if (item == items) {
          console.log(i);
          this.bizColor = i;
        }
      });
      // console.log(i);

      // console.log(i);

      /*      if (this.countClick <= 2) {
          if (this.LocationCheck) {
            if (!this.LocationCity) {
              this.$toast("位置信息尚未获取,请稍等片刻报平安!");
              return;
            }
          }
        }

        this.countClick++; */
      /*   if (!this.UID) {
          this.$toast("无法识别当前登录人,不能上报!");
          return;
        } */
    },
    reportSubmit() {
      console.log(this.CurrentAddressCode);
      console.log(this.CurrentAddress);
      console.log(this.point);
      if (!this.repsub.Code) {
        this.$toast("请选择口号！");
      } else if (Number(this.temcode) <= 0) {
        this.$toast("请选择要上报的体温！");
      } else if (!this.CurrentAddress && !this.CurrentAddressCode) {
        this.$toast("请选择地址！");
      } else if (!this.LocationCity) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "尚未定位到您的位置,是否继续报平安?"
          })
          .then(() => {
            const params = {
              ReportArea: this.LocationCity,
              ReportCode: this.repsub.Code,
              UID: "",
              Temperature: this.temcode,
              ReportAreaLat: this.point,
              ReportAreaChoiceCode: this.CurrentAddressCode,
              ReportAreaChoiceName: this.CurrentAddress
            };
            console.log(params);
            this.submit(params);
          })
          .catch(() => {
            this.show = false;
            // on cancel
          });
      } else {
        const params = {
          ReportArea: this.LocationCity,
          ReportCode: this.repsub.Code,
          UID: "",
          Temperature: this.temcode,
          ReportAreaLat: this.point,
          ReportAreaChoiceCode: this.CurrentAddressCode,
          ReportAreaChoiceName: this.CurrentAddress
        };
        console.log(params);
        this.submit(params);
      }
    }
  }
};
</script>


