(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["detail"],{"28a5":function(t,e,s){"use strict";var a=s("aae3"),i=s("cb7c"),n=s("ebd6"),r=s("0390"),l=s("9def"),o=s("5f1b"),c=s("520a"),u=s("79e5"),d=Math.min,p=[].push,v="split",f="length",m="lastIndex",h=4294967295,_=!u(function(){RegExp(h,"y")});s("214f")("split",2,function(t,e,s,u){var b;return b="c"=="abbc"[v](/(b)*/)[1]||4!="test"[v](/(?:)/,-1)[f]||2!="ab"[v](/(?:ab)*/)[f]||4!="."[v](/(.?)(.?)/)[f]||"."[v](/()()/)[f]>1||""[v](/.?/)[f]?function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!a(t))return s.call(i,t,e);var n,r,l,o=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),d=0,v=void 0===e?h:e>>>0,_=new RegExp(t.source,u+"g");while(n=c.call(_,i)){if(r=_[m],r>d&&(o.push(i.slice(d,n.index)),n[f]>1&&n.index<i[f]&&p.apply(o,n.slice(1)),l=n[0][f],d=r,o[f]>=v))break;_[m]===n.index&&_[m]++}return d===i[f]?!l&&_.test("")||o.push(""):o.push(i.slice(d)),o[f]>v?o.slice(0,v):o}:"0"[v](void 0,0)[f]?function(t,e){return void 0===t&&0===e?[]:s.call(this,t,e)}:s,[function(s,a){var i=t(this),n=void 0==s?void 0:s[e];return void 0!==n?n.call(s,i,a):b.call(String(i),s,a)},function(t,e){var a=u(b,t,this,e,b!==s);if(a.done)return a.value;var c=i(t),p=String(this),v=n(c,RegExp),f=c.unicode,m=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(_?"y":"g"),C=new v(_?c:"^(?:"+c.source+")",m),g=void 0===e?h:e>>>0;if(0===g)return[];if(0===p.length)return null===o(C,p)?[p]:[];var S=0,y=0,U=[];while(y<p.length){C.lastIndex=_?y:0;var x,I=o(C,_?p:p.slice(y));if(null===I||(x=d(l(C.lastIndex+(_?0:y)),p.length))===S)y=r(p,y,f);else{if(U.push(p.slice(S,y)),U.length===g)return U;for(var O=1;O<=I.length-1;O++)if(U.push(I[O]),U.length===g)return U;y=S=x}}return U.push(p.slice(S)),U}]})},"2fdb":function(t,e,s){"use strict";var a=s("5ca1"),i=s("d2c8"),n="includes";a(a.P+a.F*s("5147")(n),"String",{includes:function(t){return!!~i(this,t,n).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},3810:function(t,e,s){t.exports=s.p+"img/user.4fb29c05.jpg"},"42a1":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail"},[s("div",{staticClass:"h-bg",style:{background:t.ReportUnusual.Color}}),s("div",{staticClass:"box",staticStyle:{"margin-top":"-80px"}},[s("div",{staticClass:"header"},[s("img",{staticClass:"icon",attrs:{src:t.UserInfo.Icon,alt:""},on:{error:t.imageLoadOnError}}),s("span",{staticClass:"name"},[t._v(t._s(t.UserInfo.Name))]),s("span",{staticClass:"sex"},[t._v(t._s(t.UserInfo.SexName))]),s("span",{staticClass:"status f-r"},[t._v(t._s(t.ReportUnusual.ConfirmStatusName||"未核实"))])]),s("div",[s("span",{staticClass:"label"},[t._v("学号")]),s("span",{staticClass:"lable value"},[t._v(t._s(t.UserInfo.UserCode))])]),s("div",[s("span",{staticClass:"label"},[t._v("学院")]),s("span",{staticClass:"lable value van-ellipsis"},[t._v(t._s(t.UserInfo.StudentAcademy))])]),s("div",[s("span",{staticClass:"label"},[t._v("班级")]),s("span",{staticClass:"lable value van-ellipsis"},[t._v(t._s(t.UserInfo.ClassName))])])]),s("div",{staticClass:"box"},[s("div",[s("span",{staticClass:"label"},[t._v("当前所在地")]),s("span",{staticClass:"lable value"},[t._v(t._s(t.ReportUnusual.CurrentAddress))])]),s("div",[s("span",{staticClass:"label"},[t._v("监护人")]),s("span",{staticClass:"lable value van-ellipsis"},[t._v(t._s(t.ReportUnusual.GuardianName))]),t._v("\n       \n      "),s("span",{staticClass:"lable value van-ellipsis"},[t._v(t._s(t.ReportUnusual.GuardianPhone))])])]),s("van-panel",{staticStyle:{margin:"auto 20px 95px 20px"},attrs:{title:"上报跟踪"}},[s("van-steps",{attrs:{direction:"vertical"}},t._l(t.Septs,function(e,a){return s("van-step",{key:a},[1==e.OpType?s("div",[s("p",{staticClass:"time"},[t._v(t._s(t.$moment(e.OpTime).format("MM月DD日 HH:mm")))]),s("div",{staticClass:"step-label"},[t._v("学生情况上报")]),s("div",{staticClass:"desc"},[t._v("发生日期: "+t._s(t.$moment(e.SituationDate).format("MM月DD日")))]),s("div",{staticClass:"desc"},[t._v("情况说明: "+t._s(e.SituationStatusNameArrStr))]),e.SituationStatusName.split(",").includes("其他情况")?s("div",{staticClass:"desc"},[t._v("其他情况:"+t._s(e.FollowContent))]):t._e(),s("div",{staticClass:"desc"},[t._v("采取措施: "+t._s(e.SituationMeasureName))])]):t._e(),2==e.OpType?s("div",[s("div",[s("p",[t._v(t._s(t.$moment(e.OpTime).format("MM月DD日 HH:mm")))]),s("div",{staticClass:"step-label"},[s("span",{style:{color:e.Color}},[t._v(t._s(e.FollowStatusName))]),t.code?s("span",[t._v("  辅导员新增上报")]):t._e(),t.code?t._e():s("span",[t._v("  辅导员已核实")])])])]):t._e(),4==e.OpType?s("div",[s("p",[t._v(t._s(t.$moment(e.OpTime).format("MM月DD日 HH:mm")))]),1==e.IsFollowed?s("div",{staticClass:"step-label"},[t._v("老师代上报平安")]):s("div",{staticClass:"step-label"},[t._v("学生上报平安")])]):t._e(),5==e.OpType?s("div",[s("p",[t._v(t._s(t.$moment(e.OpTime).format("MM月DD日")))]),s("div",{staticClass:"step-label"},[t._v("学生未上报")])]):t._e(),6==e.OpType?s("div",[s("p",[t._v(t._s(t.$moment(e.OpTime).format("MM月DD日")))]),s("div",{staticClass:"step-label"},[t._v("辅导员未跟踪")])]):t._e()])}),1)],1),s("div",{staticClass:"footer"},[s("van-button",{staticClass:"submit",attrs:{disabled:t.disabledUpdate,type:"primary",icon:"add-o"},on:{click:t.statusReportUpdate}},[t._v("新增情况上报")])],1)],1)},i=[],n=(s("6762"),s("2fdb"),s("28a5"),s("ac6a"),s("bde3")),r=s("6bc4"),l=s("5880"),o={name:"reportdetail",data:function(){return{RecordID:"",disabledUpdate:!0,name:"",code:"",color:"",Septs:[],CurentSep:{},ReportUnusual:{},IntelUserCode:""}},computed:Object(l["mapState"])(["UserInfo"]),created:function(){var t=this;Object(n["c"])("疫情详情"),this.IntelUserCode=this.$route.query.IntelUserCode||"",this.name=this.$route.query.name||"",this.code=this.$route.query.code||"",this.color=this.$route.query.color||"",console.log("this.color",this.color),console.log("his.$route.query",this.$route.query),Object(r["g"])(this.IntelUserCode).then(function(e){var s=e.data;if(!s.FeedbackCode){var a=s.Data;t.ReportUnusual=a.ReportUnusual||{}}}),this.getFlowList(this.IntelUserCode)},methods:{imageLoadOnError:function(){this.UserInfo.Icon=s("3810")},getFlowList:function(t){var e=this;Object(r["h"])(t).then(function(t){var s=t.data;if(!s.FeedbackCode){var a=s.Data;e.Septs=a||[],console.log("this.Steps",e.Septs),e.Septs.forEach(function(t){if(1==t.OpType){var e=t.SituationStatusName.split(",");e.includes("其他情况")?t.SituationStatusNameArrStr=e.splice(0,e.length-1).join():t.SituationStatusNameArrStr=e.join()}}),e.Septs[0].TeachIntelUserCode&&(e.disabledUpdate=!1)}})},statusReportUpdate:function(){console.log("statusReportUpdate"),this.$router.push({path:"report"})}}},c=o,u=(s("57f6"),s("2877")),d=Object(u["a"])(c,a,i,!1,null,"2d468f64",null);e["default"]=d.exports},5147:function(t,e,s){var a=s("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(s){try{return e[a]=!1,!"/./"[t](e)}catch(i){}}return!0}},"57f6":function(t,e,s){"use strict";var a=s("7700"),i=s.n(a);i.a},6762:function(t,e,s){"use strict";var a=s("5ca1"),i=s("c366")(!0);a(a.P,"Array",{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")("includes")},7700:function(t,e,s){},d2c8:function(t,e,s){var a=s("aae3"),i=s("be13");t.exports=function(t,e,s){if(a(e))throw TypeError("String#"+s+" doesn't accept regex!");return String(i(t))}},ebd6:function(t,e,s){var a=s("cb7c"),i=s("d8e8"),n=s("2b4c")("species");t.exports=function(t,e){var s,r=a(t).constructor;return void 0===r||void 0==(s=a(r)[n])?e:i(s)}}}]);