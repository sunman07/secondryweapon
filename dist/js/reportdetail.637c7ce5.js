(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reportdetail"],{"377a":function(s,a,t){},3810:function(s,a,t){s.exports=t.p+"img/user.4fb29c05.jpg"},"42a1":function(s,a,t){"use strict";t.r(a);var e=function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("div",{staticClass:"reportdetail"},[t("div",{staticClass:"h-bg"}),t("div",{staticClass:"box",staticStyle:{"margin-top":"-80px"}},[t("div",{staticClass:"header"},[t("img",{staticClass:"icon",attrs:{src:s.UserInfo.Icon,alt:""},on:{error:s.imageLoadOnError}}),t("span",{staticClass:"name"},[s._v(s._s(s.UserInfo.Name))]),t("span",{staticClass:"sex"},[s._v(s._s(s.UserInfo.SexName))]),t("span",{staticClass:"status f-r"},[s._v(s._s(s.CurentSep.ConfirmStatusName||"待确定"))])]),t("div",[t("span",{staticClass:"label"},[s._v("学号")]),t("span",{staticClass:"lable value"},[s._v(s._s(s.UserInfo.UserCode))])]),t("div",[t("span",{staticClass:"label"},[s._v("学院")]),t("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.UserInfo.StudentAcademy))])]),t("div",[t("span",{staticClass:"label"},[s._v("班级")]),t("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.UserInfo.ClassName))])])]),t("div",{staticClass:"box"},[t("div",[t("span",{staticClass:"label"},[s._v("当前所在地")]),t("span",{staticClass:"lable value"},[s._v(s._s(s.ReportUnusual.CurrentAddress))])]),t("div",[t("span",{staticClass:"label"},[s._v("监护人")]),t("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.ReportUnusual.GuardianName))]),s._v("\n       "),t("span",{staticClass:"lable value van-ellipsis"},[s._v(s._s(s.ReportUnusual.GuardianPhone))])])]),t("van-panel",{staticStyle:{margin:"auto 20px"},attrs:{title:"上报跟踪"}},[t("van-steps",{attrs:{direction:"vertical"}},s._l(s.Septs,function(a,e){return t("van-step",{key:e},[2==a.OpType?t("div",[a.mark?t("div",[s._v(s._s(a.FollowStatusName))]):t("div",[t("p",[s._v(s._s(a.ReportTime))]),t("div",{staticClass:"step-label"},[s._v("\n              "+s._s(a.TeachName)+"老师已确定，标记\n              "),t("span",{staticClass:"status"},[s._v(s._s(a.FollowStatusName))])])])]):s._e(),1==a.OpType?t("div",[t("p",{staticClass:"time"},[s._v(s._s(a.OpTime))]),t("div",{staticClass:"step-label"},[s._v("上报疫情")]),"其他情况"==a.FollowStatusName?t("div",{staticClass:"desc"},[s._v(s._s(a.FollowContent))]):s._e(),"其他情况"!=a.FollowStatusName?t("div",{staticClass:"desc"},[s._v(s._s(a.FollowStatusName))]):s._e()]):s._e()])}),1)],1),t("van-button",{staticClass:"submit",attrs:{disabled:s.disabledUpdate,type:"primary"},on:{click:s.statusReportUpdate}},[s._v("更新状态")])],1)},l=[],i=t("bde3"),n=t("6bc4"),o=t("5880"),r={name:"reportdetail",data:function(){return{RecordID:"",disabledUpdate:!0,Septs:[],CurentSep:{},ReportUnusual:{}}},computed:Object(o["mapState"])(["UserInfo"]),created:function(){Object(i["c"])("疫情详情"),this.getFlowList()},methods:{imageLoadOnError:function(){this.UserInfo.Icon=t("3810")},getFlowList:function(){var s=this;Object(n["f"])().then(function(a){var t=a.data;if(!t.FeedbackCode){var e=t.Data;s.ReportUnusual=e.ReportUnusual,s.Septs=e.RUFollow||[],console.log("this.Steps",s.Septs),s.Septs[0].TeachIntelUserCode?s.disabledUpdate=!1:s.Septs.unshift({mark:!0,OpType:2,FollowStatusName:"待确定"})}})},statusReportUpdate:function(){console.log("statusReportUpdate"),this.$router.push({path:"report"})}}},p=r,c=(t("620b"),t("2877")),u=Object(c["a"])(p,e,l,!1,null,"0183a2b8",null);a["default"]=u.exports},"620b":function(s,a,t){"use strict";var e=t("377a"),l=t.n(e);l.a}}]);