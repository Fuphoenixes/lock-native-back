/**
 * 用于阻止用户点击系统返回后阻止页面路由自动回退
 */
class LockNativeBack {
  constructor({
    onPopState = () => {}, // 导航发生变化，一般是用户点击了系统返回时触发
    once = true // 是否只阻止一次后就放开
  } = {}) {
    this.isLocked = false
    this.once = once
    this.onPopState = onPopState
  }

  lock() {
    if (this.isLocked) return
    this.isLocked = true
    this.url = window.location.href
    window.history.pushState(null, null, this.url)
    window.addEventListener('popstate', this.handlePopState)
  }

  unLock() {
    if (!this.isLocked) return
    this.isLocked = false
    window.removeEventListener('popstate', this.handlePopState)
    window.history.go(-1)
  }

  handlePopState = () => {
    window.history.pushState(null, null, this.url)
    if (this.once) {
      this.unLock()
    }
    this.onPopState()
  }
}

export default LockNativeBack

