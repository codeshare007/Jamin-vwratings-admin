<template>
  <b-card header="Campaigns">

    <div>
      <b-button variant="success" size="sm" class="mb-3" @click="campaignCreate()">Create</b-button>
    </div>

    <b-table :items="campaigns" :fields="fields">
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(actions)="row">
        <b-button variant="primary" size="sm" class="mr-1" @click="campaignEdit(row.item.id)">
          <b-icon-pencil/>
        </b-button>
        <b-button variant="danger" size="sm" @click="showDeleteModal(row.item.id)">
          <b-icon-trash/>
        </b-button>
      </template>
    </b-table>

    <b-modal @ok="destroyCampaign" ref="deleteModal">
      Are you sure that you want to delete campaign ?
    </b-modal>
  </b-card>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      campaigns: [],
      fields: [
        {key: 'index'},
        {key: 'name'},
        {key: 'description'},
        {key: 'timer'},
        {key: 'actions'}
      ]
    }
  },

  mounted() {
    this.fetchCampaigns();
  },

  methods: {
    ...mapActions({
      editCampaign: 'dialogs/campaign/edit',
      createCampaign: 'dialogs/campaign/create'
    }),

    campaignCreate() {
      this.createCampaign().then(() => {
        this.fetchCampaigns();
      })
    },

    fetchCampaigns() {
      this.$api.adsCampaigns.fetch().then(response => {
        this.campaigns = response.data.data
      })
    },

    campaignDestroy(id) {
      this.$api.campaign.delete(id).then(() => {
        this.fetchCampaigns()
      })
    },

    campaignEdit(id) {
      this.editCampaign(id).then(() => {
        this.fetchCampaigns();
      })
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show();
    },

    destroyCampaign() {
      this.$api.adsCampaigns.delete(this.deletableId).then(() => {
        this.fetchCampaigns();
        this.deletableId = null;
      })
    },
  }
}
</script>