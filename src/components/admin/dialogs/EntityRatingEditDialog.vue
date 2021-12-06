<template>
  <b-modal
    :title="entityRating.id ? 'Edit Rating' : 'Create Rating'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="Avis Id" v-if="method === 'avisRatings'">
        <b-form-input v-model="entityRating.avis_id" />
      </b-form-group>

      <b-form-group label="Party Id" v-if="method === 'partiesRatings'">
        <b-form-input v-model="entityRating.party_id" />
      </b-form-group>

      <b-form-group label="User Id">
        <b-form-input v-model="entityRating.user_id" />
      </b-form-group>

      <b-form-group label="Rating">
        <b-form-input v-model="entityRating.rating" type="number" step="0.5" max="12" />
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="entityRating.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'entityRatingDialog',
  data() {
    let initialState = {
      id: null,
      user_id: null,
      avis_id: null,
      method: null,
      opinion: null,
      content: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      entityRating: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/entityRating', {
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
        this.entityRating.id = value.id;
        this.status = value.status;
        this.method = value.method;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.entityRating.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/entityRating/clear',
    }),
    clearData() {
      this.entityRating = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api[this.method]
        .get(this.entityRating.id)
        .then(response => {
          this.entityRating = response.data;
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
      this.$api[this.method]
        .create(this.entityRating)
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
      this.$api[this.method]
        .update(this.entityRating.id, this.entityRating)
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