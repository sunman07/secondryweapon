(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["detail"],{3810:function(s,t,a){s.exports=a.p+"img/user.4fb29c05.jpg"},"42a1":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"detail"},[a("div",{staticClass:"h-bg"}),a("div",{staticClass:"box",staticStyle:{"margin-top":"-80px"}},[a("div",{staticClass:"header"},[a("img",{staticClass:"icon",attrs:{src:s.UserInfo.Icon,alt:""},on:{error:s.imageLoadOnError}}),a("span",{staticClass:"name"},[s._v(s._s(s.UserInfo.Name))]),a("span",{staticClass:"sex"},[s._v(s._s(s.UserInfo.SexName))]),a("span",{staticClass:"status f-r"},[s._v(s._s(s.CurentSep.ConfirmStatusName||"未核实"))])]),a("div",[a("span",{staticClass:"label"},[s._v("学号")]),a("span",{staticClass:"lable value"},[s._v(s._s(s.UserInfo.UserCode))])]),a("div",[a("span",{staticClass:"label"},[s._v("学院")]),a("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.UserInfo.StudentAcademy))])]),a("div",[a("span",{staticClass:"label"},[s._v("班级")]),a("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.UserInfo.ClassName))])])]),a("div",{staticClass:"box"},[a("div",[a("span",{staticClass:"label"},[s._v("当前所在地")]),a("span",{staticClass:"lable value"},[s._v(s._s(s.ReportUnusual.CurrentAddress))])]),a("div",[a("span",{staticClass:"label"},[s._v("监护人")]),a("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.ReportUnusual.GuardianName))]),s._v("\n       \n      "),a("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.ReportUnusual.GuardianPhone))])])]),a("van-panel",{staticStyle:{margin:"auto 20px"},attrs:{title:"上报跟踪"}},[a("van-steps",{attrs:{direction:"vertical"}},s._l(s.Septs,function(t,e){return a("van-step",{key:e},[1==t.OpType?a("div",[a("p",{staticClass:"time"},[s._v(s._s(s.$moment(t.ReportTime).format("MM月DD日 hh:mm")))]),a("div",{staticClass:"step-label"},[s._v("情况上报")]),a("div",{staticClass:"desc"},[s._v("发生日期: "+s._s(s.$moment(t.SituationDate).format("MM月DD日")))]),a("div",{staticClass:"desc"},[s._v("情况说明: "+s._s(t.SituationStatusName))]),t.SituationStatusName.split().includes("其他情况")?a("div",{staticClass:"desc"},[s._v(s._s(t.FollowContent))]):s._e(),a("div",{staticClass:"desc"},[s._v("采取措施: "+s._s(t.SituationMeasureName))])]):s._e(),2==t.OpType?a("div",[a("div",[a("p",[s._v(s._s(s.$moment(t.OpTime).format("MM月DD日 hh:mm")))]),a("div",{staticClass:"step-label"},[a("span",{style:{color:t.Color}},[s._v(s._s(t.FollowStatusName))]),s._v(" 辅导员已核实\n            ")])])]):s._e(),4==t.OpType?a("div",[a("p",[s._v(s._s(s.$moment(t.ReportTime).format("MM月DD日 hh:mm")))]),a("div",{staticClass:"step-label"},[s._v("上报平安")])]):s._e(),5==t.OpType?a("div",[a("p",[s._v(s._s(s.$moment(t.OpTime).format("MM月DD日")))]),a("div",{staticClass:"step-label"},[s._v("未上报")])]):s._e(),6==t.OpType?a("div",[a("p",[s._v(s._s(s.$moment(t.OpTime).format("MM月DD日")))]),a("div",{staticClass:"step-label"},[s._v("未跟踪")])]):s._e()])}),1)],1),a("van-button",{staticClass:"submit",attrs:{disabled:s.disabledUpdate,type:"primary"},on:{click:s.statusReportUpdate}},[s._v("更新状态")])],1)},i=[],l=a("bde3"),n=a("6bc4"),o=a("5880"),p={name:"reportdetail",data:function(){return{RecordID:"",disabledUpdate:!0,Septs:[],CurentSep:{},ReportUnusual:{}}},computed:Object(o["mapState"])(["UserInfo"]),created:function(){Object(l["c"])("疫情详情"),this.getFlowList()},methods:{imageLoadOnError:function(){this.UserInfo.Icon=a("3810")},getFlowList:function(){var s=this;Object(n["g"])().then(function(t){var a=t.data;if(!a.FeedbackCode){var e=a.Data;s.Septs=e||[],console.log("this.Steps",s.Septs),s.Septs[0].TeachIntelUserCode&&(s.disabledUpdate=!1)}})},statusReportUpdate:function(){console.log("statusReportUpdate"),this.$router.push({path:"report"})}}},r=p,c=(a("8a0c"),a("2877")),v=Object(c["a"])(r,e,i,!1,null,"215798b8",null);t["default"]=v.exports},"4ae4":function(s,t,a){},"8a0c":function(s,t,a){"use strict";var e=a("4ae4"),i=a.n(e);i.a}}]);