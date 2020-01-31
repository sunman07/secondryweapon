import axios from 'axios';
import { Toast } from "vant";
let req = {
    postJSON({Router, Method, Body},url = '/api/staff/interface') {
        return axios.post(url, JSON.stringify({
            Router: Router,
            Method: Method || 'POST',
            Body: JSON.stringify(Body) || "{}"
        })).catch(()=>{
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
