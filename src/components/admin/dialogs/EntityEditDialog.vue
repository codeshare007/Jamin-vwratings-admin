<template>
  <b-modal
    :title="entity.id ? `Edit ${this.entities}` : `Create ${this.entities}`"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">
    <b-form>
      <b-form-group :label="`${this.entities} name`">
        <b-input type="text" v-model="entity.name"/>
      </b-form-group>
      <b-form-group label="user Id">
        <b-input type="text" v-model="entity.user_id"/>
      </b-form-group>
    </b-form>
    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="entity.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>

import {mapActions, mapState} from 'vuex';

export default {
  name: 'entityEditDialog',

  data() {
    let initialState = {
      id: null,
      user_id: null,
      name: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      entities: null,
      entity: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/entity', {
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
        this.entity.id = value.id;
        this.status = value.status;
        this.entities = value.entities;
        this.resolve = value.resolve;
        this.reject = value.reject;

        if (this.entity.id) {
          this.load();
        }
      }
    }
  },


  methods: {
    ...mapActions({
      close: 'dialogs/entity/clear',
    }),
    clearData() {
      this.entity = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api[this.entities].get(this.entity.id)
        .then(response => {
          this.entity = response.data;
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
      this.$api[this.entities].create(this.entity)
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
      this.$api[this.entities].update(this.entity.id, this.entity)
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