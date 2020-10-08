<template>
  <v-app-bar absolute app height="60" style="width: auto;" elevation="1">
    <v-btn
      fab
      small
      text
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-toolbar-title class="hidden-sm-and-down pr-5" v-text="$route.name" />
    <v-spacer />
    <v-btn min-width="0" text>
      <v-icon large color="cyan accent-4">mdi-chat-processing</v-icon>
    </v-btn>
    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap>
            <template v-slot:badge>
              <span class="caption">5</span>
            </template>

            <v-icon large color="amber ">mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
    <v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn min-width="0" text v-bind="attrs" v-on="on">
          <v-icon large>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list :tile="false" flat nav>
        <template v-for="(p, i) in profile">
          <v-divider v-if="p.divider" :key="`divider-${i}`" class="mb-2 mt-2" />
          <app-bar-item v-else :key="`item-${i}`" :to="p.to">
            <v-list-item-title v-text="p.title" />
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "DashboardCoreAppBar",
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) =>
              h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              )
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      `You're now friends with Andrew`,
      "Another Notification",
      "Another one"
    ],
    profile: [
      {
        title: "ملفي",
        to: {
          path: "profile"
        }
      },
      {
        title: "اعدادات",
        to: {
          path: "setting"
        }
      },

      // { title: "التواصل", to: "/admin/profile" },
      { divider: true },
      {
        title: "تسجيل الخروج",
        to: {
          name: "Login"
        }
      }
    ]
  }),

  computed: {
    ...mapState(["drawer"])
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
};
</script>
