export enum ActionType {
  OK = 'OK',
  False = 'False',
}
//1 代表邮箱可用，验证码发送成功，0代表邮箱已经存在，2代表验证码发送失败
export enum CaptchaAvailableResult {
  Available = 1,
  Unavailable = 0,
  SendFail = 2,
}

export enum RegisterType {
  Register = 1,
  Login = 0,
}

export enum AuthorityLevel {
  user = 2,
  admin = 1,
}

export enum CheckType {
  Password = 'Password',
  Captcha = 'Captcha',
}

export enum NoticeIconItemType {
  notification = 'notification',
  message = 'message',
  event = 'event',
}
