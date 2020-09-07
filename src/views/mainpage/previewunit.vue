<template>
  <div>
    <p class="header-title" content-position="left">2019~2020 第一学期</p>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div>
            第二课堂成绩
            <div v-for="(item,index) in entryOfSubject" :key="index">
              <div v-if="index<2">
                <van-divider
                  class="header-title"
                  content-position="left"
                >{{entryOfSubject[0].ModuleName}}</van-divider>
                <!-- 展示第1,2条 -->
                <van-row class="item-display">
                  <van-col span="12">
                    <p>{{entryOfSubject[0].Credit}}分</p>
                    <p>已获积分</p>
                  </van-col>
                  <van-col span="12">
                    <p>{{entryOfSubject[0].Credit}}分</p>
                    <p>已获学分</p>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </template>
        <!-- 展示第二条之后的 -->
        <div v-for="(item,index) in entryOfSubject" :key="index">
          <div v-if="index>2">
            <van-divider class="header-title" content-position="left">{{item.ModuleName}}</van-divider>
            <van-row class="item-display">
              <van-col span="12">
                <p>{{item.Credit}}分</p>
                <p>已获积分</p>
              </van-col>
              <van-col span="12">
                <p>{{item.Credit}}分</p>
                <p>已获学分</p>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Vue from "vue";
import { Divider, Collapse, CollapseItem, Col, Row } from "vant";
import { getStudentsAchievement } from "../../service/common.service";
Vue.use(Divider).use(Collapse).use(CollapseItem).use(Col).use(Row);
export default {
  name: "initializeofmain",
  props: [],
  data() {
    return {
      entryOfSubject: [],
      activeNames: ["0"],
    };
  },
  mounted() {
    //获取当前学生得分
    getStudentsAchievement().then((res) => {
      if (res.status === 200) {
        console.log(res, "返回值");
        this.entryOfSubject = res.data.List;
      }
    });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.mainbody {
  background-color: #ffffff;
  height: 100%;
}
.header-title {
  padding: 5px 5px;
  font-size: 15px;
  margin: 6px;
}
.item-display .van-col--12 p {
  line-height: 10px;
  text-align: center;
}
</style>