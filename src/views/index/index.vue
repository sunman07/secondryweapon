<template>
  <div class="index">
    <div class="bg">
      <div class="title">
        <img src="@/assets/images/title.png" alt />
      </div>
      <div class="number-bg">
        计算机学院 累计
        <span class="number">2340</span>人次已报平安
        今天 累计
        <span class="number">2340</span>人次已报平安
      </div>

      <baberrage :isShow="barrageIsShow" :barrageList="barrageList" :loop="barrageLoop"></baberrage>
      <div class="footer">
        <div class="reported" @click="addToList">
          <div class="top">
            <span style="font-size:24px">5</span>天
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
            <div class="item">
              <img class="icon" src="@/assets/images/message.png" alt />
              <span class="elip">武汉加油！中国加油！</span>
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
    bottom: 10px;
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
      height: 48px;
      line-height: 48px;
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
      .item {
        background: #ffffff;
        display: flex;
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
import axios from 'axios';
import { getSchoolInfo } from "../../service/common.service";
import { setAntTitle } from "../../lib/common";
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
      show: false
    };
  },
  components: {
    baberrage: () => import("../../components/baberrage/vue-baberrage")
  },
  mounted() {},
  created() {
    setAntTitle("工作台数据");
    axios.get('https://api.map.baidu.com/location/ip?ak=5UxhchHxBYOnRGhEifyCGoPFtjpOFt1I&coor=bd09ll',{
    headers: {'Access-Control-Allow-Origin': '*'}
}).then(r=>{
      console.log(r)
    })
    getSchoolInfo().then(r => {
      console.log(r);
      const item = r.data.Data;
      this.logo = item.Logo;
      this.Campus = item.Campus;
    });
  },
  methods: {
    addToList() {
      for (let index = 0; index < 10; index++) {
         this.barrageList.push({
        id: ++this.currentId,
        avatar: "../../assets/images/message.png",
        msg: this.msg,
        time: 4,
        type: MESSAGE_TYPE.NORMAL
      });
      }
    }
  }
};
</script>


