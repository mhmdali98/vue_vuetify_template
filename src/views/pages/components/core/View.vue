<template>
  <v-content id="pages" :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'">
    <router-view />
  </v-content>
</template>

<script>
export default {
  name: "PagesCoreView",

  data: () => ({}),

  computed: {}
};
</script>

<style lang="scss">
</style>
