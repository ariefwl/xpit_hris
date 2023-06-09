<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="username"
      class="mb-3"
      type="text"
      :label="t('auth.username')"
      :error="!!usernameErrors.length"
      :error-messages="usernameErrors"
    />

    <va-input
      v-model="name"
      class="mb-3"
      type="text"
      :label="t('auth.fullname')"
      :error="!!nameErrors.length"
      :error-messages="nameErrors"
    />

    <va-input
      v-model="email"
      class="mb-3"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-3"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align-center justify-space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :error-messages="agreedToTermsErrors"
      >
        <template #label>
          <span class="ml-2">
            {{ t('auth.agree') }}
            <span class="va-link">{{ t('auth.termsOfUse') }}</span>
          </span>
        </template>
      </va-checkbox>
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        {{ t('auth.recover_password') }}
      </router-link>
    </div>

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import axios from 'axios'
  const { t } = useI18n()

  const router = useRouter()
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const name = ref('')
  const agreedToTerms = ref(false)
  const usernameErrors = ref<string[]>([])
  const nameErrors = ref<string[]>([])
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const agreedToTermsErrors = ref<string[]>([])

  const formReady = computed(() => {
    return !(
      usernameErrors.value.length ||
      nameErrors.value.length ||
      emailErrors.value.length ||
      passwordErrors.value.length ||
      agreedToTermsErrors.value.length
    )
  })

  const onsubmit = async () => {
    if (!formReady.value) return

    usernameErrors.value = username.value ? [] : ['Username is required']
    nameErrors.value = name.value ? [] : ['Name is required']
    emailErrors.value = email.value ? [] : ['Email is required']
    passwordErrors.value = password.value ? [] : ['Password is required']
    agreedToTermsErrors.value = agreedToTerms.value ? [] : ['You must agree to the terms of use to continue']

    await axios
      .post('/register', {
        username: username.value,
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        console.log(response.data.data)
        router.push({ name: 'login' })
      })
      .catch((err) => {
        console.log(err.response.data.data)
      })
  }
</script>
