(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["report"],{"08d1":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"reportform"},[o("div",{staticClass:"h-title"},[t._v("基本信息")]),o("van-cell-group",[o("van-cell",{attrs:{"title-class":"cell-title","value-class":"cell-value",title:"姓名",value:t.UserInfo.Name}}),o("van-cell",{attrs:{"title-class":"cell-title","value-class":"cell-value",title:"学号",value:t.UserInfo.UserCode}}),o("van-cell",{attrs:{"title-class":"cell-title","value-class":"cell-value",title:"手机号",value:t.UserInfo.Phone}})],1),o("div",{staticClass:"h-title"},[t._v("当天实测体温")]),o("div",{staticClass:"tem"},[o("div",{style:{"font-size":"16px","text-align":"center",color:t.temcolor}},[t._v(t._s(t.temdata))]),o("el-slider",{attrs:{marks:t.marks,color:t.temcolor,"show-tooltip":!1,change:t.temp()},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),o("div",{staticClass:"h-title"},[t._v("情况说明（多选）")]),o("van-checkbox-group",{on:{change:t.statusChange},model:{value:t.Statuss,callback:function(e){t.Statuss=e},expression:"Statuss"}},[o("van-cell-group",t._l(t.HealthStatuss,function(e,n){return o("van-cell",{key:n},[o("van-checkbox",{attrs:{"checked-color":"#FBB200",name:e.Code}},[t._v(t._s(e.Name))])],1)}),1),t.otherFlag?o("van-field",{attrs:{rows:"4",autosize:"",type:"textarea",maxlength:"200",placeholder:"请填写详细情况，必填","show-word-limit":""},model:{value:t.form.ReportContent,callback:function(e){t.$set(t.form,"ReportContent",e)},expression:"form.ReportContent"}}):t._e()],1),o("div",{staticClass:"h-title"},[t._v("以上情况发生的日期")]),o("van-cell-group",[o("van-cell",{attrs:{"is-link":""},on:{click:function(e){t.dateShow=!0}}},[o("div",[t._v(t._s(t.form.SituationDate||"请选择日期"))])])],1),o("div",{staticClass:"h-title"},[t._v("已采取措施")]),o("van-radio-group",{on:{change:t.MeasureChange},model:{value:t.form.SituationMeasure,callback:function(e){t.$set(t.form,"SituationMeasure",e)},expression:"form.SituationMeasure"}},[o("van-cell-group",t._l(t.SituationMeasures,function(e,n){return o("van-cell",{key:n},[o("van-radio",{attrs:{"checked-color":"#FBB200",name:e.Code}},[t._v(t._s(e.Name))])],1)}),1)],1),o("div",{staticClass:"h-title"},[t._v("其他信息")]),o("van-cell-group",{staticStyle:{"margin-bottom":"100px"}},[o("van-cell",{attrs:{"title-class":"cell-title","value-class":"cell-value",title:"当前所在地"}},[[o("div",{attrs:{slot:"default"},slot:"default"},[t._v("\n          "+t._s(t.form.CurrentAddress)+"\n          "),o("span",{staticClass:"update f-r",on:{click:function(e){t.areaShow=!0}}},[t._v("修改")])])]],2),o("van-field",{staticClass:"field",attrs:{label:"监护人",maxlength:"10",placeholder:"请输入监护人姓名，必填"},model:{value:t.form.GuardianName,callback:function(e){t.$set(t.form,"GuardianName",e)},expression:"form.GuardianName"}}),o("van-field",{staticClass:"field",attrs:{label:"监护人电话",type:"tel",maxlength:"16",placeholder:"请输入监护人电话，必填"},model:{value:t.form.GuardianPhone,callback:function(e){t.$set(t.form,"GuardianPhone",e)},expression:"form.GuardianPhone"}})],1),o("div",{staticClass:"footer"},[o("van-button",{staticClass:"submit",attrs:{disabled:t.disabledSubmit,type:"primary"},on:{click:t.statusReport}},[t._v("确定上报")])],1),o("van-number-keyboard",{attrs:{show:t.numShow,"close-button-text":"完成"},on:{blur:function(e){t.numShow=!1}},model:{value:t.form.phone,callback:function(e){t.$set(t.form,"phone",e)},expression:"form.phone"}}),o("van-popup",{style:{height:"40%"},attrs:{position:"bottom",title:"当前所在地"},model:{value:t.areaShow,callback:function(e){t.areaShow=e},expression:"areaShow"}},[o("van-area",{attrs:{"area-list":t.areaList},on:{cancel:function(e){t.areaShow=!1},confirm:t.selectArea}})],1),o("van-popup",{style:{height:"40%"},attrs:{position:"bottom",title:"发生日期"},model:{value:t.dateShow,callback:function(e){t.dateShow=e},expression:"dateShow"}},[o("van-datetime-picker",{attrs:{type:"date","min-date":t.minDate,"max-date":t.maxDate,formatter:t.formatter},on:{cancel:function(e){t.dateShow=!1},confirm:t.selectDate},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}})],1)],1)},r=[],a=(o("8e6e"),o("456d"),o("a481"),o("85f2")),i=o.n(a);function s(t,e,o){return e in t?i()(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o("7514"),o("ac6a"),o("c5f6");var c=o("bde3"),u=o("60a1"),l=o("6bc4");function f(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function d(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?f(o,!0).forEach(function(e){s(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):f(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var h={name:"report",data:function(){return{numShow:!1,areaShow:!1,dateShow:!1,areaList:u["a"],Statuss:[],HealthStatuss:[],SituationMeasures:[],aggree:!1,disabledSubmit:!1,otherFlag:!1,UserInfo:{},IntelUserCode:"",name:"",code:"",color:"",form:{CurrentAddress:"",GuardianName:"",GuardianPhone:"",HealthStatus:"",SituationStatus:"",ReportContent:"",SituationDate:"",SituationMeasure:"",Temperature:""},minDate:new Date(2019,8),maxDate:new Date,currentDate:new Date,value2:0,marks:{15:"37°C",30:"37.3°C",60:"38°C",85:"39°C"},temdata:"",temcode:"",temcolor:"",bizColor:Number,repsub:""}},created:function(){var t=this;this.IntelUserCode=this.$route.query.IntelUserCode||"",this.name=this.$route.query.name||"",this.code=this.$route.query.code||"",this.color=this.$route.query.color||"",console.log("this.IntelUserCode",this.IntelUserCode),console.log("this.code",this.code),Object(c["c"])("上报疫情"),Object(l["k"])("StudentReportUnusualHealthStatus").then(function(e){var o=e.data;if(!o.FeedbackCode){var n=o.Data;t.HealthStatuss=n||[]}}),Object(l["k"])("StudentRNFollowSituationMeasures").then(function(e){var o=e.data;if(!o.FeedbackCode){var n=o.Data;t.SituationMeasures=n||[]}}),this.IntelUserCode?Object(l["m"])(this.IntelUserCode).then(function(e){var o=e.data;o.FeedbackCode||(t.UserInfo=o.Data||{},t.$store.commit("saveUserInfo",o.Data))}):(console.log(this.$store),this.UserInfo=this.$store.state.UserInfo)},methods:{formatter:function(t,e){return"year"===t?"".concat(e,"年"):"month"===t?"".concat(e,"月"):"day"===t?"".concat(e,"日"):e},selectDate:function(t){console.log(t),this.form.SituationDate=Object(c["b"])(t,"yyyy-MM-dd"),this.dateShow=!1},selectArea:function(t){console.log(t),t[2]?(this.form.CurrentAddress="".concat(t[0].name).concat(t[1].name).concat(t[2].name),this.form.CurrentAddressCode=t[2]):(this.form.CurrentAddress="".concat(t[0].name).concat(t[1].name),this.form.CurrentAddressCode=t[1]),this.areaShow=!1},confirm:function(t){this.disabledSubmit=!t},temp:function(){this.value2>0&&this.value2<15?(this.temdata="< 37°C",this.form.Temperature="1",this.temcolor="#67c23a"):this.value2>=15&&this.value2<30?(this.temdata="37°C ～ 37.3°C",this.form.Temperature="2",this.temcolor="#fbb200"):this.value2>=30&&this.value2<60?(this.temdata="37.3°C ~ 38°C",this.form.Temperature="3",this.temcolor="#fb9700"):this.value2>=60&&this.value2<85?(this.temdata="38°C ~ 39°C",this.form.Temperature="4",this.temcolor="#fb5100"):this.value2>=85&&this.value2<=100?(this.temdata="> 39°C",this.form.Temperature="5",this.temcolor="#ee0a24"):(this.temdata="请选择体温",this.temcolor="#ee0a24",this.form.Temperature=""),console.log(this.form.Temperature),console.log(this.temdata)},statusChange:function(t){var e=this,o=[];t.forEach(function(t){var n=e.HealthStatuss.find(function(e){return e.Code==t});o.push(n)}),o.find(function(t){return"其他情况"==t.Name})?this.otherFlag=!0:this.otherFlag=!1,this.form.SituationStatus=t.join(),console.log("statusChange",t),console.log("this.form.SituationStatus",this.form.SituationStatus)},MeasureChange:function(t){this.form.SituationMeasure=t},checkPhone:function(t){return/^1[3-9]\d{9}$/.test(t)},statusReport:function(){var t=this;if(this.form.Temperature)if(this.form.SituationStatus)if(this.form.SituationDate)if(this.form.SituationMeasure)if(this.form.CurrentAddress)if(this.form.GuardianName.trim())if(this.form.GuardianPhone.trim())if(this.checkPhone(parseInt(this.form.GuardianPhone)))if(this.form.CurrentAddress)if(!this.otherFlag||this.form.ReportContent.trim()){var e=d({},this.form);e.IntelUserCode=this.IntelUserCode||"",delete e.CurrentAddressCode,console.log("form",e),this.code?this.$dialog.confirm({title:"提示",confirmButtonText:"确定",confirmButtonColor:"#FBB200",message:"确定为".concat(this.UserInfo.Name,"提交情况上报吗？")}).then(function(){Object(l["o"])(e).then(function(e){var o=e.data;o.FeedbackCode||(t.$toast(o.FeedbackText),console.log("this.code",t.code),t.createFollowForUnusual(t.code))})}):this.$dialog.confirm({title:"提示",confirmButtonText:"立即上报",confirmButtonColor:"#FBB200",message:"该信息会推送给学校老师，请确认是要上报吗？"}).then(function(){Object(l["o"])(e).then(function(e){var o=e.data;o.FeedbackCode||(t.$toast(o.FeedbackText),t.$router.replace({path:"reportdetail",query:{IntelUserCode:t.IntelUserCode}}))})}).catch(function(){})}else this.$toast("请填写详细信息!");else this.$toast("请选择当前所在地!");else this.$toast("监护人电话格式不正确!");else this.$toast("请填写监护人电话!");else this.$toast("请填写监护人姓名!");else this.$toast("请选择当前所在地!");else this.$toast("已采取措施是必选的!");else this.$toast("情况发生日期是必填的!");else this.$toast("情况说明是必选的!");else this.$toast("请选择体温!")},createFollowForUnusual:function(t){var e=this,o={intel_user_code:this.IntelUserCode,status_code:t,follow_content:""};Object(l["i"])(o).then(function(){e.$router.replace({path:"reportdetail",query:{IntelUserCode:e.IntelUserCode,name:e.name,code:e.code,color:e.color}})})}}},m=h,p=(o("d8a3"),o("2877")),v=Object(p["a"])(m,n,r,!1,null,"48164a26",null);e["default"]=v.exports},"0f89":function(t,e,o){var n=o("6f8a");t.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},"12fd":function(t,e,o){var n=o("6f8a"),r=o("da3c").document,a=n(r)&&n(r.createElement);t.exports=function(t){return a?r.createElement(t):{}}},2621:function(t,e){e.f=Object.getOwnPropertySymbols},"2ea1":function(t,e,o){var n=o("6f8a");t.exports=function(t,e){if(!n(t))return t;var o,r;if(e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;if("function"==typeof(o=t.valueOf)&&!n(r=o.call(t)))return r;if(!e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},"3adc":function(t,e,o){var n=o("0f89"),r=o("a47f"),a=o("2ea1"),i=Object.defineProperty;e.f=o("7d95")?Object.defineProperty:function(t,e,o){if(n(t),e=a(e,!0),n(o),r)try{return i(t,e,o)}catch(s){}if("get"in o||"set"in o)throw TypeError("Accessors not supported!");return"value"in o&&(t[e]=o.value),t}},"43c8":function(t,e){var o={}.hasOwnProperty;t.exports=function(t,e){return o.call(t,e)}},"456d":function(t,e,o){var n=o("4bf8"),r=o("0d58");o("5eda")("keys",function(){return function(t){return r(n(t))}})},"5eda":function(t,e,o){var n=o("5ca1"),r=o("8378"),a=o("79e5");t.exports=function(t,e){var o=(r.Object||{})[t]||Object[t],i={};i[t]=e(o),n(n.S+n.F*a(function(){o(1)}),"Object",i)}},"6f8a":function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},"7d95":function(t,e,o){t.exports=!o("d782")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"85f2":function(t,e,o){t.exports=o("ec5b")},"8ce0":function(t,e,o){var n=o("3adc"),r=o("f845");t.exports=o("7d95")?function(t,e,o){return n.f(t,e,r(1,o))}:function(t,e,o){return t[e]=o,t}},"8e6e":function(t,e,o){var n=o("5ca1"),r=o("990b"),a=o("6821"),i=o("11e9"),s=o("f1ae");n(n.S,"Object",{getOwnPropertyDescriptors:function(t){var e,o,n=a(t),c=i.f,u=r(n),l={},f=0;while(u.length>f)o=c(n,e=u[f++]),void 0!==o&&s(l,e,o);return l}})},"990b":function(t,e,o){var n=o("9093"),r=o("2621"),a=o("cb7c"),i=o("7726").Reflect;t.exports=i&&i.ownKeys||function(t){var e=n.f(a(t)),o=r.f;return o?e.concat(o(t)):e}},a47f:function(t,e,o){t.exports=!o("7d95")&&!o("d782")(function(){return 7!=Object.defineProperty(o("12fd")("div"),"a",{get:function(){return 7}}).a})},a7d3:function(t,e){var o=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=o)},bc25:function(t,e,o){var n=o("f2fe");t.exports=function(t,e,o){if(n(t),void 0===e)return t;switch(o){case 1:return function(o){return t.call(e,o)};case 2:return function(o,n){return t.call(e,o,n)};case 3:return function(o,n,r){return t.call(e,o,n,r)}}return function(){return t.apply(e,arguments)}}},d13f:function(t,e,o){var n=o("da3c"),r=o("a7d3"),a=o("bc25"),i=o("8ce0"),s=o("43c8"),c="prototype",u=function(t,e,o){var l,f,d,h=t&u.F,m=t&u.G,p=t&u.S,v=t&u.P,b=t&u.B,C=t&u.W,y=m?r:r[e]||(r[e]={}),S=y[c],g=m?n:p?n[e]:(n[e]||{})[c];for(l in m&&(o=e),o)f=!h&&g&&void 0!==g[l],f&&s(y,l)||(d=f?g[l]:o[l],y[l]=m&&"function"!=typeof g[l]?o[l]:b&&f?a(d,n):C&&g[l]==d?function(t){var e=function(e,o,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,o)}return new t(e,o,n)}return t.apply(this,arguments)};return e[c]=t[c],e}(d):v&&"function"==typeof d?a(Function.call,d):d,v&&((y.virtual||(y.virtual={}))[l]=d,t&u.R&&S&&!S[l]&&i(S,l,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},d782:function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},d8a3:function(t,e,o){"use strict";var n=o("f181"),r=o.n(n);r.a},da3c:function(t,e){var o=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=o)},e341:function(t,e,o){var n=o("d13f");n(n.S+n.F*!o("7d95"),"Object",{defineProperty:o("3adc").f})},ec5b:function(t,e,o){o("e341");var n=o("a7d3").Object;t.exports=function(t,e,o){return n.defineProperty(t,e,o)}},f181:function(t,e,o){},f1ae:function(t,e,o){"use strict";var n=o("86cc"),r=o("4630");t.exports=function(t,e,o){e in t?n.f(t,e,r(0,o)):t[e]=o}},f2fe:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},f845:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}}}]);