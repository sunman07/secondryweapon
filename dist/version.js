var version = '1.0.7';
var key = 'm_safereport';
var HistoryVersion = localStorage.getItem(key);
function clear() {
    // eslint-disable-next-line
    antlinker && antlinker.clearWebViewCache({
        success: function () {
            window.location.reload();
          /*  navigator.serviceWorker&&navigator.serviceWorker.getRegistrations()
                .then(function(registrations) {
                    console.log('执行卸载')
                    for(let registration of registrations) {
                        registration.unregister();
                    }
                });
*/
        },
        fail: function () {
           // alert('执行失败!')
        }
    });
}
if (HistoryVersion) {
    if (version > HistoryVersion) {
       // alert('新版本-更新!');
        clear();
        //window.location.reload();
        localStorage.setItem(key, version);
    }
} else {
    //alert('第一次-加载!');
    localStorage.setItem(key, version);
    clear();
}
