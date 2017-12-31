import { Notification } from 'element-ui'

export const statusIntercept = ({ data }) => {
  if (data.result.toUpperCase() !== 'OK') {
    let message = data.message || 'Unknown Error'
    Notification.error({ message })
    throw new Error(message)
  }
  return data.info
}

export const requestErrorIntercept = error => {
  console.error(error)
  let message = '链接请求出现异常，请检查您的网络设置。'
  Notification.error({ message })
}
