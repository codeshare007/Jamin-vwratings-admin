<template>
  <nav class="bg-dark sidebar-component col-md-2 p-0 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <b-nav vertical v-if="isLoaded">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'cabinet.dashboard'}">
            <b-icon-pencil /> <span class="ml-2">Dashboard</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.users'}">
            <b-icon-person /> <span class="ml-2">Users</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.messages'}">
            <b-icon-chat-text /> <span class="ml-2">Messages</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.ads.campaigns'}">
            <b-icon-cash /> <span class="ml-2">Ads Campagins</span>
          </b-nav-item>
          <div class="border-top border-secondary"></div>
          <b-nav-item :to="{ name: 'cabinet.avis' }">
            <b-icon-person-fill /> <span class="ml-2">Avis</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.avis.claims'}">
            <b-icon-hand-index /> <span class="ml-2">Avis Claims</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.avis.comments' }">
            <b-icon-chat-text /> <span class="ml-2">Avis Comments</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.avis.ratings' }">
            <b-icon-star /> <span class="ml-2">Avis Ratings</span>
          </b-nav-item>
          <div class="border-top border-secondary"></div>
          <b-nav-item :to="{ name: 'cabinet.parties'}">
            <b-icon-people /> <span class="ml-2">Parties</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.parties.claims'}">
            <b-icon-hand-index /> <span class="ml-2">Parties Claims</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.parties.comments'}">
            <b-icon-chat-text /> <span class="ml-2">Parties Comments</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'cabinet.parties.ratings'}">
            <b-icon-star /> <span class="ml-2">Parties Ratings</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-nav>
    </div>
  </nav>
</template>
<script>
import {mapActions} from 'vuex';

export default {

  data() {
    return {
      profile: {},
      isLoaded: false,
    }
  },

  mounted() {
    this.profile = this.$store.state.auth.profile;
    this.isLoaded = true;
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
  }
}
</script>
<style lang="scss">
.sidebar-component {
  min-width: 220px;
  max-width: 220px;
  overflow: hidden;
  background: #2d353c;
  position: -webkit-sticky;
  position: sticky;
  top: 57px;
  height: calc(100vh - 57px);
  padding-top: .5rem;
  overflow-y: auto;

  .navbar-nav {
    margin-top: 15px;
  }

  .nav-link {
    padding: 8px 20px;
  }

  .nav-link:not(.router-link-exact-active) {
    &:hover {
      background: #232a2f;
      color: #a8acb1;
    }
  }

  .router-link-exact-active,
  .router-link-active {
    //background: #00acac;
    color: lightgrey;
  }

  a {
    color: #a8acb1;
    font-size: 12px;
  }
}
</style>