<template>
  <div class="settingsPage">
    <h2>Settings</h2>

    <b-row>
      <b-col cols="6">
        qwe
      </b-col>
      <b-col cols="6">
        qwe
      </b-col>
      <b-col cols="6">
        qwe
      </b-col>
    </b-row>


  </div>
</template>
<script>
export default {
  data() {
    return {
      settings: []
    }
  },

  mounted() {
    this.fetchSettings()
  },

  methods: {
    fetchSettings() {
      this.$api.settings.fetch().then(response => {
        this.settings = response.data.data;
      })
    }
  }
}
</script>