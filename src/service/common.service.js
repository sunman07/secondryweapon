import http from "../lib/fetch";
import axios from '@/lib/fetch';
const baseLink = '/secondclassroom'

//学生成绩查看

export function getStudentsAchievement(params) {
	return axios
		.get(baseLink + `/api/v1/stuoperate/stutranscript?${params.Types}=${params.Codes}`, params)
		.then(res => {
			return res;
		});
}

//学生积分详情查看 
export function getStudentsScoreDetailed(params) {
	return axios
		.get(baseLink + `/api/v1/stuoperate/stuintegral?Page=${params.Page}&PageCount=${params.PageCount}&${params.Types}=${params.Codes}`, params)
		.then(res => {
			return res;
		});
}

//获取学年学期 h5api/v1/school/core/api/v1/bizcode
export function getTermSum(params) {
	return axios
		.get(`/core/api/v1/bizcode?code_type=${params}`)
		.then(res => {
			return res;
		});
}

//提交学分兑换
export const getDictionaryInfo = () => {
	return axios
		.post(baseLink + `/api/v1/stuoperate/scoreapplication`, {
			ModuleCode: "123",
			ItemCode: "456",
			StandardCode: "789",
			ParticipateDate: "2020-06-03",
			Description: "描述",
			Evidence: "ue83r92ru283"
		})
		.then(res => {
			return res;
		});
};

// 获取模块字典
export function getModuleDic() {
	return axios.get(`/core/api/v1/bizcode?code_type=secondclass`).then(res => {
		return res
	});
}
//获取项目字典
export function getObjectDic() {
	return axios.get(baseLink + `/api/v1/standard/queryitemnopag`).then(res => {
		return res
	});
}
//获取标准字典
export function getStandardsDic() {
	return axios.get(baseLink + `/api/v1/standard/querystandardnopag`).then(res => {
		return res;
	});
}
//成绩申请 
export function getApplyForAchievement(params) {
	return axios
		.post(baseLink + `/api/v1/stuoperate/scoreapplication`, params)
		.then(res => {
			return res;
		});
}
//班委老师查成绩 /api/v1/scoreapprove/queryscoreapprove
export function getStudentsScoreInfo(params) {
	return axios
		.get(baseLink + `/api/v1/scoreapprove/queryscoreapprove?Page=${params.Page}&PageCount=${params.PageCount}&ApprovalStatus=${params.ApprovalStatus}`)
		.then(res => {
			return res;
		});
}
// 班委和老师审批成绩 
export function getApproveOfScore(params) {
	return axios
		.post(baseLink + `/api/v1/scoreapprove/approvescore`, params)
		.then(res => {
			return res;
		});
}
  //审批记录
  export function getRecordOfApprove(params) {
	return axios
		.get(baseLink + `/api/v1/scoreapprove/getscore?RecordId=${params}`)
		.then(res => {
			return res;
		});
}
//文件上传
// 获取上传接口需要的token
export function queryUpToken(name, size){
	return http.postJSON({
		Router: '/api/fproof/appget',
		Method: 'POST',
		Body: {
			Name: name,
			Size: size,
			BizType: 'act',
		}
	});
    
  }

  
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
