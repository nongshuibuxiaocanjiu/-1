import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
const components = [PageTools, UploadExcel, UploadImg]
export default {
  install(Vue) {
    // 循环，可以让以后组件不需要 注册，只需要往components 数组里添加  就可以使用了
    components.forEach((component) => {
      Vue.component(component.name, component)
    })

    //   Vue.component('PageTools', PageTools)
  },
}
