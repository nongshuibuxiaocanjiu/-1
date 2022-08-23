import permissionPiont from '@/constant/constant/permission'

export default {
  data() {
    return {
      point: permissionPiont,
    }
  },
  methods: {
    isHas(points) {
      return this.$store.state.permission.points.includes(points)
    },
  },
}
