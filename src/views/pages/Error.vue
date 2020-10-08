<template>
  <v-container class="error-page" fill-height tag="section">
    <v-row class="text-center" justify="center">
      <v-col cols="auto">
        <h1 class="title font-weight-black ">
          404
        </h1>

        <div class="display-3 mb-10 mt-10 blue--text">
          <h2 style="font-size:2rem">الصفحة غير موجودة :(</h2>
        </div>

        <v-btn dark depressed to="/"> العودة الى الرئيسية </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PagesError"
};
</script>

<style lang="sass">
.error-page
  h1
    font-size: 12rem
</style>
