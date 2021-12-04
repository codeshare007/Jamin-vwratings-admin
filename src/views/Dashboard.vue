<template>
  <div class="adminDashboard">
    <b-row v-if="!loading">
      <b-col>
        <b-card class="mt-2" header="Members">
          <h1>{{ information.users }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-2" header="Parties">
          <h1>{{ information.parties }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-2" header="Players">
          <h1>{{ information.avis }}</h1>
        </b-card>
      </b-col>	  
      <b-col>
        <b-card class="mt-2" header="Messages">
          <h1>{{ information.messages }}</h1>
        </b-card>
      </b-col>	  
    </b-row>
   <b-row v-if="!loading">
      <b-col>
        <b-card class="mt-2" header="Parties Claimed">
          <h1>{{ information.pclaims }}</h1>
        </b-card>
      </b-col>		  
      <b-col>
        <b-card class="mt-2" header="Parties Comments">
          <h1>{{ information.pcomments }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-2" header="Parties Ratings">
          <h1>{{ information.pratings }}</h1>
        </b-card>
      </b-col>  
    </b-row>	
   <b-row v-if="!loading">
      <b-col>
        <b-card class="mt-2" header="Players Claimed">
          <h1>{{ information.claims }}</h1>
        </b-card>
      </b-col>		  
      <b-col>
        <b-card class="mt-2" header="Players Comments">
          <h1>{{ information.comments }}</h1>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="mt-2" header="Players Ratings">
          <h1>{{ information.ratings }}</h1>
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
  border-radius: 5px;
  margin-bottom: 100px;

  h1 {
    font-family: 'Futura PT', sans-serif;
  }

  .information {
    font-size: 24px;
  }
  
  .card-header {
    padding: 0;
    background-color: rgb(95 167 55 / 47%);
}
}
</style>
