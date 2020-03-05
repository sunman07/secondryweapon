import http from "../lib/fetch";
const api = "/api/studentsafetyreport/";

/**
 * 获取学校信息
 */
export function getSchoolInfo() {
  return http.postJSON({
    Router: "/api/yxinfofill/getschoollogoandname",
    Method: "POST",
    Body: {}
  });
}
/**
 * 获取上报类型
 */
export function getBizCode(CodeType = "") {
  return http.postJSON({
    Router: "/api/system/bizcode",
    Method: "POST",
    Body: { CodeType }
  });
}
/**
 * 获取头部数据
 */
export function QueryReportTopStatistics() {
  return http.postJSON({
    Router: `${api}queryreporttopstatistics`,
    Method: "POST",
    Body: {}
  });
}

/**
 * 上报平安
 */
export function onReport(params = {}) {
  return http.postJSON({
    Router: `${api}report`,
    Method: "POST",
    Body: params
  });
}
/**
 * 检查是否需要上报平安
 */
export function CheckIsNeedSafeReport(IntelUserCode = "") {
  return http.postJSON({
    Router: `${api}checkisneedsafereport`,
    Method: "POST",
    Body: { IntelUserCode }
  });
}
/**
 * 情况上报
 */
export function onStatusReport(params = {}) {
  return http.postJSON({
    Router: `${api}reportunusual`,
    Method: "POST",
    Body: params
  });
}
/**
 * 老师更改学生状态上报
 */
export function createFollowForUnusual(params = {}) {
         return http.postJSON({
           Router: `/api/reportsafety2020/createfollowforunusual`,
           Method: "POST",
           Body: params
         });
       }
/**
 * 获取最新上报
 */
export function QueryLastReport(params = {}) {
  return http.postJSON({
    Router: `${api}querylastreport`,
    Method: "POST",
    Body: params
  });
}
/**
 * 获取最新 情况上报
 */
export function QueryStudentReportUnusual(IntelUserCode = '') {
         return http.postJSON({
           Router: `${api}querystudentrufollow`,
           Method: "POST",
           Body: { IntelUserCode }
         });
       }
/**
 * 获取时间线
 */
export function TimeLine(UID = '') {
         return http.postJSON({
           Router: `${api}timeline`,
           Method: "POST",
           Body: { UID }
         });
       }
/**
 * 获取是否上报过
 */
export function CheckIsRu() {
  return http.postJSON({
    Router: `${api}checkisru`,
    Method: "POST",
    Body: {}
  });
}
/**
 * 获取班级上报
 */
export function QueryClassReportStudent(params = {}) {
  return http.postJSON({
    Router: `/api/reportsafety2020/querystudents`,
    Method: "POST",
    Body: params
  });
}
/**
 * 获取班级情况上报数目
 */
export function ClassTodayStatistics(params = {}) {
  return http.postJSON({
    Router: `${api}classtodaystatistics`,
    Method: "POST",
    Body: params
  });
}
/**
 * 获取累计数目
 */
export function ClassCumulativeStatistics(params = {}) {
  return http.postJSON({
    Router: `${api}classcumulativestatistics`,
    Method: "POST",
    Body: params
  });
}
/**
 * 获取学生状态
 */
export function QueryStudentStatus(uid = '') {
         return http.postJSON({
           Router: `/api/bigdata/querystudentstatus`,
           Method: "POST",
           Body: {uid}
         });
       }
/**
 * 获取配置
 */
export function getConfig() {
  return http.postJSON(
    {
      Router: "/app/client/config",
      Method: "POST",
      Body: {
        DEVICETYPE: "Web",
        DEVICEID: "Web",
        VERSION: "1.1"
      }
    },
    "/api/appsrv/interface"
  );
}
/**
 * 获取用户信息
 */
export function getUserInfo(IntelUserCode = "") {
  return http.postJSON({
    Router: "/api/system/myhead",
    Method: "POST",
    Body: { IntelUserCode: IntelUserCode }
  });
}

/**
 * 获取用户信息
 */
export function getAddress() {
  return http.postJSON({
    Router: `${api}getstudentsafetyreportunique`,
    Method: "POST",
    Body: {}
  });
}