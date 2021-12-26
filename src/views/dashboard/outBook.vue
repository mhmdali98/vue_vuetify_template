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
          <v-toolbar-title>قائمة الكتب والمذكرات الصادرة</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >تصدير كتاب او مذكرة</v-btn
              >
            </template>
            <v-card>
              <v-toolbar dark color="primary lighten-1 mb-5">
                <v-toolbar-title>
                  <h3>تصدير كتاب</h3>
                </v-toolbar-title>
                <v-spacer />
                <v-btn @click="dialog = !dialog" icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="number"
                        label=" رقم الكتاب الصادر"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-select
                        v-model="bookType"
                        :items="perAll"
                        label="اختر نوع الكتاب/المذكر"
                        outlined
                        item-text="name"
                        item-value="id"
                        :rules="[rules.required]"
                      ></v-select>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="from"
                        label=" الجهة المرسل منها"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="to"
                        label=" الجهة المرسل له"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="topicTitle"
                        label="  موضوع الكتاب"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="files"
                        label=" المرفقات"
                        outlined
                        :rules="[rules.required]"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = !dialog">الغاء</v-btn>
                <v-btn :loading="loadSave" color="blue darken-1" text @click="save">حفظ</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import Swal from "sweetalert2";

export default {
  data: () => ({
    show1: false,
    rules: {
      required: value => !!value || "مطلوب",
      min: v => v.length >= 6 || "كلمة المرور يجب ان تتكون من 6 عناصر او اكثر",
      minPhon: v => v.length == 13 || "رقم الهاتف يجب ان يتكون من 11 رقم"
    },
    search: "",
    loading: false,
    loadSave: false,
    dialog: false,
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
    perAll: [
      { id: "كتاب", name: "كتاب" },
      { id: "مذكرة", name: "مذكرة" }
    ],
    number: "",
    bookType: "",
    from: "",
    to: "",
    topicTitle: "",
    fileExtention: "",

    files: "",
    fileBase64: null
  }),

  watch: {
    files: function(newVal, oldVal) {
      if (newVal) {
        this.createBase64Image(newVal);
      } else {
        this.fileBase64 = null;
      }
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    createBase64Image(FileObject) {
      const reader = new FileReader();
      reader.onload = event => {
        this.fileBase64 = event.target.result;
        // console.log(this.fileBase64)
      };
      reader.readAsDataURL(FileObject);
    },
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
    deleteItem(item) {
      //   const index = this.desserts.indexOf(item);
      Swal.fire({
        title: "هل انت متاكد من العملية  ؟ ",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا"
      }).then(result => {
        if (result.value) {
          Axios.delete("users?Id=" + item.id, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.$store.state.idToken
            }
          })
            .then(() => {
              Swal.fire("تم ", "تمت العملية بنجاح", "success");
              this.getBook();
            })
            .catch(() => {
              Swal.fire("لم يتم ", "لم تمت العملية بنجاح", "error");
            });
        }
      });
    },

    save() {
      this.loadSave = true;
      console.log(this.number);
      console.log(this.fileBase64);
      if (this.number && this.from && this.to && this.fileBase64) {
        const data = {
          Number: this.number,
          BookType: this.bookType,
          From: this.from,
          To: this.to,
          TopicTitle: this.topicTitle,
          File: this.fileBase64.substring(this.fileBase64.indexOf(",") + 1),
          FileExtention: this.fileBase64.substring(
            this.fileBase64.indexOf("/") + 1,
            this.fileBase64.lastIndexOf(";")
          )
        };
        Axios.post(`book`, data)
          .then(() => {
            this.loadSave = false;
            this.getBook();
            this.dialog = false;
            Swal.fire({
              title: "تم اضافة الكتاب",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(err => {
            // console.log(err.response.data);
            this.loadSave = false;
            if (err.response.data.code == 400.2) {
              Swal.fire({
                title: "اسم المستخدم موجود",
                text: "",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            } else {
              Swal.fire({
                title: "تاكد من ملى المعلومات",
                text: "",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            }
          });
      } else {
        this.loadSave = false;

        Swal.fire({
          title: "تاكد من ملى المعلومات",
          text: "",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    }
  }
};
</script>

<style></style>
