<template>
  <van-skeleton title avatar :row="15" :loading="loading">
    <div class="top-back" :style="{ background: status.color}">
      <div class="top-text" style="height: 25px;"></div>
      <div class="content">
        <van-row style>
          <van-col span="16">
            <img :src="detailsData.ico" class="content-avt" />
            <img v-if="detailsData.ico == ''" src="@/assets/logo.png" class="content-avt" />
            <div class="content-name" style="float:left;margin: 0 5px;">
              {{detailsData.name}}
              <span style="font-size:16px; color:#7B7B7B">{{detailsData.gender}}</span>
            </div>
          </van-col>
          <van-col
            span="8"
            class="content-name"
            :style="{'text-align':'right', color: status.color}"
          >{{status.text}}</van-col>
        </van-row>
        <p>
          学号
          <span style="color: #333333;">{{detailsData.userid}}</span>
        </p>
        <p>
          学院
          <span style="color: #333333;">{{detailsData.academy}}</span>
        </p>
        <span style="color: #7b7b7b;">
          班级
          <span style="color: #333333;">{{detailsData.class}}</span>
        </span>
      </div>
      <div
        class="content-l"
        style="height: 45px; padding: 0 18px; line-height: 45px; font-size: 14px;"
      >
        <span>辅导员</span>
        <div style="float: right;">
          {{detailsData.counselorname}}
          <a
            style="color: #066BFC;"
            @click="phone(detailsData.phone, detailsData.counselorname)"
          >拨打电话</a>
        </div>
      </div>

      <div class="content-l">
        <van-collapse v-model="activeName1" accordion>
          <van-collapse-item title="历史体温" name="1" :value="detailsData.Temperature">
            <div style="text-align: right;">
              <span class="cal" @click="clickData">选择日期</span>
            </div>

            <van-steps class="step-time" direction="vertical" active-color="#FBB200" :active="0">
              <van-step v-for="(i, index) in temp" :key="index">
                <p>检查人： {{i.Name}}</p>
                <p>
                  体温：
                  <span :style="{color: i.color}">{{i.Temperature}}</span>
                </p>
                <p>检查时间： {{$moment(i.TemperatureTime).format('MM月DD日 HH:mm')}}</p>
              </van-step>
            </van-steps>
          </van-collapse-item>
        </van-collapse>
      </div>

      <!--充当占位符的div块，无实质内容 -->
      <div style="height:65px;"></div>
      <div class="bottom-boxs">
        <van-button
          class="bottoms"
          type="primary"
          round
          color="#ffc000"
          size="large"
         
          @click="cliExport()"
        >体温上报</van-button>
      </div>
      <van-action-sheet v-model="show1" title="上报体温" class="poptem">
        <div class="content" style="padding: 30px 15px;">
          <!-- <div :style="{'font-size': '16px','text-align':'center',color:temcolor }">{{temdata}}</div>
          <el-slider
            v-model="value2"
            :marks="marks"
            :color="temcolor"
            :show-tooltip="false"
            :change="temps()"
          ></el-slider> -->
        </div>

        <div style="text-align: center; margin: 30px 0 10px; 0">
          <van-button class="bottoms" color="#ffc000" round size="large" @click="reportTem()">确定</van-button>
        </div>
      </van-action-sheet>
      <!-- 允许进校弹窗 -->
      <van-popup v-model="show" round position="bottom">
        <h3 style="text-align: center;">处理审批</h3>
        <van-row class="pop-img" style="text-align: center; padding: 50px 0;">
          <van-col span="12">
            <div @click="bohui">
              <img width="80" src="@/assets/bohui.png" />
              <p>隔离该生</p>
            </div>
          </van-col>
          <van-col span="12">
            <div @click="tongguo">
              <img width="80" src="@/assets/tongguo.png" />
              <p>允许进校</p>
            </div>
          </van-col>
        </van-row>
        <div class="content-sheet">
          <!-- <van-button class="bottoms" round plain type="info" @click="show=false">取消处理</van-button> -->
          <p @click="show=false, show1=true">重测体温</p>
        </div>
      </van-popup>
      <!-- 驳回理由弹窗 -->
      <van-dialog
        v-model="reject"
        title="隔离原因"
        show-cancel-button
        style="z-index: 6666;"
        @confirm="hadeleReject"
        @cancel="reject=false, message=''"
      >
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入隔离原因"
          show-word-limit
        />
      </van-dialog>
      <!-- 日历组件 -->
      <van-calendar
        v-model="calshow"
        color="#ffc000"
        :default-date="new Date()"
        :min-date="minDate"
        :max-date="maxDate"
        :round="false"
        position="right"
        :formatter="formatter"
        @confirm="onConfirm"
      />
      <van-dialog
        v-model="temshow"
        title="提示"
        show-cancel-button
        :confirm-button-color="'#FBB200'"
        @confirm="report"
        @cancel="temshow=false,show1=true"
      >
        <div style="padding: 10px 20px">
          当前体温为
          <span :style="{color: temcolor}">{{temdata}}</span> 确认上报体温？
        </div>
      </van-dialog>
    </div>
  </van-skeleton>
</template>
<script>
import { setAntTitle, onTel } from '../../lib/common';
import {
  getstu,
  temperature,
  reporttem,
  permitschool,
  isolation,
} from '../../service/common.service';
import { Toast } from 'vant';

export default {
  data() {
    return {
      loading: true,
      detailsData: '',
      code: '',
      status: {
        color: '',
        text: '',
      },
      calshow: false,
      activeName1: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      time: [],
      show: false,
      reject: false,
      message: '',
      buttonstatus: '',
      temp: [],
      show1: false,
      value2: 0,
      marks: {
        20: '37°C',
        45: '37.3°C',
        60: '38°C',
        85: '39°C',
      },
      temdata: '',
      temcolor: '',
      datas: [],
      temshow: false,
    };
  },
  created() {
    setAntTitle('学生详情');
  },
  mounted() {
    this.code = this.$route.query.id;
    console.log(this.code);
    this.loadList();
  },
  destroyed() {},
  methods: {
    temps() {
      if (this.value2 > 0 && this.value2 < 20) {
        this.temdata = '< 37°C';
        this.temcode = '1';
        this.temcolor = '#67c23a';
      } else if (this.value2 >= 20 && this.value2 < 45) {
        this.temdata = '37°C ～ 37.3°C';
        this.temcode = '2';
        this.temcolor = '#67c23a';
      } else if (this.value2 >= 45 && this.value2 < 60) {
        this.temdata = '37.3°C ～ 38°C';
        this.temcode = '3';
        this.temcolor = '#f10303';
      } else if (this.value2 >= 60 && this.value2 < 85) {
        this.temdata = '38°C ～ 39°C';
        this.temcode = '4';
        this.temcolor = '#f10303';
      } else if (this.value2 >= 85 && this.value2 <= 100) {
        this.temdata = '> 39°C';
        this.temcode = '5';
        this.temcolor = '#f10303';
      } else {
        this.temdata = '请选择体温';
        this.temcolor = '#f10303';
        this.temcode = '';
      }
    },
    // 隔离
    hadeleReject() {
      if (!this.message) {
        Toast('请输入隔离原因');
        return;
      }
      isolation(this.code, this.message).then(res => {
        if (res.data.FeedbackCode == 0) {
          Toast.success('隔离成功');
          this.status.color = '#ff0000';
          this.status.text = '隔离';
          this.message = '';
          history.go(-2);
        } else {
          Toast.fail('失败');
        }
      });
      this.loadList();
    },
    bohui() {
      this.show = false;
      this.reject = true;
    },
    // 允许进校
    tongguo() {
      permitschool(this.detailsData.IntelUserCode).then(res => {
        if (res.data.FeedbackCode == 0) {
          Toast.success('成功');
          this.status.color = '#1BC870';
          this.status.text = '已到校';
          history.go(-2);
          this.$router.push('/scan')
        } else {
          Toast.fail('失败');
        }
      });
      this.show = false;
      this.loadList();
    },

    // 加载学生的详细信息
    loadList() {
      getstu(this.code).then(res => {
        if (res.data.FeedbackCode == 0) {
          this.detailsData = res.data.Data;
          console.log(this.detailsData);
          this.buttonstatus = res.data.Data.status;
          this.oldtemperature(this.detailsData.IntelUserCode, '');
          this.loading = false;
          switch (res.data.Data.status) {
            case '1':
              this.status.color = '#FBB200';
              this.status.text = '待安排';
              break;
            case '2':
              this.status.color = '#FBB200';
              this.status.text = '未申请';
              break;
            case '3':
              this.status.color = '#FBB200';
              this.status.text = '待审批';
              break;
            case '4':
              this.status.color = '#ff0000';
              this.status.text = '驳回';
              break;
            case '5':
              this.status.color = '#1BC870';
              this.status.text = '在途';
              break;
            case '6':
              this.status.color = '#ff0000';
              this.status.text = '隔离';
              break;
            case '7':
              this.status.color = '#1BC870';
              this.status.text = '已到校';
              break;
          }
          switch (this.detailsData.Temperature) {
            case '0':
              this.detailsData.color = '#abb4b3';
              this.detailsData.Temperature = '暂无数据';
              break;
            case '1':
              this.detailsData.color = '#1BC870';
              this.detailsData.Temperature = '<37°C';
              break;
            case '2':
              this.detailsData.color = '#FBB200';
              this.detailsData.Temperature = '37°C~37.3°C';
              break;
            case '3':
              this.detailsData.color = '#ff0000';
              this.detailsData.Temperature = '37.3°C~38°C';
              break;
            case '4':
              this.detailsData.color = '#ff0000';
              this.detailsData.Temperature = '38°C~39°C';
              break;
            case '5':
              this.detailsData.color = '#ff0000';
              this.detailsData.Temperature = '>39°C';
              break;
            default:
              this.detailsData.color = '#abb4b3';
              this.detailsData.Temperature = '暂无数据';
              break;
          }
        }
      });
    },
    oldtemperature(code, time) {
      temperature(code, time).then(r => {
        console.log(r);
        if (r.data.FeedbackCode == 0) {
          const data = r.data.Data;
          if (data) {
            data.forEach(d => {
              this.datas.push(d.time);
              switch (d.Temperature) {
                case '0':
                  d.color = '#abb4b3';
                  d.Temperature = '暂无数据';
                  break;
                case '1':
                  d.color = '#1BC870';
                  d.Temperature = '<37°C';
                  break;
                case '2':
                  d.color = '#FBB200';
                  d.Temperature = '37°C~37.3°C';
                  break;
                case '3':
                  d.color = '#ff0000';
                  d.Temperature = '37.3°C~38°C';
                  break;
                case '4':
                  d.color = '#ff0000';
                  d.Temperature = '38°C~39°C';
                  break;
                case '5':
                  d.color = '#ff0000';
                  d.Temperature = '>39°C';
                  break;
                default:
                  d.color = '#abb4b3';
                  d.Temperature = '暂无数据';
                  break;
              }
            });
            this.temp = data;
          } else {
            this.temp = '';
          }
        }
      });
    },
    clickData() {
      this.calshow = true;
    },
    // 时间操作
    formatter(day) {
      // console.log(day)
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      for (let i of this.datas) {
        if (month == new Date(i).getMonth() + 1) {
          if (date == new Date(i).getDate()) {
            day.bottomInfo = '●';
          }
        }
      }
      return day;
    },
    onConfirm(date) {
      console.log(date);

      this.calshow = false;
      this.time = [];
      // 单选时间的处理
      this.time =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
      console.log(this.time);

      this.oldtemperature(this.detailsData.IntelUserCode, this.time);
    },
    // 处理审批
    cliExport() {
      this.show1 = true;
    },
    phone(i, name) {
      if (i) {
        onTel(i, name);
      } else {
        Toast('系统没有获取到手机号码');
      }
    },
    reportTem() {
      if (Number(this.temcode) <= 0) {
        Toast('请选择体温');
        this.show1 = false;
        return;
      }
      this.temshow = true;
    },
    report() {
      this.show1 = false;
      this.show = true;
      reporttem(this.detailsData.IntelUserCode, this.temcode).then(r => {
        if (r.data.FeedbackCode === 0) {
          Toast('体温上报成功，请继续操作');
          this.loadList();
        }
      });
    },
  },
};
</script>
<style scoped>
.top-back {
  /* background: #10AEB5; */
  height: 150px;
  /* background-size: 200px; */
}

.top-text {
  text-align: center;
  font-size: 15px;
  color: #fff;
  padding: 10px 50px;
}

.top-img {
  height: 14px;
}

.content {
  background: #fff;
  margin: 0 20px 10px 20px;
  /* height: 160px; */
  border-radius: 12px;
  padding: 10px 15px;
}

.content-l {
  background: #fff;
  margin: 0 20px 10px 20px;
  /* height: 160px; */
  border-radius: 10px;
  padding: 0px 5px;
}

.content-avt {
  height: 36px;
  border-radius: 50%;
  float: left;
}

.content-name {
  /* float: left; */
  line-height: 36px;
  font-size: 18px;
  font-family: PingFang-SC-Medium;
}

.content p {
  color: #7b7b7b;
}

/* .content span {
  color: #7b7b7b;
} */
.content span a {
  color: #066bfc;
}

/* 底部按钮 */
.bottom-boxs {
  position: fixed;
  bottom: 0;
  overflow: hidden;
  line-height: 63px;
  height: 63px;
  background: #fff;
  width: 100%;
  text-align: center;
  z-index: 9;
  /* margin-bottom: 100px; */
}

.bottoms {
  width: 90%;
}

/* 弹窗 */
.content-sheet {
  text-align: center;
  margin: 10px 0;
}

.sheet {
  background: #f8f8f8;
}

.van-popup {
  background-color: #f8f8f8;
}

.content .btu .van-button__text {
  color: #fbb200;
}

.content .sub .van-button__text {
  color: #fff;
}

.van-step--finish .van-step__circle,
.van-step--finish .van-step__line {
  background-color: #fbb200;
}
.step-time span,
.step-time p {
  color: #666666;
}
.tagbtu {
  margin: 10px 3px;
  /* background: #fbb200 */
}
.report-text {
  height: 80px;
  margin: 0 20px 10px 20px;
  line-height: 80px;
  float: right;
  font-size: 17px;
  color: #fc5006;
}

.cal {
  color: #066bfc;
  /* float: right; */
}

.tem {
  height: 150px;
  line-height: 150px;
}
.poptem {
  background-color: #faf3e3;
}
</style>
