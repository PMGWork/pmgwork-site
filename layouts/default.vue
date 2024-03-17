<template>
  <div>
    <Stalker />
    <Header />
    <nuxt />
  </div>
</template>

<script>
import Stalker from "~/components/stalker.vue";
import Header from "~/components/header.vue";

export default {
  name: "default",
  components: {
    Stalker, Header
  },
};
</script>
