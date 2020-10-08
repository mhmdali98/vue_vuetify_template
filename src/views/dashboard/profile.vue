<template>
  <v-container fluid>
    <v-layout column>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6" md="6" sm="12" xs="12">
          <v-card class="text-center">
            <v-card-text>
              <v-flex class="mb-4">
                <v-avatar size="120" class="mr-4">
                  <!-- <img src="../../assets/logo.svg" alt="Avatar" /> -->
                  <avataaars></avataaars>
                </v-avatar>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{ name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ per }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="secondary" :loading="loading" @click.native="dialog = true">
                تغيير كلمة المرور
                <v-icon left dark>mdi-lock-question</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-toolbar dark color="primary lighten-1 mb-5">
            <v-toolbar-title>
              <h3>تغيير كلمة المرور</h3>
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
                    v-model="password"
                    label="كلمة المرور الجديدة"
                    outlined
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">الغاء</v-btn>
            <v-btn :loading="loadSave" color="blue darken-1" text @click="save">حفظ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import Avataaars from "vuejs-avataaars";
import Axios from "axios";
import Swal from "sweetalert2";
export default {
  pageTitle: "My Profile",
  components: {
    Avataaars
  },
  data() {
    return {
      show1: false,
      rules: {
        required: value => !!value || "مطلوب",
        min: v => v.length >= 6 || "كلمة المرور يجب ان تتكون من 6 عناصر او اكثر"
      },
      password: "",
      dialog: false,
      name: "",
      per: "",
      loading: false,
      loadSave: false
    };
  },
  methods: {
    save() {
      if (this.password) {
        Axios.put(
          "account/editpassword?Id=" + this.$store.state.userId,
          {
            password: this.password
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + this.$store.state.idToken
            }
          }
        )
          .then(() => {
            this.loadSave = false;
            Swal.fire({
              title: "تم تعديل كلمة المرور",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق"
            });
          })
          .catch(() => {
            this.loadSave = false;

            Swal.fire({
              title: "تاكد من ادخال كلمة مرور صالحه",
              text: "",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
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
  },
  created() {
    this.name = this.$store.state.fullname;
    if (this.$store.state.policyNumber == 1000) {
      this.per = "ادارة عامة";
    } else if (this.$store.state.policyNumber == 2000) {
      this.per = "موظف فرع رئيسي";
    } else if (this.$store.state.policyNumber == 3000) {
      this.per = "مدقق ";
    }
  }
};
</script>
