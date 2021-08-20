## lock-native-back
### 作用
 主要用于移动端监听用户点击系统返回并阻止页面路由自动回退
### 使用场景
 开发移动端h5页面时，我们经常会遇到，在页面内打开一个全屏的弹框的时候，用户点击系统返回键，不是关闭弹框而是返回到了上一个页面的情况。
 针对这种情况，使用本插件可以监听用户点击系统返回并阻止页面路由自动回退，同时做一些事（比如按系统返回关闭弹框）
### 原理
 利用pushState向浏览历史列表中插入当前页面，在点击后退时再插入一次，这样就阻止页面路由自动回退回上一个页面了
### 使用
在vue中使用： （其他框架可以参照着处理）
```javascript
import LockNativeBack from 'lock-native-back'

export default {
  data() {
    return {
      show: false  // 控制弹框开关
    }
  },
  watch: {
    show(val) {
      const lockNativeBack = new LockNativeBack({
        onPopState: () => this.show = false     // 用户点击返回按钮时触发
      })
      if (val) {
        // 打开弹框时
        lockNativeBack.lock()
      } else{
        // 关闭弹框时
        lockNativeBack.unLock()
      }
    }
  }
}
```
### options
- `onPopState` <br/> 
  type: Function
  功能： 导航发生变化，一般是用户点击了系统返回时触发
- `once` <br/>
  type: Boolean
  功能： 是否只阻止一次后就放开，默认 true
