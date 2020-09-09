@<template>
  <div>
    <FormSubUnit :infoGet="this.$route.query.mark" />
  </div>
</template>

<script>
import FormSubUnit from "./formunit";
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

<style>
</style>