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
    mini-variant-width="85"
    v-bind="$attrs"
    :color="barColor"
    :class="barColor"
  >
    <v-list-item >
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular">
          <v-row align="center" justify="center">
            <v-col v-if="!expandOnHover" align="center" justify="center" cols="12" md="6">
              <h4>نظام إدارة وأرشفة </h4>
            </v-col>
            <v-col class="text-center">
              <img width="26px" src="../../../../assets/logoSoft.png" />
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="mb-1" />
    <v-list-item two-line>
      <v-list-item-avatar>
        <img
          src="../../../../assets/user.svg"
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>mohammed ali</v-list-item-title>
        <v-list-item-subtitle>user</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider class="mb-1" />
    <v-list nav dense v-for="(item, i) in computedItems" :key="i" shaped :class="$i18n.locale == 'ar'? 'pr-0' : 'pl-0'">
      <v-list-item link :to="item.to" color="primary lighten-1">
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
      },
       {
        icon: "mdi-lan",
        title: "الاقسام",
        to: "/admin/org"
      },
      {
        icon: "mdi-download ",
        title: "الكتب الواردة",
        to: "/admin/inBook"
      },
      {
        icon: "mdi-upload ",
        title: "الكتب الصادرة",
        to: "/admin/outBook"
      },
       {
        icon: "mdi-bulletin-board",
        title: "لوحة الاعلانات",
        to: "/admin/adBoard"
      },
      {
        icon: "mdi-cog",
        title: "الاعدادات",
        to: "/admin/setting"
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
