<template>
  <v-container>
    <v-card class="px-4" flat :loading="loading">
      <v-row>
        <v-col>
          <v-toolbar elevation="0" color=""   outlined>
            <v-toolbar-title>{{bookInfo.topicTitle}}</v-toolbar-title>
            <v-spacer />
            <v-btn @click="back()" color="primary"
              >رجوع
              <v-icon right> mdi-arrow-left </v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
        <p><b>رقم الكتاب :  </b> {{bookInfo.number}}</p>
        <p><b>تاريخ الكتاب : </b> {{bookInfo.creationDate.substr(0, 10) + " | " + bookInfo.creationDate.substr(11, 5)}}</p>
        <p><b>نوع الكتاب/المذكرة : </b> {{bookInfo.bookType}}</p>
        <p><b>الجهة المرسل لها : </b> {{bookInfo.to}}</p>
        <p><b>الجهة الصادر منها : </b> {{bookInfo.from}}</p>
        <p><b>موضوع الكتاب : </b>  {{bookInfo.topicTitle}}</p>
        <!-- <p><b>المرفقات : </b> {{bookInfo.path}}</p> -->
        <v-btn color="primary" outlined @click="openFile()" >فتح المرفق</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
   props: ["id"],

  data() {
    return {
      loading:false,
      desserts:[],
      bookInfo:null
    }
  },
  created() {
    this.getBook()
  },
    methods: {
      openFile(){
        window.open(process.env.VUE_APP_IMG + this.bookInfo.path, '_blank');
      },
       getBook() {
      this.loading = true;
      Axios.get("book")
        .then(res => {
          this.desserts = res.data;
          this.desserts.forEach(e => {
            if (e.id == this.id) {
              this.bookInfo = e
            }
          });
        })
        .catch(() => {
        }).finally(()=>{
          this.loading = false
        })
    },
         back() {
      this.$router.go(-1);
    },
    },
};
</script>

<style></style>
