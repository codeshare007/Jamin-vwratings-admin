<template>
  <div class="adminRatings">
    <div class="d-flex justify-content-between mb-3">
      <b-col class="p-0 d-flex justify-items-start">
        <b-pagination
          class="m-0"
          v-model="currentPage"
          @change="handlePageChange"
          :total-rows="total"
        />
      </b-col>
    </div>

    <b-table
      ref="ratingsTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :fields="ratingFields"
      :busy="loading"
      :items="ratings"
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

      <template #head(username)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_username" placeholder="username" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(name)>
        <b-form-group class="mb-3">
          <b-form-input v-model="search_name" placeholder="name" />
        </b-form-group>
        <span>avi/party name</span>
      </template>

      <template #head(actions)="data">
        <div class="mb-3 d-flex justify-content-end">
          <b-button variant="primary" size="sm" @click="fetchRatings">
            <b-icon-arrow-clockwise/>
          </b-button>
        </div>
        <span>{{ data.label }}</span>
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

      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(actions)="row">
        <b-button class="mr-2" variant="primary" size="sm" @click="edit(row.item.id)">
          <b-icon-pencil/>
        </b-button>
        <b-button variant="danger" size="sm" @click="showDeleteModal(row.item.id)">
          <b-icon-trash/>
        </b-button>
      </template>

      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

    <b-modal ref="bulkModal" title="Delete Rating" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected ratings?
    </b-modal>

    <b-modal ref="deleteModal" title="Delete Rating" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this rating?
    </b-modal>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {

  props: {
    method: String
  },

  data() {
    return {
      ids: [],
      ratings: [],
      loading: false,
      currentPage: 1,
      total: 1,
      sortBy: 'created_at',
      isDesc: false,
      params: {
        sortBy: 'created_at',
        sort: 'desc',
        page: 1
      },
      search_name: '',
      search_username: '',
      ratingFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'index', label: '#', sortable: true},
        {key: 'username', label: 'user', sortable: true},
        {key: 'name', sortable: true},
        {key: 'rating'},
        {
          key: 'created_at', formatter: createdAt => {
            return moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
          }, sortable: true
        },
        {
          key: 'updated_at', formatter: createdAt => {
            return moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
          }, sortable: true
        },
        {key: 'actions', thStyle: 'width: 105px'}
      ]
    }
  },

  watch: {
    sortBy(data) {
      if (data) {
        this.params.sortBy = data;
        this.fetchRatings();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchRatings();
    },
    search_username(value) {
      value.length > 1 ? this.params.username = value : this.$delete(this.params, 'username');
      this.fetchRatings();
    },
    search_name(value) {
      value.length > 1 ? this.params.name = value : this.$delete(this.params, 'name');
      this.fetchRatings();
    },
  },

  mounted() {
    this.fetchRatings()
  },

  methods: {
    ...mapActions({editEntityRating: 'dialogs/entityRating/edit'}),

    edit(id) {
      this.editEntityRating({id: id, method: this.method}).then(() => this.fetchRatings())
    },

    fetchRatings() {
      this.loading = true;
      this.$api[this.method].fetch(this.currentPage, this.params).then(response => {
        this.ratings = response.data.data;
        this.currentPage = response.data['current_page'];
        this.total = response.data.total;
        this.loading = false;
      })
    },

    selectAllRows() {
      this.selectAll = !this.selectAll;
      this.ratings = this.ratings.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.ratings.filter(item => {
        if (item.selected) return item.id
      }).map(item => item.id);
    },

    rowSelected() {
      this.ids = this.ratings
        .filter(item => {if (item.selected) return item.id})
        .map(item => item.id);
    },

    remove() {
      this.$api[this.method].delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.fetchRatings();
          this.deletableId = null;
        }
      })
    },

    bulkDelete() {
      this.$api[this.method].bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchRatings();
      });
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show();
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchRatings();
    }
  }
}
</script>
<style lang="scss">
.adminRatings {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>
