/**
 * 用于阻止用户点击系统返回后阻止页面路由自动回退
 */
class LockNativeBack {
  constructor({
    onPopState = () => {} // 导航发生变化，一般是用户点击了系统返回时触发
  } = {}) {
    this.isLocked = false
    this.onPopState = onPopState
    this.handlePopState = this.handlePopState.bind(this)
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
    setTimeout(() => {
      window.removeEventListener('popstate', this.handlePopState)
      window.history.go(-1)
    })
  }

  handlePopState() {
    window.history.pushState(null, null, this.url)
    this.onPopState()
  }
}

export default LockNativeBack

