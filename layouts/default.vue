<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/header.vue'

export default {
  name: 'default',
  components: {
    Header
  }
}
</script>
