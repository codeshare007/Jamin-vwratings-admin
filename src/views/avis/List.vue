<template>
  <div class="avisPage">
    <div class="d-flex justify-content-between mb-3">
      <b-col class="p-0  d-flex justify-items-start">
        <b-pagination
          class="m-0"
          v-model="currentPage"
          @change="handlePageChange"
          :total-rows="total"
        />
      </b-col>
      <b-col cols="3" class="p-0 d-flex justify-content-end align-items-center">
        <b-button variant="success" @click="create" class="mr-2">Create</b-button>
        <b-button variant="primary" @click="fetchAvis">
          <b-icon-arrow-clockwise/>
        </b-button>
      </b-col>
    </div>

    <b-table
      ref="avisTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :fields="avisFields"
      :busy="loading"
      :items="avis"
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

      <template #head(id)="data">
        <b-form-group class="mb-3">
          <b-form-input placeholder="id" v-model="search_id"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(username)="data">
        <b-form-group class="mb-3">
          <b-form-input placeholder="username" v-model="search_username"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(name)="data">
        <b-form-group class="mb-3">
          <b-form-input placeholder="name" v-model="search_name"/>
        </b-form-group>
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

    </b-table>
    <b-pagination
      v-model="currentPage"
      @change="handlePageChange"
      :total-rows="total"
    />

    <b-modal ref="bulkModal" title="Delete Avis" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected avis?
    </b-modal>

    <b-modal ref="deleteModal" title="Delete Avi" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this avi?
    </b-modal>

  </div>
</template>
<script>
import moment from "moment";
import {mapActions} from "vuex";

export default {
  data() {
    return {
      ids: [],
      avis: [],
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
      // search
      search_id: '',
      search_username: '',
      search_name: '',
      //
      avisFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'id', label: '#', sortable: true, thStyle: 'width: 100px'},
        {key: 'username', label: 'user', sortable: true},
        {key: 'name', sortable: true},
        {
          key: 'created_at', thStyle: 'white-space: nowrap', sortable: true, formatter: createdAt => {
            return moment(createdAt).format('YYYY-MM-DD HH:mm')
          }
        },
        {key: 'actions', sortable: false}
      ]
    }
  },

  watch: {
    sortBy(data) {
      if (data) {
        this.params.sortBy = data;
        this.fetchAvis();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchAvis();
    },
    search_id(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'id';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchAvis()
    },
    search_username(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'username';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchAvis()
    },
    search_name(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'name';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchAvis()
    },
  },

  mounted() {
    this.fetchAvis()
  },

  methods: {
    ...mapActions({
      createAvi: 'dialogs/avi/create',
      editAvi: 'dialogs/avi/edit',
      fetchAvis: 'users/FETCH'
    }),

    create() {
      this.createAvi().then(() => {
        this.fetchAvis()
      })
    },

    edit(id) {
      this.editAvi(id).then(() => {
        this.fetchAvis()
      })
    },

    fetchAvis() {
      this.loading = true;
      this.$api.avis.fetch(this.currentPage, this.params).then(response => {
        this.avis = response.data.data.map(item => {
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
      this.avis = this.avis.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.avis.filter(item => {
        if (item.selected) return item.id
      })
        .map(item => item.id);
    },

    rowSelected() {
      this.ids = this.avis
        .filter(item => {
          if (item.selected) return item.id
        })
        .map(item => item.id);
    },

    remove() {
      this.$api.avis.delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.fetchAvis();
          this.deletableId = null;
        }
      })
    },

    bulkDelete() {
      this.$api.avis.bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchAvis();
      });
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show()
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchAvis()
    }
  }
}
</script>
<style lang="scss">
.avisPage {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>
