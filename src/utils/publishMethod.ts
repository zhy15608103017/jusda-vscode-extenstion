// @ts-nocheck
import lodash from 'lodash';
import https from 'https';
const apolloUrl = 'http://apollo.jusda.int/svc/configs/frontend-public/juslink-dev/jusda-vscode-extenstion';

export async function getApolloConfig(){
    const apolloData =  fetch(apolloUrl)
        .then(response => {
            // 检查请求是否成功
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // 将响应解析为 JSON
            return response.json();
        })
        .then(data => {
            // 处理从服务器返回的数据
            return data;
        })
        .catch(error => {
            // 处理网络请求错误
            console.error('Fetch error:', error);
        });
    return apolloData;
}

export function apolloConfigDataClean(result){
    return lodash.mapValues(result, (value) => {
        let newValue = JSON.parse(value.replace(/\n/g, ""));
        return newValue;
    });
}

export function getContentByUrl(url) {
	return new Promise((resolve, reject) => {
		// 发送 HTTP GET 请求获取网络上的 JSON 文件
		https.get(url, (res) => {
			let data = '';
			// 将响应的数据拼接到 data 变量中
			res.on('data', (chunk) => {
			data += chunk;
			});

			// 当所有数据接收完毕后，将数据解析为对象并 resolve Promise
			res.on('end', () => {
			try {
				// 将数据解析为对象
				const jsonData = JSON.parse(data);
				resolve(jsonData);
			} catch (parseError) {
				reject(parseError);
			}
			});
		}).on('error', (err) => {
			reject(err);
		});
	});
}
