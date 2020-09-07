<template>
  <div class="mainbody">
    <van-button @click="setPopup" type="info">切换学年</van-button>
    <InitializeOfMain />
    <ParticularsUnit />
    <van-popup v-model="displayPopup" position="bottom">
      <van-picker show-toolbar :columns="columns" />
    </van-popup>
  </div>
</template>

<script>
import { setAntTitle } from "../../lib/common";
import Vue from "vue";
import { Icon, Row, Col, Button, Popup, Picker } from "vant";
import InitializeOfMain from "../mainpage/previewunit";
import ParticularsUnit from "../mainpage/particularsunit";
import { getTermSum } from "../../service/common.service";
Vue.use(Icon).use(Row).use(Col).use(Button).use(Popup).use(Picker);
export default {
  components: {
    InitializeOfMain,
    ParticularsUnit,
  },
  data() {
    return {
      displayPopup: false,
      columns: [
        { text: "杭州", disabled: true },
        { text: "宁波" },
        { text: "温州" },
      ],
    };
  },
  created() {
    setAntTitle("第二课堂");
  },
  mounted() {
    this.getAllTermSelect();
  },
  methods: {
    setPopup() {
      this.displayPopup = true;
    },
    //获取字典数据
    getAllTermSelect() {
      getTermSum().then((res) => {
        console.log(res);
      });
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
</style>
