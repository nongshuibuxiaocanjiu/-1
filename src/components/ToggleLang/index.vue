<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      语言<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="key === $i18n.locale"
        :command="key"
        v-for="(value, key) in messages"
        :key="key"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    onCommand(val) {
      this.$root.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang',val)
    },
  },
}
</script>

<style scoped lang="scss"></style>
