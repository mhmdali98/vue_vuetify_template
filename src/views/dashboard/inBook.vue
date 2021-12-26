<template>
  <v-container id="dashboard" fluid tag="section">
    <v-text-field
      class="mt-4"
      label="اكتب للبحث"
      outlined
      append-icon="mdi-magnify"
      v-model="search"
    ></v-text-field>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="desserts"
      sort-by="phone"
      class="elevation-1"
      :loading="loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>قائمة الكتب والمذكرات الواردة</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
      
        </v-toolbar>
      </template>
      <template v-slot:item.creationDate="{ item }">
        {{ item.creationDate.substr(0, 10) + " | " + item.creationDate.substr(11, 5) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              class="ml-5"
              @click="showBook(item)"
              v-if="!item.isDeleted"
              v-bind="attrs"
              v-on="on"
              >mdi-eye</v-icon
            >
          </template>
          <span>معاينة</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">اعادة تحميل</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
  data: () => ({
    show1: false,
    search: "",
    loading: false,
    headers: [
      {
        text: " رقم الكتاب الصادر",
        align: "start",
        value: "number"
      },
      { text: "موضوع الكتاب", value: "topicTitle" },
      { text: "مرسل من", value: "from" },
      { text: "الجهة المرسل له", value: "to" },
      { text: "  تاريخ الكتاب الصادر", value: "creationDate" },
      { text: " نوع الكتاب/المذكرة", value: "bookType" },
      { text: "العمليات", value: "actions", sortable: false }
    ],
    desserts: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
 
    showBook(i) {
      this.$router.push({
        path: `showBook/${i.id}`,
        params: {
          id: i.id
        }
      });
    },
    getBook() {
      this.loading = true;
      Axios.get("book")
        .then(res => {
          this.loading = false;
          this.desserts = res.data;
          // console.log(res.data);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    initialize() {
      this.getBook();
    },
  }
};
</script>

<style></style>
