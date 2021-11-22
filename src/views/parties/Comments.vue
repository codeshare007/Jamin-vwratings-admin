<template>
  <div class="adminParties">
    <div class="d-flex justify-content-between mb-3">
      <b-col class="p-0  d-flex justify-items-start">
        <b-pagination class="m-0" v-model="currentPage" @change="handlePageChange" :total-rows="total"/>
        <div class="ml-3" v-if="ids.length > 0">
          <b-button class="mr-4" variant="danger" @click="$refs['bulkModal'].show()">Bulk Delete</b-button>
          <b-button variant="success" @click="bulkOpinion(1)">Set Positive</b-button>
          <b-button variant="danger" @click="bulkOpinion(2)">Set Negative</b-button>
          <b-button variant="dark" @click="bulkOpinion(0)">Remove Opinion</b-button>
        </div>
      </b-col>
      <b-col cols="4" class="p-0 d-flex justify-content-end align-items-center">
        <b-form-input
          class="mr-2 search-link"
          v-model="search"
          placeholder="Search..."/>
        <b-button variant="primary" @click="fetchPartiesComments()">
          <b-icon-arrow-clockwise/>
        </b-button>
      </b-col>
    </div>
    <b-table
      table-variant="light"
      ref="userTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :busy="loading"
      :items="comments"
      :fields="commentsFields"
    >

      <template #head(select)>
        <div class="d-flex justify-content-center align-items-center h-100">
          <b-checkbox type="checkbox" @change="selectAllRows"/>
        </div>
      </template>

      <template #cell(select)="row">
        <div class="d-flex justify-content-center align-items-center h-100">
          <b-checkbox
            type="checkbox"
            :checked="row.item.selected"
            v-model="row.item.selected"
            @change="rowSelected"
          />
        </div>
      </template>

      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(opinion)="row">
        {{ row.item.opinion | opinion }}
      </template>

      <template #cell(content)="row">
        <div>
          {{ row.item.content }}
        </div>

        <div v-for="(item, key) in row.item.attachments" :key="key">
          <viewer>
            <img class="adminComments__attachment" :src="item.path" :alt="item.filename"/>
          </viewer>
        </div>
      </template>

      <template #cell(actions)="row">
        <b-button variant="primary" size="sm" @click="edit(row.item.id)" class="mr-2">
          <b-icon-pencil/>
        </b-button>
        <b-button variant="danger" size="sm" @click="showDeleteModal(row.item.id)">
          <b-icon-trash/>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

    <b-modal
      ref="bulkModal"
      title="Delete Comments"
      @ok="bulkDelete"
      ok-variant="danger"
      ok-title="Delete">
      Are you sure that you want to delete selected comments?
    </b-modal>

    <b-modal
      ref="deleteModal"
      title="Delete Comment"
      @ok="remove"
      ok-variant="danger"
      ok-title="Delete">
      Are you sure that you want to delete this comment?
    </b-modal>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      ids: [],
      comments: [],
      loading: false,
      selectAll: false,
      sortBy: 'created_at',
      search: '',
      currentPage: 1,
      total: 1,
      isDesc: false,
      params: {
        search: '',
        sortBy: 'created_at',
        sort: 'desc',
        page: 1
      },
      commentsFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'id', label: '#', sortable: true},
        {key: 'username', label: 'user', sortable: true},
        {key: 'name', label: 'party', sortable: true},
        {key: 'content'},
        {key: 'opinion', sortable: true},
        {key: 'actions', thStyle: 'min-width: 120px', sortable: false}
      ]
    }
  },

  filters: {
    opinion(data) {
      if (data === 1) return 'positive';
      if (data === 2) return 'negative';

      return '—'
    }
  },

  watch: {
    sortBy(data) {
      if (data) {
        this.params.sortBy = data;
        this.fetchPartiesComments();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchPartiesComments();
    },
    search(data) {
      this.params.search = data;
      this.fetchPartiesComments()
    }
  },

  mounted() {
    this.fetchPartiesComments()
  },

  methods: {
    ...mapActions({
      editPartyComment: 'dialogs/partyComment/edit',
    }),

    edit(id) {
      this.editPartyComment(id).then(() => this.fetchPartiesComments());
    },

    remove() {
      this.$api.partiesComments
        .delete(this.deletableId)
        .then(response => {
          if (response.data.status === 'success') {
            this.fetchPartiesComments();
            this.deletableId = null;
          }
        })
    },


    fetchPartiesComments() {
      this.$api.partiesComments
        .fetch(this.currentPage, this.params)
        .then(response => {
          this.comments = response.data.data.map(item => {
            item.selected = false;
            return item;
          });
          this.currentPage = response.data.current_page;
          this.total = response.data.total;
          this.loading = false;
        })
    },

    selectAllRows() {
      this.selectAll = !this.selectAll;
      this.comments = this.comments.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.comments
        .filter(item => {
          if (item.selected) return item.id
        }).map(item => item.id);
    },

    rowSelected() {
      this.ids = this.comments
        .filter(item => {
          if (item.selected) return item.id
        }).map(item => item.id);
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show()
    },

    bulkOpinion(opinion) {
      this.$api.partiesComments.bulkOpinion(this.ids, opinion).then(() => {
        this.ids = [];
        this.fetchPartiesComments();
      })
    },

    bulkDelete() {
      this.$api.partiesComments.bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchPartiesComments();
      });
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchPartiesComments()
    }
  }
}
</script>
<style lang="scss">
.adminParties {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  &__attachment {
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
}
</style>