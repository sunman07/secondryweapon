<template>
  <div>
    <FormSubUnit/>
  </div>
</template>

<script>
import { setAntTitle } from "../../lib/common";
import FormSubUnit from "./formunit";
import Vue from "vue";
import { Icon, Row, Col, Button, Popup, Picker, Toast } from "vant";
Vue.use(Icon).use(Row).use(Col).use(Button).use(Popup).use(Picker).use(Toast);
export default {
  components: { FormSubUnit },
  created() {
    setAntTitle("第二课堂");
  },
};
</script>

<style lang="less" scoped>
.submit-apply {
  display: block;
  width: 80%;
  margin: 10px auto;
}
</style>