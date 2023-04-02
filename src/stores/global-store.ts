import { defineStore } from 'pinia'
import axios from 'axios'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userName: 'Arief Wicaksono',
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },

    changeUserName(userName: string) {
      this.userName = userName
    },
  },
})

export const authStore = defineStore('auth', {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    async getToken() {
      await axios.get('/sanctum/csrf-cookie')
    },

    async getUser() {
      const data = await axios.get('/api/user')
      this.authUser = data.data
    },

    async logOut() {
      await axios.post('/logout')
      this.authUser = null
    },
  },
})

// export default authStore
