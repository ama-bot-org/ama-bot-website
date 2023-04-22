export default {
  'GET /api/app/user/ai': {
    actionType: 'OK',
    available: 1, //1 代表域名可用，0代表域名不可用
  },
  'POST /api/app/user/email': {
    actionType: 'OK',
    available: 1,
  },
  'POST /api/app/user/create': {
    actionType: true, //注册失败
    message: '', //验证码错误
  },
}
