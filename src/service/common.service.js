import http from "../lib/fetch";

// 校级-院级-班级 一级页面 二级页面 6合1
export function getschoolbackinfo(level, id, type) {
	return http.postJSON({
		Router: '/api/studentncpback/getschoolbackinfo',
		Method: 'POST',
		Body: {
			level: level,
			Id: id,
			usertype: type
		}
	});
}
export function getclasschart(code) {
	return http.postJSON({
		Router: '/api/studentncpback/GetClassBackInfoPie',
		Method: 'POST',
		Body: {
			class: code
		}
	});
}

export function getclassuser(code, i) {
	return http.postJSON({
		Router: '/api/studentncpback/GetClassBackInfoUser',
		Method: 'POST',
		Body: {
			class: code,
			status: i
		}
	});
}
// 学生详情
export function getstudentinfo(code) {
	return http.postJSON({
		Router: '/api/studentncpback/GetStudentInfo',
		Method: 'POST',
		Body: {
			user: code,
		}
	});
}
// 审批进度
export function approval(code) {
	return http.postJSON({
		Router: '/api/studentncpback/GetOldStudentInfo',
		Method: 'POST',
		Body: {
			user: code,
		}
	});
}
// 申请通过
export function adopt(code) {
	return http.postJSON({
		Router: '/api/studentncpback/AgreeApply',
		Method: 'POST',
		Body: {
			user: code,
		}
	});
}
// 申请驳回
export function Reject(code, mess) {
	return http.postJSON({
		Router: '/api/studentncpback/DisAgreeApply',
		Method: 'POST',
		Body: {
			user: code,
			rejectreason: mess
		}
	});
}
// 承诺书
export function promiss() {
	return http.postJSON({
		Router: '/api/studentncpback/GetStudentBackCommitment',
		Method: 'POST',
		Body: {

		}
	});
}
// 告知书
export function notifybook() {
	return http.postJSON({
		Router: '/api/system/getsystemparams',
		Method: 'POST',
		Body: {
			SGroup: 'function',
			SType: 'StudentNCPBack',
			vName: 'Notifi'
		}
	});
}
// 查承诺书签字
export function queryphotourl(u) {
	return http.postJSON({
		Router: '/api/system/queryphotourl',
		Method: 'POST',
		Body: {
			Ids: u,
		}
	});
}
// 历史体温
export function temperature(code, date) {
	return http.postJSON({
		Router: '/api/studentncpback/OldTemperature',
		Method: 'POST',
		Body: {
			user: code,
			date: date
		}
	});
}
// 扫码学生详情
export function getstu(code) {
	return http.postJSON({
		Router: '/api/studentncpback/GetStudentBackQRInfo',
		Method: 'POST',
		Body: {
			user: code
		}
	});
}
// 体温上报 
export function reporttem(code, t) {
	return http.postJSON({
		Router: '/api/studentncpback/PutTemperature',
		Method: 'POST',
		Body: {
			user: code,
			temperature: t
		}
	});
}
// 允许进校
export function permitschool(code) {
	return http.postJSON({
		Router: '/api/studentncpback/AgreeStudentIn',
		Method: 'POST',
		Body: {
			user: code,
		}
	});
}
// 隔离 isolation
export function isolation(code, mess) {
	return http.postJSON({
		Router: '/api/studentncpback/IsolateReason',
		Method: 'POST',
		Body: {
			user: code,
			reason: mess
		}
	});
}
// 扫码返校-搜索
export function SearchStudent(code) {
	return http.postJSON({
		Router: '/api/studentncpback/SearchStudent',
		Method: 'POST',
		Body: {
			user: code
		}
	});
}