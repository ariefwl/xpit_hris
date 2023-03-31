<template>
  <form @submit.prevent="login">
    <va-input v-model="dataLogin.email" class="mb-3" type="email" />

    <va-input v-model="dataLogin.password" class="mb-3" type="password" />

    <!-- <div class="auth-layout__options d-flex align-center justify-space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link>
    </div> -->

    <div class="d-flex justify-center mt-3">
      <va-button type="submit" class="my-0">Login</va-button>
    </div>
  </form>
</template>

<script>
  import axios from 'axios'

  const getToken = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  export default {
    data() {
      return {
        dataLogin: {
          email: '',
          password: '',
        },
      }
    },
    methods: {
      async login() {
        await getToken()
        await axios
          .post('/login', this.dataLogin)
          .then((response) => {
            console.log(response.data.data)
            this.$router.push({ name: 'dashboard' })
          })
          .catch((err) => {
            console.log(err.response.data.data)
          })
      },
    },
  }
</script>
