<template>
  <v-container>
    <v-row class="mt-12">
      <v-col cols="12" sm="4" lg="4">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class=" mb-4">
                  عدد الكتب و المذكرات
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  2
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color="teal lighten-5">
                <v-icon color="teal" x-large>mdi-bookshelf</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="4" lg="4">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class=" mb-4">
                  عدد الاعلانات
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  4
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color="pink  lighten-5">
                <v-icon color="pink " x-large>mdi-bulletin-board</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="4" lg="4">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class=" mb-4">
                  عدد المستخدمين
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  5
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color="indigo lighten-5">
                <v-icon color="indigo" x-large>mdi-account-group</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="12" lg="12">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          <v-card class="mx-auto">
            <v-card-title class="blue-grey white--text">
              <span class="">الاعلانات</span>
              <v-spacer></v-spacer>
              <v-btn outlined color="white" dark depressed @click="openAds">
                كل الاعلانات
              </v-btn>
            </v-card-title>
            <v-card-text class="py-0">
              <v-timeline dense>
                <v-slide-x-reverse-transition group hide-on-leave>
                  <v-timeline-item v-for="item in items" :key="item" color="blue-grey" small fill-dot>
                    <v-alert color="blue-grey lighten-5" icon="mdi-bullhorn-outline " class="">
                     <h2 class="blue-grey--text text--darken-2"> {{ item.title }} </h2>
                     <v-divider class="blue-grey my-2"></v-divider>
                     <p class="blue-grey--text">
                       {{item.desc}}
                     </p>
                    </v-alert>
                  </v-timeline-item>
                </v-slide-x-reverse-transition>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import Axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      items: [
        {
          title: "عطلة رسميه",
          date: "2021-09-12 12:13 AM",
          desc:
            "الاحد القادم المصادف 2021-12-27 عطلة رسميه بماسبة عيد المسيح"
        },
        {
          title: "اجتماع لقسم المحاسبة",
          date: "2021-09-12 12:13 AM",
          desc:
            "يرجى حضور كل موظفي قسم المحاسبة للاجتماع الساعة 3 مساء "
        }
      ]
    };
  },
  mounted() {},
  activated() {},
  computed: {},
  created() {},

  methods: {
    openAds(){
      this.$router.push({
        path: `adBoard`
      });
    
    }
  }
};
</script>

<style lang="scss"></style>
