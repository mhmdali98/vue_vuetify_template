<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
    color="barColor"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular">
          <v-row align="center" justify="center">
            <v-col v-if="!expandOnHover" align="center" justify="center" cols="12" md="6">
              <h4>NAME</h4>
            </v-col>
            <v-col class="text-center">
              <img width="48px" src="../../../../assets/logoSoft.png" />
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="mb-1" />
    <v-list-item two-line>
      <v-list-item-avatar>
        <img
          src="https://instagram.fbgw10-1.fna.fbcdn.net/v/t51.2885-15/e35/s320x320/119895866_2804475019652520_1379830073642661297_n.jpg?_nc_ht=instagram.fbgw10-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=uLK4Jdi1UJ4AX86TIv1&_nc_tp=15&oh=05481074cd6467210cbc065f32c16aaa&oe=5FA7AEF7"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>mohammed ali</v-list-item-title>
        <v-list-item-subtitle>user</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="mb-1" />
    <v-list nav dense v-for="(item, i) in computedItems" :key="i">
      <v-list-item link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "الاحصائيات",
        to: "/admin/dashboard"
      },
      {
        icon: "mdi-account",
        title: "المستخدمين",
        to: "/admin/users"
      }
    ]
  }),

  computed: {
    ...mapState(["barColor"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    },
    computedItems() {
      return this.items.map(this.mapItem);
    }
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      };
    }
  }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

</style>
