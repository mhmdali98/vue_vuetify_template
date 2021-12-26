<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <form v-on:submit.prevent="login">
          <v-card-text class="text-center">
            <h3 class="">نظام إدارة وأرشفة قسم البرنامج الحكومي</h3>

            <v-text-field
              outlined
              color="primary darken-1 "
              label="اسم المستخدم"
              class="mt-10"
              v-model="username"
              :rules="[rules.required]"
            />

            <v-text-field
              outlined
              class="mb-8"
              color="primary darken-1"
              label="كلمة المرور"
              v-model="password"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            />
          </v-card-text>
          <v-col class="text-center">
            <v-btn
              :loading="loading"
              @click.prevent="login()"
              type="submit"
              large
              color="primary darken-1"
              ref="sendReply"
            >تسجيل الدخول</v-btn>
          </v-col>
        </form>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    show1: false,
    rules: {
      required: value => !!value || "مطلوب",
      min: v => v.length >= 6 || "كلمة المرور يجب ان تتكون من 6 عناصر او اكثر",
      minPhon: v => v.length == 13 || "رقم الهاتف يجب ان يتكون من 11 رقم"
    },
    username: "",
    password: "",
    loading: false
  }),

  methods: {
    login() {
      if (this.username && this.password) {
        this.loading = true;
        const data = {
          username: this.username.replace(/ /g, ""),
          password: this.password
        };
        // this.$router.push("/admin/dashboard");

        axios
          .post("auth", data)
          .then(res => {
            this.loading = false;
            // console.log(res);
            this.$store.dispatch("login", res.data);
            this.$router.push("/admin/dashboard");
          })
          .catch(err => {
            this.loading = false;

            Swal.fire({
              title: "رقم المستخدم او كلمة المرور غير صحيح",
              text: "",
              icon: "error",
              confirmButtonText: "اغلاق"
            });
          });
      } else {
        Swal.fire({
          title: "تاكد من ادخال رقم المستخدم وكلمة المرور",
          text: "",
          icon: "error",
          confirmButtonText: "اغلاق"
        });
      }
    }
  },
  created() {
    this.$store.dispatch("logout");
  }
};
</script>
