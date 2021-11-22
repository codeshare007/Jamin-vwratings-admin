<template>
  <b-modal
    :title="partyClaim.id ? 'Edit Claim' : 'Create Claim'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="User Id">
        <b-input type="text" v-model="partyClaim.user_id"/>
      </b-form-group>
      <b-form-group label="Party Id">
        <b-input type="text" v-model="partyClaim.party_id"/>
      </b-form-group>
      <b-form-group label="Claimed Until">
        <b-form-datepicker type="text" v-model="partyClaim.claimed_until"/>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="partyClaim.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'partyClaimDialog',
  data() {
    let initialState = {
      id: null,
      user_id: null,
      party_id: null,
      claimed_until: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      partyClaim: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/partyClaim', {
      form: state => state
    }),
    visible: {
      get() {
        return !!(this.status === 'create' || this.status === 'edit')
      },
      set() {
        this.status = 'hidden'
      }
    }
  },

  watch: {
    form: {
      deep: true,
      handler(value) {
        this.clearData();
        this.partyClaim.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.partyClaim.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/partyClaim/clear',
    }),
    clearData() {
      this.partyClaim = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.partiesClaims
        .get(this.partyClaim.id)
        .then(response => {
          this.partyClaim = response.data;
        }).catch(() => {
        this.reject();
        this.clearData();
        this.close();
      }).finally(() => {
        this.loading = false;
      })
    },
    create() {
      this.error = null;
      this.loading = true;
      this.$api.partiesClaims
        .create(this.partyClaim)
        .then(response => {
          this.resolve(response);
          this.handleClose();
        }).catch(() => {
      }).finally(() => {
        this.loading = false;
      })
    },
    edit() {
      this.error = null;
      this.loading = true;
      this.$api.partiesClaims
        .update(this.partyClaim.id, this.partyClaim)
        .then(response => {
          this.resolve(response);
          this.handleClose();
        }).catch(() => {
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>