<template>
  <div class="app">
    <div v-if="isAdmin">
      <UserEditDialog />
      <AviEditDialog />
      <AviCommentEditDialog />
      <AdsCampaignEditDialog />
      <AviClaimEditDialog />
      <PartyEditDialog />
      <PartyCommentEditDialog />
      <PartyClaimEditDialog />
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapState} from "vuex";

import UserEditDialog from "./components/admin/dialogs/UserEditDialog";
import AviEditDialog from "./components/admin/dialogs/AviEditDialog";
import AviCommentEditDialog from "./components/admin/dialogs/AviCommentEditDialog";
import AdsCampaignEditDialog from "./components/admin/dialogs/AdsCampaignEditDialog";
import AviClaimEditDialog from './components/admin/dialogs/AviClaimEditDialog'
import PartyEditDialog from "./components/admin/dialogs/PartyEditDialog";
import PartyCommentEditDialog from "./components/admin/dialogs/PartyCommentEditDialog";
import PartyClaimEditDialog from './components/admin/dialogs/PartyClaimEditDialog'

export default {
  name: 'App',

  components: {
    UserEditDialog,
    AviEditDialog,
    AviCommentEditDialog,
    AdsCampaignEditDialog,
    AviClaimEditDialog,
    PartyCommentEditDialog,
    PartyEditDialog,
    PartyClaimEditDialog
  },

  data() {
    return {
      isLoading: false,
      fullPage: true
    }
  },

  computed: {
    ...mapState('auth', {
      loggedIn: state => state.loggedIn,
      isAdmin: state => state.isAdmin
    }),
  },

  methods: {
    preloader() {
      this.preloader();
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
