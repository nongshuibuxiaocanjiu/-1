import store from '@/store'
// 定义自定义指令
export const imgError = {
  //  当绑定得元素插入到DOM中时 触发
  // 令 绑定得元素插入到dom得时候，图片数据还没请求回来
  inserted: function (el, { value }) {
    // 监听dom img 图片加载失败的事件
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定得元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
}

export const isHas = {
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  },
}
