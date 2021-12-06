<template>
  <b-modal
    :title="aviRating.id ? 'Edit Rating' : 'Create Rating'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="Avis Id">
        <b-form-input v-model="aviRating.avis_id" />
      </b-form-group>

      <b-form-group label="User Id">
        <b-form-input v-model="aviRating.user_id" />
      </b-form-group>

      <b-form-group label="Rating">
        <b-form-input v-model="aviRating.rating" type="number" step="0.5" max="12" />
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="aviRating.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'aviRatingDialog',
  data() {
    let initialState = {
      id: null,
      user_id: null,
      avis_id: null,
      opinion: null,
      content: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      aviRating: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/aviRating', {
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
        this.aviRating.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.aviRating.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/aviRating/clear',
    }),
    clearData() {
      this.aviRating = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.avisRatings
        .get(this.aviRating.id)
        .then(response => {
          this.aviRating = response.data;
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
      this.$api.avisRatings
        .create(this.aviRating)
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
      this.$api.avisRatings
        .update(this.aviRating.id, this.aviRating)
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