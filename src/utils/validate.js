import Vue from 'vue'
import { POPUP_LOGIN } from '$@/Popups'

export const routeIdentify = (matches, user) => {
  const permission = (access) => {
    if (!access) return true
    if (!user) return false
    return access.includes(user.access)
  }
  for (let matched of matches) {
    let { access } = matched.meta
    if (!permission(access)) {
      let login = new Vue()[POPUP_LOGIN]
      return login()
        .then(() => {
          if (!permission(access)) {
            throw Error('User logged in now, but also not permission')
          }
        })
    }
  }
  return new Promise(resolve => resolve())
}

export const userCheckRules = {
  username: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^[0-9]{11}$/, message: '请输入正确长度的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '请输入8-20位密码', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 20, message: '名字不能超过20位哦', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入 6 位验证码', trigger: 'blur' }
  ]
}

