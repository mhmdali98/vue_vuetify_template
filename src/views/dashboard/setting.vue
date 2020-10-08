<template>
  <v-container fluid>
    <v-layout column>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6" md="6" sm="12" xs="12">
          <v-card class="text-center pa-4">
            <strong class="mb-3 d-inline-block">اللون الرئيسي</strong>

            <v-item-group v-model="color">
              <v-item v-for="color in colors" :key="color" :value="color">
                <template v-slot="{ active, toggle }">
                  <v-avatar
                    :class="active && 'v-settings__item--active'"
                    :color="color"
                    class="v-settings__item mx-1"
                    size="25"
                    @click="toggle"
                  />
                </template>
              </v-item>
            </v-item-group>
            <v-divider class="my-4" />

            <v-row align="center" no-gutters>
              <v-col cols="auto">الوضع الليلي</v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-switch
                  v-model="$vuetify.theme.dark"
                  class="ma-0 pa-0"
                  color="secondary"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      color: "#3F51B5",
      colors: [
        "#9C27b0",
        "#00CAE3",
        "#3F51B5",
        "#4CAF50",
        "#009688",
        "#ff9800",
        "#E91E63",
        "#FF5252"
      ],
      scrim: "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
      scrims: [
        "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
        "rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)",
        "rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)"
      ],
      menu: false
    };
  },
  watch: {
    color(val) {
      this.$vuetify.theme.themes[this.isDark ? "dark" : "light"].primary = val;
    },
    scrim(val) {
      this.$store.commit("SET_SCRIM", val);
    }
  }
};
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #111 !important
</style>
