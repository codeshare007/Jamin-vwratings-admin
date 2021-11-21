<template>
  <div class="adminDashboard">
    <h1>Welcome back, {{ profile.username }}!</h1>
    <b-row v-if="!loading">
      <b-col>
        <b-card class="mt-5" header="Users">
          <h1>{{ information.users }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-5" header="Comments">
          <h1>{{ information.comments }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-5" header="Ratings">
          <h1>{{ information.ratings }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-5" header="Avis">
          <h1>{{ information.avis }}</h1>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3">
        <b-form class="mt-5">
          <b-form-group label="Amount of hits to see promo page">
            <b-form-input type="number" v-model="form.hits"/>
          </b-form-group>

          <b-button variant="success" @click="changeAmount">Change</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      information: {},
      loading: true,
      form: {
        hits: null
      }
    }
  },

  computed: {
    profile() {
      return this.$store.getters['auth/profile']
    }
  },

  mounted() {
    this.fetchInformation();
    this.fetchHits();
  },

  methods: {
    fetchInformation() {
      this.$api.adminDashboard.information().then(response => {
        this.information = response.data;
        this.loading = false;
      })
    },

    fetchHits() {
      this.$api.adminDashboard.hits().then(response => {
        this.form.hits = response.data;
      })
    },

    changeAmount() {
      this.$api.adminDashboard.changeHits(this.form.hits).then(response => {
        if (response.data.status === 'success') {
          this.fetchHits();
        }
      })
    }
  }
}
</script>
<style lang="scss">
.adminDashboard {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  h1 {
    font-family: 'Futura PT', sans-serif;
  }

  .information {
    font-size: 24px;
  }
}
</style>
