<template>
  <div class="settingsPage">
    <h2 class="mb-5 mt-3">Settings</h2>
    <b-row>
      <b-col cols="6">
        <b-card header="Settings">
          <b-table :items="settings" :fields="settingFields">
            <template #cell(index)="row">
              {{ row.index + 1}}
            </template>
            <template #cell(actions)="row">
              <b-button variant="primary" size="sm" @click="settingEdit(row.item.id)">
                <b-icon-pencil />
              </b-button>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card header="Ads Campaigns">
          <b-table :items="campaigns" :fields="campaignFields" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      settings: [],
      campaigns: [],
      settingFields: [
        {key: 'index'},
        {key: 'key'},
        {key: 'value'},
        {key: 'description'},
        {key: 'actions'}
      ],
      campaignFields: [
        {key: 'name'},
        {key: 'description'},
        {key: 'timer'},
        {key: 'created_at'},
        {key: 'actions'}
      ]
    }
  },

  mounted() {
    this.fetchSettings();
    this.fetchAdsCampaigns();
  },

  methods: {

    ...mapActions({
      editSetting: 'dialogs/setting/edit'
    }),

    fetchSettings() {
      this.$api.settings.fetch().then(response => {
        this.settings = response.data.data;
      })
    },

    fetchAdsCampaigns() {
      this.$api.adsCampaigns.fetch().then(response => {
        this.campaigns = response.data.data
      })
    },

    settingEdit(id) {
      this.editSetting(id).then(() => {
        this.fetchSettings();
      })
    }
  }
}
</script>