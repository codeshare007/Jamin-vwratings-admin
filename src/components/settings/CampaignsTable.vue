<template>
  <b-card header="Campaigns">
    <h4>View Promo</h4>
    <div>
      <b-button variant="success" size="sm" class="mb-3" @click="campaignCreate(1)">Create</b-button>
    </div>

    <b-table :items="viewCampaigns" :fields="fields">
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

    <h4>Claiming Promo</h4>
    <div>
      <b-button variant="success" size="sm" class="mb-3" @click="campaignCreate(2)">Create</b-button>
    </div>

    <b-table :items="claimingCampaigns" :fields="fields">
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
      viewCampaigns: [],
      claimingCampaigns: [],
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
    this.fetchCampaigns(1);
    this.fetchCampaigns(2);
  },

  methods: {
    ...mapActions({
      editCampaign: 'dialogs/campaign/edit',
      createCampaign: 'dialogs/campaign/create'
    }),

    campaignCreate(type) {
      this.createCampaign(type).then(() => {
        this.fetchCampaigns(type);
      })
    },

    fetchCampaigns(type) {
      this.$api.adsCampaigns.fetch(1, {'type': type}).then(response => {
        if (type == 1) {
          this.viewCampaigns = response.data.data 
        } else if (type == 2) {
          this.claimingCampaigns = response.data.data
        }        
      })
    },

    campaignDestroy(id) {
      this.$api.campaign.delete(id).then(() => {
        this.fetchCampaigns()
      })
    },

    campaignEdit(id) {
      this.editCampaign(id).then(() => {
        this.fetchCampaigns(1);
        this.fetchCampaigns(2);							   
      })
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show();
    },

    destroyCampaign() {
      this.$api.adsCampaigns.delete(this.deletableId).then(() => {
        this.fetchCampaigns(1);
        this.fetchCampaigns(2);
        this.deletableId = null;
      })
    },
  }
}
</script>