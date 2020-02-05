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
 * 情况上报
 */
export function onStatusReport(params = {}) {
  return http.postJSON({
    Router: `${api}report`,
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
        Router: '/api/system/myhead',
        Method: 'POST',
        Body: { IntelUserCode: IntelUserCode }
    });
}