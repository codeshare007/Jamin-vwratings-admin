<template>
  <b-modal
    :title="party.id ? 'Edit Party' : 'Create Party'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="Party name">
        <b-input type="text" v-model="party.name"/>
      </b-form-group>
      <b-form-group label="User Id">
        <b-input type="text" v-model="party.user_id"/>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="party.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: 'PartyEditDialog',

  data() {
    let initialState = {
      id: null,
      user_id: null,
      name: null,
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      party: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/party', {
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
        this.party.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;

        if (this.party.id) this.load();
      }
    }
  },


  methods: {
    ...mapActions({
      close: 'dialogs/party/clear',
    }),
    clearData() {
      this.party = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.parties.get(this.party.id)
        .then(response => {
          this.party = response.data;
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
      this.$api.parties.create(this.party)
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
      this.$api.parties.update(this.party.id, this.party)
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