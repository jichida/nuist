const request = require('request');

exports.getIpInfo = (ip,callback) => {
    request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var json = JSON.parse(body);
            console.log(json);
            callback(null,json);
        } else {
            console.error(error);
            callback(error,null);
        }
    });
};
