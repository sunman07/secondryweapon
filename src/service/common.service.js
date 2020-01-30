import http from '../lib/fetch';

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
 * 获取学生数据
 */
export function studentBigdata() {
    return http.postJSON({
        Router: '/api/bigdata/studentbigdata',
        Method: 'POST',
        Body: {}
    });
}
/**
 * 获取教职工数据
 */
export function staffBigdata() {
    return http.postJSON({
        Router: '/api/bigdata/staffbigdata',
        Method: 'POST',
        Body: {}
    });
}