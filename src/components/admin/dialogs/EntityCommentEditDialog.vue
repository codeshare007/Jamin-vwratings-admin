<template>
  <b-modal
    :title="entityComment.id ? 'Edit Comment' : 'Create Comment'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)">

    <b-form>
      <b-form-group label="User Id">
        <b-input type="text" v-model="entityComment.user_id"/>
      </b-form-group>
      <b-form-group label="Avi Id" v-if="method === 'aviComments'">
        <b-input type="text" v-model="entityComment.avis_id"/>
      </b-form-group>
      <b-form-group label="Party Id" v-if="method === 'partiesComments'">
        <b-input type="text" v-model="entityComment.party_id"/>
      </b-form-group>
      <b-form-group label="Content">
        <b-form-textarea rows="7" type="text" v-model="entityComment.content"/>
      </b-form-group>
      <b-form-group label="Opinion">
        <b-form-radio-group
          id="btn-radios-1"
          v-model="entityComment.opinion"
          :options="{1: 'Positive', 2: 'Negative', 0: 'Unset'}"
          name="radios-btn-default"
          buttons
        />
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="entityComment.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'entityCommentDialog',
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
      method: null,
      entityComment: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/entityComment', {
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
        this.entityComment.id = value.id;
        this.status = value.status;
        this.method = value.method;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.entityComment.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/entityComment/clear',
    }),
    clearData() {
      this.entityComment = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api[this.method]
        .get(this.entityComment.id)
        .then(response => {
          this.entityComment = response.data;
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
        .create(this.entityComment)
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
        .update(this.entityComment.id, this.entityComment)
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