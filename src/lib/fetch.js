import axios from 'axios';
import { Toast } from "vant";
let req = {
    postJSON({Router, Method, Body},url = '/api/staff/interface') {
        return axios.post(url, JSON.stringify({
            Router: Router,
            Method: Method || 'POST',
            Body: JSON.stringify(Body) || "{}"
        })).then(r=>{
            const data=r.data;
            console.log("r-status:", r);
            if(r.status==429){
                 Toast("服务器繁忙,请过会重试!");
                 return r;
            }
            if(data.FeedbackCode===1){
                 Toast("接口访问异常!");
            }else{
                return r;
            }
        }).catch(()=>{
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
