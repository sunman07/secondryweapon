@<template>
  <div>
    <FormSubUnit :infoGet="this.$route.query.mark" />
  </div>
</template>

<script>
import FormSubUnit from "../formcontain/formunit";
export default {
  components: {
    FormSubUnit,
  },
  data(){
      return{
          //detailsInfo:Object
      }
  },
  mounted() {
      //this.detailsInfo=this.$route.query.mark
  },
};
</script>

<style lang='less' scoped>
.van-cell-group{
  background: red;
}
</style>