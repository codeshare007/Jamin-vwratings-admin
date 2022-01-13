<template>
  <div class="app">
    <div v-if="isAdmin">
      <UserEditDialog />
      <UserNotificationDialog />
      <NotificationDialog />
      <EntityEditDialog />
      <EntityCommentEditDialog />
      <EntityRatingDialog />
      <AdsCampaignEditDialog />
      <AviClaimEditDialog />
      <PartyClaimEditDialog />
      <SettingEditDialog />
    </div>
    <router-view />
  </div>
</template>

<script>
import {mapState} from "vuex";

import UserEditDialog from "./components/admin/dialogs/UserEditDialog";
import SettingEditDialog from './components/admin/dialogs/SettingEditDialog'
import EntityEditDialog from './components/admin/dialogs/EntityEditDialog';
import EntityCommentEditDialog from "./components/admin/dialogs/EntityCommentEditDialog";
import AdsCampaignEditDialog from "./components/admin/dialogs/AdsCampaignEditDialog";
import AviClaimEditDialog from './components/admin/dialogs/AviClaimEditDialog'
import PartyClaimEditDialog from './components/admin/dialogs/PartyClaimEditDialog'
import EntityRatingDialog from "./components/admin/dialogs/EntityRatingEditDialog";
import UserNotificationDialog from "./components/admin/dialogs/UserNotificationDialog";
import NotificationDialog from './components/admin/dialogs/NotificationDialog';

export default {
  name: 'App',

  components: {
    EntityRatingDialog,
    UserEditDialog,
    EntityEditDialog,
    EntityCommentEditDialog,
    AdsCampaignEditDialog,
    AviClaimEditDialog,
    SettingEditDialog,
    PartyClaimEditDialog,
    UserNotificationDialog,
    NotificationDialog
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
