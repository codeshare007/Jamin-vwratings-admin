<template>
  <div class="partiesAdmin">
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
        <b-button variant="primary" @click="fetchParties">
          <b-icon-arrow-clockwise/>
        </b-button>
      </b-col>
    </div>

    <b-table
      ref="partiesTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :fields="partiesFields"
      :busy="loading"
      :items="parties"
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
          <b-form-input v-model="search_id"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(username)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_username"/>
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(name)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_name"/>
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

    <b-modal ref="bulkModal" title="Delete parties" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected parties?
    </b-modal>

    <b-modal ref="deleteModal" title="Delete party" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this party?
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
      parties: [],
      // search
      search_id: '',
      search_username: '',
      search_name: '',
      //
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
      partiesFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'id', label: '#', sortable: true},
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
        this.fetchParties();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchParties();
    },
    search_id(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'id';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchParties()
    },
    search_username(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'username';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchParties()
    },
    search_name(value) {
      if (value.length > 1) {
        this.params.search = value;
        this.params.field = 'name';
      } else {
        delete this.params.search;
        delete this.params.field;
      }
      this.fetchParties()
    },
  },

  mounted() {
    this.fetchParties()
  },

  methods: {
    ...mapActions({
      createParty: 'dialogs/party/create',
      editParty: 'dialogs/party/edit',
    }),

    create() {
      this.createParty().then(() => this.fetchParties())
    },

    edit(id) {
      this.editParty(id).then(() => this.fetchParties())
    },

    fetchParties() {
      this.$api.parties
        .fetch(this.currentPage, this.params)
        .then(response => {
          this.parties = response.data.data.map(item => {
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
      this.parties = this.parties.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.parties.filter(item => {
        if (item.selected) return item.id
      }).map(item => item.id);
    },

    rowSelected() {
      this.ids = this.parties
        .filter(item => {
          if (item.selected) return item.id
        })
        .map(item => item.id);
    },

    remove() {
      this.$api.parties.delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.fetchParties();
          this.deletableId = null;
        }
      })
    },

    bulkDelete() {
      this.$api.parties.bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchParties();
      });
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show()
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchParties()
    }
  }
}
</script>
<style lang="scss">
.partiesAdmin {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>
