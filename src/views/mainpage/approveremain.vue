<template>
  <div class="remin-page">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-checkbox-group v-model="resultChecked">
        <van-cell-group>
          <div v-for="(item,index) in entryDetails" :key="item" class="card-remain">
            <van-row>
              <van-col span="3">
                <van-checkbox
                  :name="item.RecordId"
                  :key="index"
                  clickable
                  @click="toggleCheckBox(item)"
                  ref="checkboxes"
                />
              </van-col>
              <van-col @click="pushDetails(item)" span="18">
                <van-row class="title-remain">
                  <van-col span="12">
                    <p class="text-remain">申请人:{{item.StuName}}</p>
                  </van-col>
                  <van-col span="12">
                    <p class="text-remain">申请时间:{{item.ParticipateDate}}</p>
                  </van-col>
                </van-row>
                <p class="text-remain">模块:{{item.ModuleName}}</p>
                <p class="text-remain">项目:{{item.ItemName}}</p>
                <p class="text-remain">标准:{{item.StandardName}}</p>
                <p class="text-remain">分数:{{item.Score}}</p>
              </van-col>
              <van-col @click="pushDetails(item)" span="3">
                <van-icon name="arrow" />
              </van-col>
            </van-row>
          </div>
        </van-cell-group>
      </van-checkbox-group>
    </van-list>
    <van-row class="buttonperi-remain">
      <van-col span="12">
        <van-button square plain type="info" class="approve-remain" @click="unApprove">审批不通过</van-button>
      </van-col>
      <van-col span="12">
        <van-button square type="info" class="approve-remain" @click="getApprove">审批通过</van-button>
      </van-col>
    </van-row>
    <van-dialog
      v-model="unApproveDisplay"
      title="请写明不通过的原因"
      @confirm="unApproveSubmit"
      show-cancel-button
    >
      <van-field
        v-model="messageBind"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入..."
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  List,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Icon,
  Dialog,
  Field,
  Toast,
} from "vant";
import {
  getStudentsScoreInfo,
  getApproveOfScore,
} from "../../service/common.service";
Vue.use(List)
  .use(Row)
  .use(Col)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Toast);
export default {
  name: "approveremain",
  data() {
    return {
      list: [],
      entryDetails: [],
      loading: false,
      finished: false,
      resultChecked: [],
      unApproveDisplay: false,
      messageBind: "",
      paramsQuery: {ApprovalStatus: 10, Page: 0, PageCount: 10},
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      /*   setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000); */
      setTimeout(() => {
        this.paramsQuery.Page++;
        this.getStudentsScoreDetails(this.paramsQuery);
      }, 1000);
    },
    getStudentsScoreDetails(params) {
      getStudentsScoreInfo(params).then((res) => {
        if (res.status === 200) {
          if (res.data.List !== null) {
            this.loading = false;
            this.entryDetails.push(...res.data.List);
          } else {
            this.finished = true;
          }
        }
      });
    },
    pushDetails(item) {
      console.log(item);
      this.$router.push({
        name: "appdetails",
        query: { mark: item },
      });
    },
    //复选框选中
    toggleCheckBox(index) {
      console.log(index, this.resultChecked);
      //手动处理选中事件
      this.$refs.checkboxes[index].checked.toggle();
    },
    unApprove() {
      if (this.resultChecked.length > 0) {
        this.unApproveDisplay = true;
      } else {
        Toast("请选择项目后再再操作");
      }
    },
    //审批不通过
    unApproveSubmit() {
      const params = {
        RecordId: this.resultChecked,
        RejectReason: this.messageBind,
        ApprovalStatus: 11,
      };
      this.submitApprovement(params);
    },
    //审批通过按钮
    getApprove() {
      if (this.resultChecked.length > 0) {
        Dialog.confirm({
          title: "确定要审批通过吗？",
        })
          .then(() => {
            const params = {
              RecordId: this.resultChecked,
              RejectReason: this.messageBind,
              ApprovalStatus: 12,
            };
            this.submitApprovement(params);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("请选择项目后再再操作");
      }
    },
    submitApprovement(params) {
      getApproveOfScore(params).then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
  /*   this.paramsQuery = { ApprovalStatus: 10, Page: 1, PageCount: 10 };
    this.getStudentsScoreDetails(this.paramsQuery); */
  },
};
</script>

<style lang="less" scoped>
.remin-page {
  padding-bottom: 50px;
}
.van-col--16,
.van-col--8 {
  font-size: 14px;
}
.card-remain {
  background: #ffffff;
  margin-top: 10px;
  padding: 5px 0px 5px 0px;
}
.text-remain {
  font-size: 14px;
  line-height: 8px;
}
.van-checkbox {
  height: 126px;
  padding-left: 12px;
}
.title-remain {
  height: 28px;
  color: #c0c4cc;
}
.van-icon-arrow {
  line-height: 126px;
  padding-left: 10px;
}
.buttonperi-remain {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.approve-remain {
  width: 100%;
}
</style>