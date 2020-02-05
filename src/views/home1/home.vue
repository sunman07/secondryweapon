<template>
  <div class="home">
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
    <van-panel style="margin:auto 16px; border-radius: 6px;" title="今日报平安" status="累计2000次">
      <div class="empty">
        <img src="@/assets/images/no_record.png" alt />
        <div class="desc">今天还没有人报平安哦</div>
      </div>
    </van-panel>
  </div>
</template>
<style scoped lang="less">
.home {
  height: 100vh;
  .h-bg {
    background: url("../../assets/images/bg-image.png");
    background-size: contain;
    background-repeat: no-repeat;
    height: 157.5px;
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
}
</style>
<script>
import { getBizCode } from "../../service/common.service";
import { setAntTitle } from "../../lib/common";
export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    setAntTitle("平安上报");
    getBizCode();
  },
  methods: {}
};
</script>