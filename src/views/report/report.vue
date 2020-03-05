<template>
  <div class="reportform">
    <div class="h-title">基本信息</div>
    <van-cell-group>
      <van-cell
        title-class="cell-title"
        value-class="cell-value"
        title="姓名"
        :value="UserInfo.Name"
      />
      <van-cell
        title-class="cell-title"
        value-class="cell-value"
        title="学号"
        :value="UserInfo.UserCode"
      />
      <van-cell
        title-class="cell-title"
        value-class="cell-value"
        title="手机号"
        :value="UserInfo.Phone"
      ></van-cell>
    </van-cell-group>
    <div class="h-title">当天实测体温</div>
    <div class="tem">
      <div :style="{'font-size': '16px','text-align':'center',color:temcolor }">{{temdata}}</div>
      <el-slider
        v-model="value2"
        :marks="marks"
        :color="temcolor"
        :show-tooltip="false"
        :change="temp()"
      ></el-slider>
    </div>

    <div class="h-title">情况说明（多选）</div>
    <van-checkbox-group v-model="Statuss" @change="statusChange">
      <van-cell-group>
        <van-cell v-for="(health,index) in HealthStatuss" :key="index">
          <van-checkbox checked-color="#FBB200" :name="health.Code">{{health.Name}}</van-checkbox>
        </van-cell>
      </van-cell-group>
      <van-field
        v-if="otherFlag"
        v-model="form.ReportContent"
        rows="4"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请填写详细情况，必填"
        show-word-limit
      />
    </van-checkbox-group>

    <div class="h-title">以上情况发生的日期</div>
    <van-cell-group>
      <van-cell is-link @click="dateShow=true">
        <div>{{form.SituationDate||'请选择日期'}}</div>
      </van-cell>
    </van-cell-group>

    <div class="h-title">已采取措施</div>
    <van-radio-group v-model="form.SituationMeasure" @change="MeasureChange">
      <van-cell-group>
        <van-cell v-for="(Measure,index) in SituationMeasures" :key="index">
          <van-radio checked-color="#FBB200" :name="Measure.Code">{{Measure.Name}}</van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="h-title">其他信息</div>
    <van-cell-group style="margin-bottom:100px">
      <van-cell title-class="cell-title" value-class="cell-value" title="当前所在地">
        <template>
          <div slot="default">
            {{form.CurrentAddress}}
            <span class="update f-r" @click="areaShow=true">修改</span>
          </div>
        </template>
      </van-cell>
      <van-field
        class="field"
        label="监护人"
        maxlength="10"
        v-model="form.GuardianName"
        placeholder="请输入监护人姓名，必填"
      />
      <van-field
        class="field"
        label="监护人电话"
        v-model="form.GuardianPhone"
        type="tel"
        maxlength="16"
        placeholder="请输入监护人电话，必填"
      />
    </van-cell-group>
    <!--     <van-checkbox
      class="agree"
      @change="confirm"
      checked-color="#FBB200"
      icon-size="16px"
      v-model="aggree"
    >我承诺以上信息属实</van-checkbox>-->
    <div class="footer">
      <van-button
        class="submit"
        @click="statusReport"
        :disabled="disabledSubmit"
        type="primary"
      >确定上报</van-button>
    </div>
    <!-- 手机号数字键盘 -->
    <van-number-keyboard
      v-model="form.phone"
      :show="numShow"
      close-button-text="完成"
      @blur="numShow = false"
    />
    <!-- 省市县 -->

    <van-popup v-model="areaShow" position="bottom" title="当前所在地" :style="{ height: '40%' }">
      <van-area :area-list="areaList" @cancel="areaShow=false" @confirm="selectArea" />
    </van-popup>

    <!-- 发生日期 -->

    <van-popup v-model="dateShow" position="bottom" title="发生日期" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="dateShow=false"
        @confirm="selectDate"
      />
    </van-popup>
  </div>
</template>
<style scoped lang="less">
.reportform {
  margin: auto 12px;
  height: 100vh;
  overflow: auto;
  .update {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #fbb200;
    line-height: 32px;
  }
  .cell-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #0f0f0f;
    line-height: 28px;
  }
  .cell-value {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #7b7b7b;
    line-height: 32px;
    text-align: left;
  }
  .h-title {
    font-family: PingFang-SC-Regular;
    font-size: 15px;
    color: #7b7b7b;
    letter-spacing: 0;
    text-align: left;
    line-height: 45px;
  }
  .field {
    input {
      margin-left: 46px;
    }
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
  .agree {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #0f0f0f;
    letter-spacing: 0;
    text-align: left;
    line-height: 32px;
    margin: 10px auto;
  }
  .tem {
    height: 70px;
    background: #fff;
    padding: 10px 15px;
    // line-height: 100px
  }
}
</style>
<script>
import { setAntTitle, formatDate } from "../../lib/common";
import arealist from "../../lib/area";
import {
  getBizCode,
  onStatusReport,
  getUserInfo,
  createFollowForUnusual
} from "../../service/common.service";
export default {
  name: "report",
  data() {
    return {
      numShow: false,
      areaShow: false,
      dateShow: false,
      areaList: arealist,
      Statuss: [],
      HealthStatuss: [],
      SituationMeasures: [],
      aggree: false,
      disabledSubmit: false,
      otherFlag: false,
      UserInfo: {},
      IntelUserCode: "",
      name: "",
      code: "",
      color: "",
      form: {
        CurrentAddress: "",
        GuardianName: "",
        GuardianPhone: "",
        HealthStatus: "",
        SituationStatus: "",
        ReportContent: "",
        SituationDate: "",
        SituationMeasure: "",
        Temperature: ""
      },
      minDate: new Date(2019, 8),
      maxDate: new Date(),
      currentDate: new Date(),
      value2: 0,
      marks: {
        15: "37°C",
        30: "37.3°C",
        60: "38°C",
        85: "39°C"
      },
      temdata: "",
      temcode: "",
      temcolor: "",
      bizColor: Number,
      repsub: ""
    };
  },
  created() {
    this.IntelUserCode = this.$route.query.IntelUserCode || "";
    this.name = this.$route.query.name || "";
    this.code = this.$route.query.code || "";
    this.color = this.$route.query.color || "";
    console.log("this.IntelUserCode", this.IntelUserCode);
    console.log("this.code", this.code);
    setAntTitle("上报疫情");
    getBizCode("StudentReportUnusualHealthStatus").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.HealthStatuss = item || [];
      }
    });
    //采取措施
    getBizCode("StudentRNFollowSituationMeasures").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.SituationMeasures = item || [];
      }
    });
    if (this.IntelUserCode) {
      /* 基本信息 */
      getUserInfo(this.IntelUserCode).then(r => {
        const re = r.data;
        if (!re.FeedbackCode) {
          this.UserInfo = re.Data || {};
          this.$store.commit("saveUserInfo", re.Data);
        }
      });
    } else {
      console.log(this.$store);
      this.UserInfo = this.$store.state.UserInfo;
    }
    /*  
    if (this.ReportUnusual.ReportTime) {
      const _form = this.ReportUnusual;
      this.form.CurrentAddress = _form.CurrentAddress;
      this.form.GuardianName = _form.GuardianName;
      this.form.GuardianPhone = _form.GuardianPhone;
      this.form.HealthStatus = _form.HealthStatus;
      this.form.ReportContent = _form.ReportContent;
    } */
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    selectDate(t) {
      console.log(t);
      this.form.SituationDate = formatDate(t, "yyyy-MM-dd");
      this.dateShow = false;
    },
    selectArea(e) {
      console.log(e);
      if (e[2]) {
        this.form.CurrentAddress = `${e[0].name}${e[1].name}${e[2].name}`;
        this.form.CurrentAddressCode = e[2];
      } else {
        this.form.CurrentAddress = `${e[0].name}${e[1].name}`;
        this.form.CurrentAddressCode = e[1];
      }

      this.areaShow = false;
    },
    confirm(e) {
      this.disabledSubmit = !e;
    },
    temp() {
       if (this.value2 > 0 && this.value2 < 15) {
        this.temdata = "< 37°C";
        this.form.Temperature = "1";
        this.temcolor = "#67c23a";
      } else if (this.value2 >= 15 && this.value2 < 30) {
        this.temdata = "37°C ～ 37.3°C";
        this.form.Temperature = "2";
        this.temcolor = "#fbb200";
      } else if (this.value2 >= 30 && this.value2 < 60) {
        this.temdata = "37.3°C ~ 38°C";
        this.form.Temperature = "3";
        this.temcolor = "#fb9700";
      } else if (this.value2 >= 60 && this.value2 < 85) {
        this.temdata = "38°C ~ 39°C";
        this.form.Temperature = "4";
        this.temcolor = "#fb5100";
      } else if (this.value2 >= 85 && this.value2 <= 100) {
        this.temdata = "> 39°C";
        this.form.Temperature = "5";
        this.temcolor = "#ee0a24";
      } else {
        this.temdata = "请选择体温";
        this.temcolor = "#ee0a24";
        this.form.Temperature = "";
      }
      console.log(this.form.Temperature);
      console.log(this.temdata);
    },
    statusChange(e) {
      let arrs = [];
      e.forEach(i => {
        const item = this.HealthStatuss.find(r => r.Code == i);
        arrs.push(item);
      });
      if (arrs.find(item => item.Name == "其他情况")) {
        this.otherFlag = true;
      } else {
        this.otherFlag = false;
      }
      this.form.SituationStatus = e.join();
      console.log("statusChange", e);
      console.log("this.form.SituationStatus", this.form.SituationStatus);
    },
    MeasureChange(e) {
      this.form.SituationMeasure = e;
    },
    checkPhone(phone) {
      return /^1[3-9]\d{9}$/.test(phone);
    },
    statusReport() {
      if (!this.form.Temperature) {
        this.$toast("请选择体温!");
        return;
      }
      if (!this.form.SituationStatus) {
        this.$toast("情况说明是必选的!");
        return;
      }
      if (!this.form.SituationDate) {
        this.$toast("情况发生日期是必填的!");
        return;
      }
      if (!this.form.SituationMeasure) {
        this.$toast("已采取措施是必选的!");
        return;
      }
      if (!this.form.CurrentAddress) {
        this.$toast("请选择当前所在地!");
        return;
      }
      if (!this.form.GuardianName.trim()) {
        this.$toast("请填写监护人姓名!");
        return;
      }
      if (!this.form.GuardianPhone.trim()) {
        this.$toast("请填写监护人电话!");
        return;
      }
      if (!this.checkPhone(parseInt(this.form.GuardianPhone))) {
        this.$toast("监护人电话格式不正确!");
        return;
      }

      if (!this.form.CurrentAddress) {
        this.$toast("请选择当前所在地!");
        return;
      }

      if (this.otherFlag && !this.form.ReportContent.trim()) {
        this.$toast("请填写详细信息!");
        return;
      }
      const form = { ...this.form };
      //老师代替上报增加内部
      form.IntelUserCode = this.IntelUserCode || "";
      delete form.CurrentAddressCode;
      console.log("form", form);
      if (this.code) {
        this.$dialog
          .confirm({
            title: "提示",
            confirmButtonText: "确定",
            confirmButtonColor: "#FBB200",
            message: `确定为${this.UserInfo.Name}提交情况上报吗？`
          })
          .then(() => {
            onStatusReport(form).then(r => {
              const res = r.data;
              if (!res.FeedbackCode) {
                this.$toast(res.FeedbackText);
                console.log("this.code", this.code);
                this.createFollowForUnusual(this.code);
              }
            });
          });
        return;
      }
      this.$dialog
        .confirm({
          title: "提示",
          confirmButtonText: "立即上报",
          confirmButtonColor: "#FBB200",
          message: "该信息会推送给学校老师，请确认是要上报吗？"
        })
        .then(() => {
          onStatusReport(form).then(r => {
            const res = r.data;
            if (!res.FeedbackCode) {
              this.$toast(res.FeedbackText);
              this.$router.replace({
                path: "reportdetail",
                query: { IntelUserCode: this.IntelUserCode }
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    createFollowForUnusual(code) {
      const params = {
        intel_user_code: this.IntelUserCode,
        status_code: code,
        follow_content: ""
      };
      createFollowForUnusual(params).then(() => {
        this.$router.replace({
          path: "reportdetail",
          query: {
            IntelUserCode: this.IntelUserCode,
            name: this.name,
            code: this.code,
            color: this.color
          }
        });
      });
    }
  }
};
</script>