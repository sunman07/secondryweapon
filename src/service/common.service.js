import http from '../lib/fetch';
const api = "/api/studentsafetyreport/";

/**
 * 获取学校信息
 */
export function getSchoolInfo() {
    return http.postJSON({
        Router: '/api/yxinfofill/getschoollogoandname',
        Method: 'POST',
        Body: {}
    });
}
/**
 * 获取上报类型
 */
export function getBizCode(CodeType='') {
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