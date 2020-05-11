<template>
  <ul class="sidenav app-sidenav collapsible collapsible-accordion" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'sidebar',
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Bill'), url: '/', exact: true },
      { title: localizeFilter('History'), url: '/history' },
      { title: localizeFilter('Planning'), url: '/planning' },
      { title: localizeFilter('Newrecord'), url: '/record' },
      { title: localizeFilter('Categories'), url: '/categories' },
      { title: localizeFilter('Metering'), url: '/metering' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.sidenav li.active {
  a {
    background-color: rgba(215, 213, 213, 0.4);
  }
}
</style>
