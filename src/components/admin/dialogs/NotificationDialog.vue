<template>
  <b-modal
    :title="notification.id ? 'Edit Notification' : 'Create Notification'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="Content">
        <b-form-textarea rows="10" type="text" v-model="notification.content"/>
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="notification.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: 'NotificationEditDialog',
  data() {
    let initialState = {
      id: null,
      content: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      notification: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/notification', {
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
        this.notification.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;

        if (this.notification.id) {
          this.load();
        }
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/notification/clear',
    }),
    clearData() {
      this.notification = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.notifications
        .get(this.notification.id)
        .then(response => {
          this.notification = response.data;
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
      this.$api.notifications
        .create(this.notification)
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
      this.$api.notifications
        .update(this.notification.id, this.notification)
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