<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-content>
          <h1 class="mb-5">Create User</h1>
          <form enctype="multipart/form-data">
            <div class="form-floating mb-3">
              <input id="name" v-model="dataUser.name" type="text" class="form-control" placeholder="Fullname" />
              <label for="name">Fullname</label>
            </div>
            <div class="form-floating mb-3">
              <input id="name" v-model="dataUser.username" type="text" class="form-control" placeholder="Username" />
              <label for="name">Username</label>
            </div>
            <div class="form-floating mb-3">
              <input
                id="email"
                v-model="dataUser.email"
                type="email"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                id="password"
                v-model="dataUser.password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <label for="password">Password</label>
            </div>
            <div class="form-floating mb-3">
              <input
                id="conf_password"
                v-model="dataUser.confirm_password"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
              />
              <label for="conf_password">Confirm Password</label>
            </div>
            <button type="submit" class="btn btn-outline-primary" @click.prevent="simpan">Simpan</button>
          </form>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { authStore } from '../../../stores/global-store'
  const router = useRouter()
  const useAuth = authStore()
  export default {
    data() {
      return {
        dataUser: {
          username: '',
          email: '',
          password: '',
          name: '',
          // confirm_password: '',
        },
      }
    },
    async mounted() {
      await useAuth.getToken()
    },
    methods: {
      async simpan() {
        await axios
          .post('http://127.0.0.1:8000/api/users', this.dataUser)
          // .post('https://api101.lapaksemarang.com/api/users', this.dataUser)
          // .post('http://api.jansenindonesia.com/api/register', this.dataUser)
          .then((response) => {
            console.log(response.data)
            this.$router.push({ name: 'user' })
          })
          .catch((err) => {
            console.log(err.response.data)
          })
      },
    },
  }
</script>

<style></style>
