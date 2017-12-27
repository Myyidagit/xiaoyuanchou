/* 全局变量方法 */
/**
 * 获取API接口调用地址 dev:开发模式 prod:生产环境
 * @param data
 */
const environment = 'dev'
function getApiUrl (data) {
  if (data == undefined || data == '') {
    data = environment
  }
  if (data == 'dev') {
    return 'http://192.168.0.88:5555'
  } else if (data == 'prod') {
    return 'http://api.yijiaoxing.com'
  }
}

// 获取图片上传凭证
function getUploadToken (_this) {
  _this.$axios({
    baseURL: getApiUrl(),
    url: '/global/qiniu/verify/v1/getSimplicityToken',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'user_id': _this.user_id,
      'access_token': _this.access_token
    },
    params: {
      bucket: 'images'
    },
    timeout: 5000,
    withCredentials: false
  }).then(function (response) {
    _this.uploadToken = response.data.data
  }).catch(function (err) {
    console.log(err)
  })
}

// 验证身份

export default{
  getApiUrl,
  getUploadToken
}
