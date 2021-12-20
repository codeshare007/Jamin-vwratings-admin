<template>
  <div class="settingsPage">
    <h2 class="mb-5 mt-3">Settings</h2>
    <b-row>
      <b-col cols="6">
        <b-card header="Settings">
          <b-table :items="settings" :fields="settingFields">
            <template #cell(index)="row">
              {{ row.index + 1 }}
            </template>
            <template #cell(actions)="row">
              <b-button variant="primary" size="sm" @click="settingEdit(row.item.id)">
                <b-icon-pencil/>
              </b-button>
            </template>
          </b-table>
        </b-card>

        <b-card header="Announcement" class="mt-4">
          <b-form>
            <b-form-group>
              <b-form-textarea rows="5" v-model="announcement_html"/>
            </b-form-group>
            <div class="d-flex justify-content-end mt-3">
              <b-button variant="success" @click="setAnnouncement">Save</b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="6">
        <CampaignsTable />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {mapActions} from "vuex";
import CampaignsTable from "@/components/settings/CampaignsTable";

export default {
  components: {
    CampaignsTable
  },
  data() {
    return {
      announcement_html: null,
      settings: [],
      campaigns: [],
      settingFields: [
        {key: 'index'},
        {key: 'key'},
        {key: 'value'},
        {key: 'description'},
        {key: 'actions'}
      ],
    }
  },

  mounted() {
    this.fetchSettings();
    this.getAnnouncement();
  },

  methods: {
    ...mapActions({
      editSetting: 'dialogs/setting/edit'
    }),

    fetchSettings() {
      this.$api.settings.fetch().then(response => {
        this.settings = response.data.data.filter(item => {
          if (item.key !== 'announcement_html') return item;
        });
      })
    },

    setAnnouncement() {
      this.$api.settings.setAnnouncement(this.announcement_html).then(() => {
        this.getAnnouncement()
      })
    },

    getAnnouncement() {
      this.$api.settings.getAnnouncement().then(response => {
        this.announcement_html = response.data;
      })
    },

    settingEdit(id) {
      this.editSetting(id).then(() => {
        this.fetchSettings();
      })
    },
  }
}
</script>