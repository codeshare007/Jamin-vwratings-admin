<template>
  <b-modal
    title="Edit Setting"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="Key">
        <b-form-input v-model="setting.key" disabled />
      </b-form-group>

      <b-form-group label="Value">
        <b-form-input v-model="setting.value" />
      </b-form-group>

      <b-form-group label="Description">
        <b-form-textarea v-model="setting.description" disabled />
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="setting.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: 'settingEditDialog',
  data() {
    let initialState = {
      id: null,
      name: null,
      email: null,
      role: 2,
      password: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      setting: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/setting', {
      form: state => state
    }),
    visible: {
      get() {return !!(this.status === 'create' || this.status === 'edit')},
      set() {this.status = 'hidden'}
    }
  },

  watch: {
    form: {
      deep: true,
      handler(value) {
        this.clearData();
        this.setting.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;

        if (this.setting.id) {
          this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/setting/clear',
    }),
    clearData() {
      this.setting = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.settings
        .get(this.setting.id)
        .then(response => {
          this.setting = response.data;
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
      this.$api.settings
        .create(this.setting)
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
      this.$api.settings
        .update(this.setting.id, this.setting)
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