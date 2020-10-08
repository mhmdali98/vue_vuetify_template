<template>
  <v-content :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'">
    <router-view />
  </v-content>
</template>

<script>
export default {};
</script>
