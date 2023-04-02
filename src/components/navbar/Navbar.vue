<template>
  <va-navbar class="app-layout-navbar">
    <template #left>
      <div class="left">
        <va-icon-menu-collapsed
          :class="{ 'x-flip': isSidebarMinimized }"
          class="va-navbar__item"
          :color="colors.primary"
          @click="isSidebarMinimized = !isSidebarMinimized"
        />
        <router-link to="/">
          <vuestic-logo class="logo" />
        </router-link>
      </div>
    </template>
    <!-- <template #center>
      <div class="app-navbar-center">
        <span class="app-navbar-center__text mr-2">{{ t('navbar.messageUs') }}</span>
        <a
          class="app-navbar-center__mail mr-2"
          href="mailto:hello@epicmax.co"
          target="_blank"
          :style="{ color: colors.primary }"
        >
          hello@epicmax.co
        </a>
        <va-button
          href="https://github.com/epicmaxco/vuestic-admin"
          color="#000000"
          class="app-navbar-center__github-button"
          icon="github"
          target="_blank"
        >
          {{ t('navbar.repository') }}
        </va-button>
      </div>
    </template> -->
    <template #right>
      <div v-if="useAuth.user">
        <div style="display: flex; align-items: right">
          <va-button-dropdown :label="useAuth.user.name" class="mr-2 mb-2">
            <span>Profile</span>
          </va-button-dropdown>
        </div>
        <!-- <app-navbar-actions class="app-navbar__actions md5 lg4" :user-name="useAuth.user.name" /> -->
        <!-- <va-button-dropdown preset="secondary" class="mr-2 mb-2" round> 
          Profile
          LogOut
        </va-button-dropdown> -->
        <!-- <div class="va-button-dropdown language-dropdown mr-3 mr-3">
          <button class="va-button va-button--normal va-button--right-icon va-dropdown" style="border-color: transparent; color: rgb(21, 78, 193); background: transparent; --va-0-background-color: #154EC1; --va-1-background-color-opacity: 0; --va-2-background-mask-color: transparent; --va-3-background-mask-opacity: 0; position: relative;" type="button" tabindex="0" aria-disabled="false" role="button" aria-label="toggle dropdown" aria-expanded="false">
            <span class="va-button__content">
              English<i class="va-icon material-icons va-button__right-icon" style="color: rgb(21, 78, 193); font-size: 24px; height: 24px; line-height: 24px;" aria-hidden="true" notranslate="">expand_more</i>
            </span>
          </button>
        </div> -->
      </div>
    </template>
  </va-navbar>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore, authStore } from '../../stores/global-store'
  import { useI18n } from 'vue-i18n'
  import { useColors } from 'vuestic-ui'
  import VuesticLogo from '../VuesticLogo.vue'
  import VaIconMenuCollapsed from '../icons/VaIconMenuCollapsed.vue'
  import AppNavbarActions from './components/AppNavbarActions.vue'

  const GlobalStore = useGlobalStore()
  const { t } = useI18n()

  const { isSidebarMinimized, userName } = storeToRefs(GlobalStore)

  const { getColors } = useColors()
  const colors = computed(() => getColors())
  const useAuth = authStore()

  onMounted(async () => {
    useAuth.getUser()
  })
</script>

<style lang="scss" scoped>
  .va-navbar {
    box-shadow: var(--va-box-shadow);
    z-index: 2;

    @media screen and (max-width: 950px) {
      .left {
        width: 100%;
      }

      .app-navbar__actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .left {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 1.5rem;
    }

    & > *:last-child {
      margin-right: 0;
    }
  }

  .x-flip {
    transform: scaleX(-100%);
  }

  .app-navbar-center {
    display: flex;
    align-items: center;

    @media screen and (max-width: 1200px) {
      &__github-button {
        display: none;
      }
    }

    @media screen and (max-width: 950px) {
      &__text {
        display: none;
      }
    }
  }
</style>
