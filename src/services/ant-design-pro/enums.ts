export enum ActionType {
  OK = 'OK',
}
//1 代表邮箱可用，验证码发送成功，0代表邮箱已经存在，2代表验证码发送失败
export enum CaptchaAvailableResult {
  Available = 1,
  Unavailable = 0,
  SendFail = 2,
}
