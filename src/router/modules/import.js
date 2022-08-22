import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  meta: {
    id: 'import', // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
    },
  ],
}
