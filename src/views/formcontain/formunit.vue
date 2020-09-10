<template>
  <div class="formpage">
    <van-cell-group v-if="infoGet">
      <van-cell title="学号" :label="infoGet.StuUserCode" />
      <van-cell title="姓名" :label="infoGet.StuName" />
      <van-cell title="班级" :label="infoGet.ClassName" />
      <van-cell title="分值" :label="infoGet.Score" />
    </van-cell-group>
    <van-form @submit="onSubmit">
      <!--   <van-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />-->
      <van-field
        readonly
        clickable
        name="ModuleCode"
        :value="selectValue"
        label="所属模块"
        placeholder="点击选择模块"
        :rules="[{ required: true, message: '请选择模块' }]"
        @click="editAble?showModulesPicker = true:null"
      />
      <van-popup v-model="showModulesPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="modulesBelong"
          @confirm="onConfirm"
          @cancel="showModulesPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="ItemCode"
        :value="selectProject"
        label="所属项目"
        @click="editAble?showProjectPicker = true:null"
        placeholder="点击选择项目"
        :rules="[{ required: true, message: '请选择项目' }]"
      />
      <van-popup v-model="showProjectPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="projectBelong"
          @confirm="onProjectConfirm"
          @cancel="showProjectPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="StandardCode"
        :value="selectStandard"
        label="所属标准"
        @click="editAble?showStandardPicker = true:null"
        placeholder="点击选择标准"
        :rules="[{ required: true, message: '请选择标准' }]"
      />
      <van-popup v-model="showStandardPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="standardBelong"
          @confirm="onStandardConfirm"
          @cancel="showStandardPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="ParticipateDate"
        :value="valueDate"
        @click="editAble?showTimePicker = true:null"
        label="时间选择"
        placeholder="点击选择时间"
        :rules="[{ required: true, message: '请选择时间' }]"
      />
      <van-popup v-model="showTimePicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="onTimeConfirm"
          @cancel="showTimePicker = false"
          :formatter="formatter"
        />
      </van-popup>
      <van-field
        name="Description"
        v-model="detailsOfInfo"
        label="详细内容"
        placeholder="请输入详细内容"
        :disabled="!editAble"
        type="textarea"
        maxlength="50"
        rows="2"
        :rules="[{required: true,  message: '请输入详细内容' }]"
      />

      <van-field name="Evidence" label="文件上传" :rules="[{required: true,message: '请选择文件上传' }]">
        <template #input>
          <van-uploader
            v-model="uploaders"
            :disabled="!editAble"
            multiple
            :max-count="1"
            :before-read="beforeRead"
            @delete="delFile()"
          />
        </template>
      </van-field>

      <div style="margin: 16px;" v-if="!infoGet">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-row v-if="infoGet&&!infoGet.from" class="buttonperi-remain">
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

    <div v-if="scoreLogs.length>0" class="bottom-particular">
      <p class="header-particular">审批明细</p>
      <van-row v-for="item in scoreLogs" :key="item">
        <van-col span="8">{{item.ApprovalDate}}</van-col>
        <van-col span="8">{{item.Operator}}</van-col>
        <van-col span="8">{{item.ApprovalDesc}}</van-col>
      </van-row>
      <van-cell v-if="this.unApproveReason!==''" title="审批不通过原因" :label="this.unApproveReason" />
    </div>
  </div>
</template>

<script>
import { setAntTitle } from "../../lib/common";
import Vue from "vue";
import moment from "moment";
import * as qiniu from "qiniu-js";
import http from "../../lib/fetch";
import {
  Icon,
  Row,
  Col,
  Button,
  Popup,
  Picker,
  Toast,
  Form,
  Field,
  DatetimePicker,
  Uploader,
  Cell,
  CellGroup,
  Dialog,
} from "vant";
Vue.use(Icon)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Popup)
  .use(Picker)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(DatetimePicker)
  .use(Uploader)
  .use(Cell)
  .use(CellGroup)
  .use(Dialog);
import {
  getModuleDic,
  getObjectDic,
  getStandardsDic,
  getApplyForAchievement,
  getApproveOfScore,
  queryUpToken,
  getRecordOfApprove,
  //getschoolbackinfo,
} from "../../service/common.service";
export default {
  name: "formsubunit",
  props: ["infoGet"],
  data() {
    return {
      value1: "",
      pattern: /\d{6}/,
      defaultValues: Object,
      showModulesPicker: false,
      showStandardPicker: false,
      showProjectPicker: false,
      showTimePicker: false,
      modulesBelong: Array,
      projectBelong: Array,
      standardBelong: Array,
      selectValue: "",
      selectProject: "",
      selectStandard: "",
      detailsOfInfo: "",
      valueDate: "",
      uploaders: [],
      unApproveDisplay: false,
      messageBind: "",
      evidenceKey: "",
      scoreLogs: [],
      unApproveReason: "",
      editAble: true,
    };
  },
  created() {
    setAntTitle("第二课堂");
  },
  mounted() {
    this.getSelectSum();
    //如果是编辑行为 初始化数据
    this.onInitial();
  },
  methods: {
    //初始化数据
    onInitial() {
      if (this.infoGet) {
        this.defaultValues = this.infoGet;
        this.selectValue = this.defaultValues.ModuleName;
        this.selectProject = this.defaultValues.ItemName;
        this.selectStandard = this.defaultValues.StandardName;
        this.valueDate = this.defaultValues.ReportDate;
        this.detailsOfInfo = this.defaultValues.Description;
        this.editAble = false;
        //获取审批明细
        getRecordOfApprove(this.defaultValues.RecordId).then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.scoreLogs = res.data.ScoreLogs.Record;
            if (res.data.RejectReason) {
              this.unApproveReason = res.data.RejectReason;
            }
          }
        });
      }
    },
    onSubmit(values) {
      //从form字面量查询相应code
      const x = this.modulesBelong.findIndex(
        (value) => value.text === values.ModuleCode
      );
      const y = this.projectBelong.findIndex(
        (value) => value.text === values.ItemCode
      );
      const z = this.standardBelong.findIndex(
        (value) => value.text === values.StandardCode
      );
      values.ModuleCode = this.modulesBelong[x].code;
      values.ItemCode = this.projectBelong[y].ItemCode;
      values.StandardCode = this.standardBelong[z].StandardCode;
      values.Evidence = this.evidenceKey;
      //提交申请
      getApplyForAchievement(values).then((res) => {
        if (res.status === 200) {
          Toast("申请成功");
          this.$router.replace("/home");
        } else {
          Toast("申请失败");
        }
      });
    },
    //选择模块确认
    onConfirm(value) {
      this.selectValue = value.text;
      this.getItemDic(value.code);
      this.getStandardDic(value.code);
      this.selectProject = "";
      this.selectStandard = "";
      this.showModulesPicker = false;
    },
    //选择项目确认
    onProjectConfirm(value) {
      this.selectProject = value.text;
      this.selectStandard = "";
      this.getStandardDic(value.code);
      this.showProjectPicker = false;
    },
    //选择标准确认
    onStandardConfirm(value) {
      this.selectStandard = value.text;
      this.showStandardPicker = false;
    },
    //确认选择日期
    onTimeConfirm(date) {
      // console.log(moment(date).format("YYYY-MM-DD HH:mm"));
      this.valueDate = moment(date).format("YYYY-MM-DD HH:mm");
      this.showTimePicker = false;
    },
    //获取所有select字典项
    getSelectSum() {
      //模块字典
      getModuleDic().then((res) => {
        if (res.status === 200) {
          res.data.list.forEach((item) => {
            item.text = item.code_name;
          });
          this.modulesBelong = res.data.list;
        } else {
          Toast("获取模块字典失败");
        }
      });
    },

    //项目字典
    getItemDic(params) {
      getObjectDic(params).then((res) => {
        if (res.status === 200) {
          res.data.List.forEach((item) => {
            item.text = item.ItemName;
          });
          this.projectBelong = res.data.List;
        } else {
          Toast("获取项目字典失败");
        }
      });
    },
    //标准字典
    getStandardDic(params) {
      getStandardsDic(params).then((res) => {
        if (res.status === 200) {
          res.data.List.forEach((item) => {
            item.text = item.StandardName;
          });
          this.standardBelong = res.data.List;
        } else {
          Toast("获取标准字典失败");
        }
      });
    },

    //格式化日期
    formatter(type, val) {
      switch (type) {
        case "year":
          return `${val}年`;
        case "month":
          return `${val}月`;
        case "day":
          return `${val}日`;
        case "hour":
          return `${val}时`;
        case "minute":
          return `${val}分`;
        default:
          break;
      }
      return val;
    },
    //上传文件uploader
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("请上传jpeg,png格式图片");
        return false;
      } else if (file.size > 10485760) {
        Toast("上传文件大于10m");
        return false;
      }

      queryUpToken(file.name, file.size).then((res) => {
        this.upload({
          file: file,
          key: res.data.Data.Key,
          token: res.data.Data.Proof,
        });
      });
      return true;
    },
    upload(obj) {
      const that = this;
      const observable = qiniu.upload(
        obj.file,
        obj.key,
        obj.token,
        {
          mimeType: [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/gif",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
        },
        {
          useCdnDomain: true,
        }
      );

      const observer = {
        //  next(res) { },
        error(err) {
          this.message.create("warn", err.message);
        },
        complete(res) {
          const file = obj.file;
          // that.fileLoading.dismiss();
          http
            .postJSON({
              Router: "/api/system/saveattach",
              Method: "POST",
              Body: {
                BizType: "",
                AttachmentItemName: file.name || "",
                AttachmentItemType: file.type,
                AttachmentItemSize: file.size.toString(),
                AttachmentURL: res.key,
              },
            })
            .then((ress) => {
              console.log(ress, that);
              that.evidenceKey = ress.data.Data.RecordID;
              /*       if (ress.data.Data.RecordID) {
              if (
                file.type !== 'application/msword' &&
                'application/pdf' &&
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              ) {
                that.uploaders.push({
                  uid: ress.data.Data.RecordID,
                  url: ress.data.Data.URL,
                  name: file.name,
                  status: 'done',
                });
               

                
               // that.fileUpdate();
              } else {
                that.uploaders.push({
                  uid: ress.data.Data.RecordID,
                  url: ress.data.Data.URL,
                  name: file.name,
                  status: 'done',
                });
                 
                //that.fileUpdate();
              }
            } */
            });
        },
      };
      const subscription = observable.subscribe(observer);
      console.log(subscription);
      // this.fileLoading = this.helpUtil.loadingPop('正在上传，请稍等...');
    },
    //删除文件
    delFile() {
      console.log(this.uploaders);
      // const imgCollect = this.uploader;
    },
    unApprove() {
      this.unApproveDisplay = true;
    },
    //审批不通过
    unApproveSubmit() {
      const params = {
        RecordId: [this.infoGet.RecordId],
        RejectReason: this.messageBind,
        ApprovalStatus: 11,
      };
      this.submitApprovement(params);
    },
    //审批通过按钮
    getApprove() {
      Dialog.confirm({
        title: "确定要审批通过吗？",
      })
        .then(() => {
          const params = {
            RecordId: [this.infoGet.RecordId],
            RejectReason: this.messageBind,
            ApprovalStatus: 12,
          };
          this.submitApprovement(params);
        })
        .catch(() => {
          // on cancel
        });
    },
    //提交审批
    submitApprovement(params) {
      getApproveOfScore(params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.submit-apply {
  display: block;
  width: 80%;
  margin: 10px auto;
}
.buttonperi-remain {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.approve-remain {
  width: 100%;
}
.formpage {
  padding-bottom: 60px;
}
.bottom-particular {
  background: #fff;
  padding: 0px 0px 16px 0px;
}
.header-particular {
  font-size: 14px;
  letter-spacing: 3px;
  text-indent: 15px;
  line-height: 32px;
  margin: 15px 0px 0px 0px;
}
.line-particular {
  color: #405fff;
}
.van-row .van-col--8 {
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 22px;
  text-indent: 18px;
}
.van-cell-group {
  background-color: red;
}
</style>