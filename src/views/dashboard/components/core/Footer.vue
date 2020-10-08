<template>
  <v-footer id="dashboard-core-footer">
    <v-container>
      <v-row align="center" no-gutters>
        <v-col v-for="(link, i) in links" :key="i" class="text-center mb-sm-0 mb-5" cols="auto">
          <a :href="link.href" class="mr-0" rel="noopener" target="_blank" v-text="link.text" />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2020, made with
            <v-icon size="18">mdi-heart</v-icon>by
            <a href="#">Mohammed ali</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",
  data: () => ({
    links: [
      {
        href: "#",
        text: "About Us"
      }
    ]
  })
};
</script>

<style lang="scss">
</style>
