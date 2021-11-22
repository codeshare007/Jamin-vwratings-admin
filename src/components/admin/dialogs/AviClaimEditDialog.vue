<template>
  <b-modal
    :title="aviClaim.id ? 'Edit Claim' : 'Create Claim'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="User Id">
        <b-input type="text" v-model="aviClaim.user_id"/>
      </b-form-group>
      <b-form-group label="Avi Id">
        <b-input type="text" v-model="aviClaim.avis_id"/>
      </b-form-group>
      <b-form-group label="Claimed Until">
        <b-form-datepicker type="text" v-model="aviClaim.claimed_until"/>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="aviClaim.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'aviClaimDialog',
  data() {
    let initialState = {
      id: null,
      user_id: null,
      avis_id: null,
      claimed_until: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      aviClaim: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/aviClaim', {
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
        this.aviClaim.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.aviClaim.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/aviClaim/clear',
    }),
    clearData() {
      this.aviClaim = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.avisClaims
        .get(this.aviClaim.id)
        .then(response => {
          this.aviClaim = response.data;
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
      this.$api.avisClaims
        .create(this.aviClaim)
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
      this.$api.avisClaims
        .update(this.aviClaim.id, this.aviClaim)
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