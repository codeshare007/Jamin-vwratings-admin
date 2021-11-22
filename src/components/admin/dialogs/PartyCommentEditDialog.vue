<template>
  <b-modal
    :title="partyComment.id ? 'Edit Comment' : 'Create Comment'"
    :visible.sync="visible"
    @submit.prevent.native=""
    @hide="handleClose(null)"
  >
    <b-form>
      <b-form-group label="User Id">
        <b-input type="text" v-model="partyComment.user_id"/>
      </b-form-group>
      <b-form-group label="Party Id">
        <b-input type="text" v-model="partyComment.party_id"/>
      </b-form-group>
      <b-form-group label="Content">
        <b-form-textarea rows="7" type="text" v-model="partyComment.content"/>
      </b-form-group>
      <b-form-group label="Opinion">
        <b-form-radio-group
          id="btn-radios-1"
          v-model="partyComment.opinion"
          :options="{1: 'Positive', 2: 'Negative', 0: 'Unset'}"
          name="radios-btn-default"
          buttons
        />
      </b-form-group>
    </b-form>

    <template #modal-footer="{ ok, cancel }">
      <b-button @click="handleClose(null) && cancel()">Cancel</b-button>
      <b-button variant="primary" v-if="partyComment.id" @click="edit() && ok()">Save</b-button>
      <b-button variant="success" v-else @click="create" :disabled="loading">Create</b-button>
    </template>
  </b-modal>
</template>
<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'partyCommentDialog',
  data() {
    let initialState = {
      id: null,
      user_id: null,
      party_id: null,
      opinion: null,
      content: null
    };
    return {
      loading: false,
      status: 'hidden',
      resolve: null,
      reject: null,
      partyComment: initialState,
      initialState: initialState,
      error: null
    }
  },

  computed: {
    ...mapState('dialogs/partyComment', {
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
        this.partyComment.id = value.id;
        this.status = value.status;
        this.resolve = value.resolve;
        this.reject = value.reject;
        if (this.partyComment.id) this.load();
      }
    }
  },

  methods: {
    ...mapActions({
      close: 'dialogs/partyComment/clear',
    }),
    clearData() {
      this.partyComment = this.initialState;
    },
    handleClose(done = null) {
      done ? done() : this.status = 'hidden';
    },
    load() {
      this.loading = true;
      this.$api.partiesComments
        .get(this.partyComment.id)
        .then(response => {
          this.partyComment = response.data;
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
      this.$api.partiesComments
        .create(this.partyComment)
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
      this.$api.partiesComments
        .update(this.partyComment.id, this.partyComment)
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