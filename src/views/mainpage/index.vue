<template>
  <div class="mainbody">
    <van-button @click="setPopup" type="info">切换学年</van-button>
    <van-button @click="setApprove" type="info">审批</van-button>
    <InitializeOfMain :headprops="transferUnit" @getPropsForMain="getTypes" />
    <ParticularsUnit :headprops="transferUnit" />
    <van-popup v-model="displayPopup" position="bottom">
      <van-picker show-toolbar :columns="columnsOfTerm" @confirm="onTermOfChange" />
    </van-popup>
    <van-button @click="applySubmit" class="button-main" type="primary">我要申请</van-button>
  </div>
</template>

<script>
import { setAntTitle } from "../../lib/common";
import Vue from "vue";
import { Icon, Row, Col, Button, Popup, Picker, Toast } from "vant";
import InitializeOfMain from "../mainpage/previewunit";
import ParticularsUnit from "../mainpage/particularsunit";
import { getTermSum } from "../../service/common.service";
Vue.use(Icon).use(Row).use(Col).use(Button).use(Popup).use(Picker).use(Toast);
export default {
  components: {
    InitializeOfMain,
    ParticularsUnit,
  },
  data() {
    return {
      displayPopup: false,
      columnsOfTerm: Array,
      paramsOfTerm: String,
      transferUnit: Object,
    };
  },
  created() {
    setAntTitle("第二课堂");
  },
  mounted() {
    
  },
  methods: {
    setPopup() {
      this.displayPopup = true;
    },
    //获取子组件数据 判断学年还是学期切换
    getTypes(data) {
      switch (data) {
        case "1":
          this.paramsOfTerm = "AcademicTerm";
          break;
        case "3":
          this.paramsOfTerm = "AcademicYear";
          break;
        default:
          this.paramsOfTerm = null;
          break;
      }
      if (this.paramsOfTerm) {
        //获取相应学年或学期
        getTermSum(this.paramsOfTerm).then((res) => {
          if (res.status === 200) {
            res.data.list.map((item) => {
              item.text = item.code_name;
            });
            this.columnsOfTerm = res.data.list;
          } else {
            Toast("获取学年/学期失败");
          }
        });
      }
    },
    //确定选择学年/学期
    onTermOfChange(picker) {
      console.log("确认选择");
      let params = {};
      this.paramsOfTerm === "AcademicTerm"
        ? ((params.Codes = picker.code), (params.Types = "AcademicTermCode"))
        : ((params.Codes = picker.code), (params.Types = "AcademicYearCode"));
      //赋值并传给子组件
      this.transferUnit = params;
      this.displayPopup = false;
    },
    //我要申请
    applySubmit() {
      this.$router.push("/apply");
    },
    //审批
    setApprove() {
      this.$router.push("/approve");
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  background: url(../../assets/scan/banner.png) no-repeat;
  background-size: 100%;
  height: 130px;
}
.button-main {
  display: block;
  background: #3a8ee6;
  border: none;
  margin: 10px auto;
}
</style>
