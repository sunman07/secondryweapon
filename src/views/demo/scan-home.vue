<template>
  <div style="background-color: #ffffff; height: 100%;">
    <div class="top"></div>
    <div class="content">
      <div class="box" @click="search">
        <van-row>
          <van-col span="12">
            <div class="box-text">搜索</div>
          </van-col>
          <van-col span="12">
            <img src="../../assets/scan/sousuo.png" style="padding:15px 0" />
          </van-col>
        </van-row>
      </div>
      <div class="box" @click="saoma">
        <van-row>
          <van-col span="12">
            <div class="box-text">扫码</div>
          </van-col>
          <van-col span="12">
            <img src="../../assets/scan/saoma.png" style="padding:15px 0" />
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="bottom"></div>
    <!-- 扫码 -->

    <!-- <van-popup v-model="show" position="bottom" closeable :style="{ height: '100%' }" @close='close'>
			
    </van-popup>-->
  </div>
</template>

<script>
document.body.addEventListener('touchstart', function() {});
import { setAntTitle } from '../../lib/common';
export default {
  data() {
    return {};
  },
  created() {
    setAntTitle('扫码返校');
  },
  mounted() {
    this.$nextTick(function() {
      console.log('初始化！！');
      this.saoma();
    });
  },
  methods: {
    saoma() {
      let title = '疫情返校扫码';
      let uri = `ant://welcome/sweep/open?TITLE=${title}`;
      const that = this;
      // eslint-disable-next-line no-undef
      antlinker.openNewView({
        uri: uri,
        success: function(data) {
          console.log('1122', data);
          that.$router.push({
            path: '/scandetails',
            query: { id: data.UserID },
          });
        },
        fail: function(e) {
          console.log(e);
        },
      });
    },
    search() {
      this.$router.push('/studentlist');
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

.bottom {
  position: absolute;
  bottom: 0;
  background: url(../../assets/scan/bg.png) no-repeat;
  background-size: 100%;
  height: 180px;
  width: 100%;
}

.content {
  padding: 0px 50px;
}

.box {
  margin: 50px 0px;
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 10px rgba(242, 240, 240, 1);
  border-radius: 20px;
  text-align: center;
  line-height: 100px;
}

.box:active {
  background: rgba(221, 218, 218, 0.5);
}

.box-text {
  font-family: PingFangSC-Semibold, PingFang SC;
  font-size: 23px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

.van-popup__close-icon {
  color: #fbb200;
  z-index: 999;
}

/* 扫码 */
.scan {
  height: 100%;

  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 4rem;
    bottom: 0;
    text-align: center;
    color: #d50000;
    background: #fff;
  }

  footer {
    position: absolute;
    left: 0;
    top: 2rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
</style>
