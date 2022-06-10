/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 手机号验证
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}
