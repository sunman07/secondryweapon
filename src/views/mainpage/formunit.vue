<template>
  <div>
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
        @click="showModulesPicker = true"
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
        placeholder="点击选择项目"
        :rules="[{ required: true, message: '请选择项目' }]"
        @click="showProjectPicker= true"
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
        placeholder="点击选择标准"
        :rules="[{ required: true, message: '请选择标准' }]"
        @click="showStandardPicker = true"
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
        label="时间选择"
        placeholder="点击选择时间"
        :rules="[{ required: true, message: '请选择时间' }]"
        @click="showTimePicker = true"
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
        placeholder="
请输入详细内容"
        type="textarea"
        maxlength="50"
        rows="2"
        :rules="[{required: true,  message: '请输入详细内容' }]"
      />

      <van-field name="Evidence" label="文件上传">
        <template #input>
          <van-uploader
            v-model="uploader"
            multiple
            :max-count="2"
            :before-read="beforeRead"
            @delete="delFile()"
          />
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { setAntTitle } from "../../lib/common";
import Vue from "vue";
import moment from "moment";
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
  .use(Uploader);
import {
  getModuleDic,
  getObjectDic,
  getStandardsDic,
  getApplyForAchievement,
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
      uploader: [],
    };
  },
  created() {
    setAntTitle("第二课堂");
  },
  mounted() {
    this.getSelectSum();
    //如果是编辑行为 初始化数据
    this.onInitial()
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
        console.log(this.defaultValues.ModuleName);
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
      values.Evidence = "ue83r92ru283";
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
      this.showModulesPicker = false;
    },
    //选择项目确认
    onProjectConfirm(value) {
      this.selectProject = value.text;
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
      //项目字典
      getObjectDic().then((res) => {
        if (res.status === 200) {
          res.data.List.forEach((item) => {
            item.text = item.ItemName;
          });
          this.projectBelong = res.data.List;
        } else {
          Toast("获取项目字典失败");
        }
      });
      //标准字典
      getStandardsDic().then((res) => {
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
      console.log(file, "内容");
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("请上传jpeg,png格式图片");
        return false;
      } else if (file.size > 10485760) {
        Toast("上传文件大于10m");
        return false;
      }
      return true;
    },
    //删除文件
    delFile() {
      console.log(this.uploader);
      // const imgCollect = this.uploader;
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
</style>