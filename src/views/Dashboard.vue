<template>
  <div class="adminDashboard">
    <b-row v-if="!loading">
      <b-col>
	<a href='users'>
        <b-card class="mt-2" header="Members">
          <h1>{{ information.users }}</h1>
        </b-card>
	</a>
      </b-col>
      <b-col>
	<a href='parties'>	  
        <b-card class="mt-2" header="Parties">
          <h1>{{ information.parties }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='avis'>	  
        <b-card class="mt-2" header="Players">
          <h1>{{ information.avis }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='messages'>	  
        <b-card class="mt-2" header="Messages">
          <h1>{{ information.messages }}</h1>
        </b-card>
	</a>		
      </b-col>
    </b-row>
    <b-row v-if="!loading">
      <b-col>
	<a href='parties-claims'>	  
        <b-card class="mt-2" header="Parties Claimed">
          <h1>{{ information.pclaims }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='parties-comments'>	  
        <b-card class="mt-2" header="Parties Comments">
          <h1>{{ information.pcomments }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='parties-ratings'>	  
        <b-card class="mt-2" header="Parties Ratings">
          <h1>{{ information.pratings }}</h1>
        </b-card>
	</a>		
      </b-col>
    </b-row>
    <b-row v-if="!loading">
      <b-col>
	<a href='avis-claims'>	  
        <b-card class="mt-2" header="Players Claimed">
          <h1>{{ information.claims }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='avis-comments'>	  
        <b-card class="mt-2" header="Players Comments">
          <h1>{{ information.comments }}</h1>
        </b-card>
	</a>		
      </b-col>
      <b-col>
	<a href='avis-ratings'>	  
        <b-card class="mt-2" header="Players Ratings">
          <h1>{{ information.ratings }}</h1>
        </b-card>
	</a>		
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
    }
  },

  computed: {
    profile() {
      return this.$store.getters['auth/profile']
    }
  },

  mounted() {
    this.fetchInformation();
  },

  methods: {
    fetchInformation() {
      this.$api.adminDashboard.information().then(response => {
        this.information = response.data;
        this.loading = false;
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

  .card {
    margin-bottom: 20px;
  }

  .card-header {
    padding: 5px 10px;
    border-bottom: 0;
    background-color: rgb(95 167 55 / 47%);
  }
}
</style>
