export {
  qff,
  dateFormat
}
from '../utils/index.js'

// 手机号加密
export function formatPhone(value) {
  if (!value) return value;
  const start = value.substr(0, 3)
  const end = value.substr(-4)
  return start + '***' + end
}
// 中间...
export function encryption(value) {
  if (!value) return value;
  const start = value.substr(0, 6)
  const end = value.substr(-6)
  return start + '……' + end
}
// 开头...
export function startEncryption(value) {
  if (!value) return value;
  const start = value.substr(0, 6)
  return start + '…'
}
