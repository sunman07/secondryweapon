<template>
  <div class="report">
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

    <div style="margin-top:12px">
      <van-cell-group>
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
          placeholder="请输入监护人姓名，非必填"
        />
        <van-field
          class="field"
          label="监护人电话"
          v-model="form.GuardianPhone"
          type="tel"
          maxlength="16"
          placeholder="请输入监护人电话，非必填"
        />
      </van-cell-group>
    </div>
    <div class="h-title">健康状况</div>
    <van-radio-group v-model="form.HealthStatus" @change="statusChange">
      <van-cell-group>
        <van-cell v-for="(health,index) in HealthStatuss" :key="index">
          <van-radio checked-color="#FBB200" :name="health.Code">{{health.Name}}</van-radio>
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
    </van-radio-group>
    <van-checkbox
      class="agree"
      @change="confirm"
      checked-color="#FBB200"
      icon-size="16px"
      v-model="aggree"
    >我承诺以上信息属实</van-checkbox>

    <van-button class="submit" @click="statusReport" :disabled="disabledSubmit" type="primary">确定上报</van-button>
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
  </div>
</template>
<style scoped lang="less">
.report {
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
  .agree {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #0f0f0f;
    letter-spacing: 0;
    text-align: left;
    line-height: 32px;
    margin: 10px auto;
  }
}
</style>
<script>
import { setAntTitle } from "../../lib/common";
import arealist from "../../lib/area";
import { getBizCode, onStatusReport } from "../../service/common.service";
import { mapState } from "vuex";
export default {
  name: "report",
  data() {
    return {
      numShow: false,
      areaShow: false,
      areaList: arealist,
      HealthStatuss: [],
      aggree: false,
      disabledSubmit: true,
      otherFlag: false,
      form: {
        CurrentAddress: "",
        GuardianName: "",
        GuardianPhone: "",
        HealthStatus: "",
        ReportContent: ""
      }
    };
  },
  computed: mapState(["UserInfo"]),
  created() {
    setAntTitle("上报疫情");
    getBizCode("StudentReportUnusualHealthStatus").then(r => {
      const res = r.data;
      if (!res.FeedbackCode) {
        const item = res.Data;
        this.HealthStatuss = item || [];
      }
    });
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
    selectArea(e) {
      console.log(e);
      this.form.CurrentAddress = `${e[0].name}${e[1].name}${e[2].name}`;
      this.form.CurrentAddressCode = e[2];
      this.areaShow = false;
    },
    confirm(e) {
      this.disabledSubmit = !e;
    },
    statusChange(e) {
      console.log("statusChange", e);
      const item = this.HealthStatuss.find(r => r.Code == e);
      if(item.Name=='其他情况'){
        this.otherFlag=true;
      }else{
         this.otherFlag=false;
      }
      this.form.HealthStatus = e;
    },
    statusReport() {
      if (!this.form.CurrentAddress) {
        this.$toast("请选择当前所在地!");
        return;
      }
      if (!this.form.CurrentAddress) {
        this.$toast("请选择当前所在地!");
        return;
      }
      if (!this.form.HealthStatus) {
        this.$toast("请选择健康状态!");
        return;
      }
      if (this.otherFlag&&!this.form.ReportContent) {
        this.$toast("请填写详细信息!");
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
          onStatusReport(this.form).then(r => {
            const res = r.data;
            if (!res.FeedbackCode) {
              this.$router.replace({
                path: "reportdetail"
              });
              this.$toast(res.FeedbackText);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>