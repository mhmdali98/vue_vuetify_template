<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12" lg="6" md="6" sm="12">
          <v-card class="text-center pa-4">
            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                <strong class="mb-3 d-inline-block">{{$t('setting.primaryColor')}}</strong>
                <v-row>
                  <v-col cols="12" lg="6" md="6" sm="12" xs="12">
                    <v-color-picker class="ma-2" v-model="color"></v-color-picker>
                  </v-col>
                  <v-col cols="12" lg="6" md="6" sm="12" xs="12">
                    <v-color-picker
                      dot-size="23"
                      hide-canvas
                      hide-inputs
                      hide-mode-switch
                      hide-sliders
                      mode="hexa"
                      show-swatches
                      swatches-max-height="250"
                      v-model="color"
                    ></v-color-picker> </v-col
                ></v-row>
              </v-col> </v-row
          ></v-card>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <v-card class="text-center pa-4">
            <v-row>
              <v-col cols="12" lg="12" md="12" sm="12" xs="12">
                <strong class="mb-3 d-inline-block">{{$t('setting.menuColor')}}</strong>
                <v-row @click="changBar()">
                  <v-col cols="12" lg="6" md="6" sm="12" xs="12">
                    <v-color-picker class="ma-2" v-model="barColorVar"></v-color-picker>
                  </v-col>
                  <v-col cols="12" lg="6" md="6" sm="12" xs="12">
                    <v-color-picker
                      @change="changBar()"
                      dot-size="23"
                      hide-canvas
                      hide-inputs
                      hide-mode-switch
                      hide-sliders
                      mode="hexa"
                      show-swatches
                      swatches-max-height="250"
                      v-model="barColorVar"
                    ></v-color-picker> </v-col
                ></v-row> </v-col
            ></v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="4" md="4" sm="12" xs="12">
          <v-card class="text-center px-4 py-5 mt-4">
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <v-icon class="px-2">mdi-theme-light-dark</v-icon>
                <strong>{{$t('setting.darkMode')}}</strong>
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-switch
                  v-model="$vuetify.theme.dark"
                  class="ma-0 pa-0"
                  color="primary"
                  hide-details
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="12" xs="12">
          <v-card class="text-center mt-4">
            <v-row align="center" no-gutters>
              <v-col cols="auto" class="px-4 py-5">
                <v-icon class="px-2">mdi-palette</v-icon>
                <strong>{{$t('setting.returnTODefaultColor')}}</strong>
              </v-col>
              <v-spacer />
              <v-col cols="auto" class="px-4">
                <v-btn  color="primary" @click="reColor">{{$t('ok')}}</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="12" xs="12">
          <v-card class="text-center px-4 mt-4">
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <v-icon class="px-2">mdi-translate</v-icon>
                <strong>{{$t('setting.lang')}}</strong>
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-radio-group v-model="lang" row class="pt-1" @change="langChang()">
                  <v-radio label="عربي" value="ar"></v-radio>
                  <v-radio label="English" value="en"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
           
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      lang:'ar',
      color: this.$vuetify.theme.themes["light"].primary,
      barColorVar: this.$store.state.barColor,
      scrim: "rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)",
      menu: false,
    };
  },
  created() {
    // console.log(this.$i18n.locale)
  },
  computed: {
    ...mapState(["barColor"]),
  },
  methods: {
    langChang(){
    // console.log(this.$i18n.locale)
    // console.log( this.lang)
    this.$vuetify.rtl = !this.$vuetify.rtl
      this.$i18n.locale = this.lang
    },
    reColor() {
      this.setScrim("#272727");
      this.$vuetify.theme.themes["light"].primary = "#3F51B5";
      this.$vuetify.theme.themes["dark"].primary = "#3F51B5";
    },
    changBar() {
      this.setScrim(this.barColorVar);
    },
    ...mapMutations({
      setScrim: "SET_SCRIM",
    }),
  },
  watch: {
    color(val) {
      this.$vuetify.theme.themes["light"].primary = val;
      this.$vuetify.theme.themes["dark"].primary = val;
    },
    scrim(val) {
      this.$store.commit("SET_SCRIM", val);
    },
  },
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
