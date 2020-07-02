import { throttle } from 'lodash'
import Vue from 'vue'

const ImgList = [] // 被懒加载的元素
ImgList.remove = function(item){
  const index = this.indexOf(item)
  if(index>-1)
    this.splice(index, 1)
}
Vue.directive('lazy-src', {
  inserted(el, binding){
    const src = binding.value
    if(inScreen(el))
      el.src = src
    else
      ImgList.push({
        el, src
      })
  },
  unbind(el){
    ImgList.remove(el)
  }
})

// 应该只把较大图片，放到懒加载的队列里，那么，整个屏幕就放不了几张图片，那么对每个图片都单独计算一次 bottomToTop 也没什么大碍
function inScreen(el){
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 视窗顶部到页面顶部
  const bottomToTop = scrollTop + innerHeight // 从视窗底部100px处到页面顶部
  return el.offsetTop < bottomToTop
}

window.addEventListener('scroll', throttle( () => {
  ImgList.slice().forEach( item => {
    const { el, src } = item
    if(!inScreen(el))
      return
    el.src = src
    ImgList.remove(item)
  })
}, 200))