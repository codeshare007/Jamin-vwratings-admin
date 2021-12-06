<template>
  <div class="entitiesCommentsTable">
    <div class="d-flex justify-content-between mb-3">
      <b-col class="p-0  d-flex justify-items-start">
        <b-pagination
          class="m-0"
          v-model="currentPage"
          @change="handlePageChange"
          :total-rows="total"
        />
        <div class="ml-3" v-if="ids.length > 0">
          <b-button
            v-for="(item, key) in bulkOptions"
            :key="key"
            :variant="item.variant"
            v-html="item.label"
            class="mr-2"
            @click="bulkOpinion(item.value)"
          />
        </div>
      </b-col>
      <b-col cols="4" class="p-0 d-flex justify-content-end align-items-center">
        <b-button variant="primary" @click="fetchComments">
          <b-icon-arrow-clockwise/>
        </b-button>
      </b-col>
    </div>
    <b-table
      table-variant="light"
      ref="commentsTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :busy="loading"
      :items="comments"
      :fields="commentsFields"
    >

      <template #head(select)>
        <div class="d-flex flex-column align-items-center">
          <b-button
            v-if="ids.length > 0"
            variant="danger"
            size="sm"
            class="mb-3"
            @click="$refs['bulkModal'].show()"
          >
            <b-icon-trash/>
          </b-button>
          <div class="d-flex justify-content-center align-items-center h-100">
            <b-checkbox type="checkbox" @change="selectAllRows"/>
          </div>
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

      <template #head(id)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_id" placeholder="id"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(username)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_username" placeholder="username"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(name)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_name" placeholder="name"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(content)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_content" placeholder="comment"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>

      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(name)="row">
        <a :href="'/' + entities + '/' + row.item['entity_id']" target="_blank">{{ row.item.name }}</a>
      </template>

      <template #cell(opinion)="row">
        {{ row.item.opinion | opinion }}
      </template>

      <template #cell(content)="row">
        <div>{{ row.item.content }}</div>
        <div v-for="(item, key) in row.item.attachments" :key="key">
          <viewer>
            <img class="entitiesCommentsTable__attachment" :src="item.path" :alt="item.filename"/>
          </viewer>
        </div>
      </template>

      <template #cell(actions)="row">
        <b-button
          variant="primary"
          size="sm"
          class="mr-2"
          @click="edit(row.item.id)">
          <b-icon-pencil/>
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="showDeleteModal(row.item.id)">
          <b-icon-trash/>
        </b-button>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

    <b-modal ref="bulkModal" title="Delete Comments" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected comments?
    </b-modal>

    <b-modal ref="deleteModal" title="Delete Comment" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this comment?
    </b-modal>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {

  props: {
    method: String,
    entities: String,
    entity: String
  },

  data() {
    return {
      ids: [],
      comments: [],
      loading: false,
      selectAll: false,
      sortBy: 'created_at',
      currentPage: 1,
      total: 1,
      isDesc: false,
      params: {
        sortBy: 'created_at',
        sort: 'desc',
        page: 1
      },
      search_id: '',
      search_username: '',
      search_name: '',
      search_content: '',
      bulkOptions: [
        {variant: 'success', label: 'Set Positive', value: 1},
        {variant: 'danger', label: 'Set Negative', value: 2},
        {variant: 'dark', label: 'Remove Opinion', value: 0}
      ],
      commentsFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'id', label: '#', sortable: true, thStyle: 'width: 100px'},
        {key: 'username', label: 'user', sortable: true, thStyle: 'width: 100px'},
        {key: 'name', label: 'avi', sortable: true},
        {key: 'content', label: 'content'},
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
        this.fetchComments();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchComments();
    },
    search_id(value) {
      value.length > 1 ? this.params.id = value : this.$delete(this.params, 'id')
      this.fetchComments()
    },
    search_username(value) {
      value.length > 1 ? this.params.username = value : this.$delete(this.params, 'username')
      this.fetchComments()
    },
    search_name(value) {
      value.length > 1 ? this.params.name = value : this.$delete(this.params, 'name')
      this.fetchComments()
    },
    search_content(value) {
      value.length > 1 ? this.params.content = value : this.$delete(this.params, 'content')
      this.fetchComments()
    }
  },

  mounted() {
    this.fetchComments()
  },

  methods: {
    ...mapActions({
      editEntityComment: 'dialogs/entityComment/edit'
    }),

    edit(id) {
      this.editEntityComment({id: id, method: this.method}).then(() => {
        this.fetchComments()
      });
    },

    remove() {
      this.$api[this.method].delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.deletableId = null;
          this.fetchComments();
        }
      })
    },

    fetchComments() {
      this.loading = true;
      this.$api[this.method].fetch(this.currentPage, this.params).then(response => {
        this.comments = response.data.data.map(item => {
          if (item.claimed_until) item._rowVariant = 'info';
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
      this.$api[this.method].bulkOpinion(this.ids, opinion).then(() => {
        this.ids = [];
        this.fetchComments();
      })
    },

    bulkDelete() {
      this.$api[this.method].bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchComments();
      });
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchComments()
    }
  }
}
</script>
<style lang="scss">
.entitiesCommentsTable {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  &__attachment {
    cursor: pointer;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>