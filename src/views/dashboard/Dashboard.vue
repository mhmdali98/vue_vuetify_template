<template>
  <v-container>
    <v-row class="mt-12">
      <v-col cols="12" sm="6" lg="3">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
        
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
         
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
          
        </v-skeleton-loader>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-skeleton-loader :loading="loading" :transition="transition" type="card">
         
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
     
    };
  },
  mounted() {
   
  },
  activated() {
  },
  computed: {
   
  },
  created() {
   
  },

  methods: {
   

  }
};
</script>

<style lang="scss">

</style>
