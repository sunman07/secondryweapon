import axios from 'axios';
import { Toast } from "vant";
const baseUrl = '/h5api/v1/school';
let req = {
    get(url) {
        url = url[0] !== '/' ? baseUrl + url : baseUrl + '/' + url;
        return axios.get(url);
    },

    post(url, params) {
        url = url[0] !== '/' ? baseUrl + url : baseUrl + '/' + url;
        return axios.post(url, JSON.stringify(params));
    },
    put(url, params) {
        url = url[0] !== '/' ? baseUrl + url : baseUrl + '/' + url;
        return axios.put(url, JSON.stringify(params));
    },
    delete(url ) {
        url = url[0] !== '/' ? baseUrl + url : baseUrl + '/' + url;
        return axios.delete(url);
    },

    postJSON({ Router, Method, Body }, url = '/api/staff/interface') {

        return axios.post(url, JSON.stringify({
            Router: Router,
            Method: Method || 'POST',
            Body: JSON.stringify(Body) || "{}"
        })).then(r => {
            const data = r.data;
            if (r.status == 429) {
                Toast("服务器繁忙,请过会重试!");
                return r;
            }
            if (data.FeedbackCode === 1) {
                Toast(`${Router}接口访问失败!`);
            } else {
                return r;
            }
        }).catch(() => {
            Toast('接口访问异常!');
        })
    },
    loadBizCode(code) {
        return req.postJSON({
            Router: '/api/classinfo/parameterinit',
            Method: 'POST',
            Body: {
                parameter: [code]
            }
        });
    }
}

export default req;
