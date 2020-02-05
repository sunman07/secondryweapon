let timeout = null;
function debounce(fn, wait) {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}
function closeView() {
// eslint-disable-next-line
    antlinker.closeView({
        success: function () {
        },
        fail: function () {

        },

    });
}
function formater(value) {
        if (value.length > 7) {
            return `${value.slice(0, 7)}...`;
        }
        return value;
}
/**
 * 获取基本信息
 * @param callback
 */
function getSChoolCode(callback) {
    // eslint-disable-next-line
    antlinker.getUserBasicInfo({
        success: function(data) {
            callback(data.UniversityID)
            //设置右上角按钮成功
        },
        fail: () => {}
    });
}
/**
 * 获取基本信息
 * @param callback
 */
function getBasicInfo(callback) {
    // eslint-disable-next-line
    antlinker.getUserBasicInfo({
        success: function(data) {
            callback(data)
            //设置右上角按钮成功
        },
        fail: () => {}
    });
}
function setAntTitle(title = '校园集结号') {
    //eslint-disable-next-line
    antlinker.configTitle({
        type: "label",
        title: title,
        fail: () => {
        },
        success: () => {

        }
    })

}

function formatDate(date3, fmt) {
    const date = new Date(date3);
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    console.log(fmt)
    return fmt;
}

export {
  debounce,
  closeView,
  formatDate,
  setAntTitle,
  formater,
  getSChoolCode,
  getBasicInfo
};

