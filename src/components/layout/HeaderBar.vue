<template>
  <b-navbar sticky toggleable="lg" type="dark" class="border-bottom header-bar" variant="light">
    <b-container fluid>
      <b-navbar-brand class="text-dark" :to="{ name: 'cabinet.dashboard' }">
        Vwratings Admin
      </b-navbar-brand>
      <b-navbar-toggle class="bg-dark" target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav v-if="this.isLoading === false">
        <b-navbar-nav class="mobile-menu d-lg-none d-block">

        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right class="text-dark">
            <template #button-content>
              <span class="text-dark">{{ profile.username }}</span>
            </template>
            <b-dropdown-item :to="{ name: 'cabinet.profile' }">Profile</b-dropdown-item>
            <b-dropdown-item @click="emitLogout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <div class="ml-3">
            <b-button variant="primary" href="/" class="mr-2">Go to Website</b-button>
          </div>
        </b-navbar-nav>

      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import {mapActions} from "vuex";

export default {

  data() {
    return {
      profile: {
        bank_requested: false
      },
      isLoading: true
    }
  },

  mounted() {
    this.profile = this.$store.state.auth.profile;
    this.isLoading = false;
  },

  methods: {

    emitLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      })
    },

    ...mapActions({
      logout: 'auth/LOGOUT'
    })
  },
}
</script>
<style lang="scss">
.header-bar {
  .mobile-menu {
    .nav-item a {
      color: black;
    }
  }

  .b-nav-dropdown .nav-link {
    color: #7c7c7c !important;
  }
}
</style>