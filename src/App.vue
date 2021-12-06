<template>
  <div class="app">
    <div v-if="isAdmin">
      <UserEditDialog />
      <EntityEditDialog />
      <EntityCommentEditDialog />
      <AdsCampaignEditDialog />
      <AviClaimEditDialog />
      <AviRatingEditDialog />
      <PartyClaimEditDialog />
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapState} from "vuex";

import UserEditDialog from "./components/admin/dialogs/UserEditDialog";
import EntityEditDialog from './components/admin/dialogs/EntityEditDialog';
import EntityCommentEditDialog from "./components/admin/dialogs/EntityCommentEditDialog";
import AdsCampaignEditDialog from "./components/admin/dialogs/AdsCampaignEditDialog";
import AviRatingEditDialog from "./components/admin/dialogs/AviRatingEditDialog";
import AviClaimEditDialog from './components/admin/dialogs/AviClaimEditDialog'
import PartyClaimEditDialog from './components/admin/dialogs/PartyClaimEditDialog'

export default {
  name: 'App',

  components: {
    UserEditDialog,
    EntityEditDialog,
    EntityCommentEditDialog,
    AdsCampaignEditDialog,
    AviClaimEditDialog,
    AviRatingEditDialog,
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
