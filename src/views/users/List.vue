<template>
  <div class="adminUsers">
    <div class="d-flex justify-content-between mb-3">
      <b-col class="p-0  d-flex justify-items-start">
        <b-pagination
          class="m-0"
          v-model="currentPage"
          @change="handlePageChange"
          :total-rows="total"
        />
      </b-col>
    </div>

    <b-table
      ref="userTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :busy="loading"
      :items="users"
      :fields="usersFields">

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

      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle" />
        </div>
      </template>

      <template #head(id)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_id" placeholder="id" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(username)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_username" placeholder="username" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(email)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_email" placeholder="email" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(ip_address)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_ip" placeholder="ip address" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(actions)="data">
        <div class="mb-3">
          <b-button variant="success" @click="create" class="mr-2">Create</b-button>
          <b-button variant="primary" @click="reloadPage">
            <b-icon-arrow-clockwise/>
          </b-button>
        </div>
        <span>{{ data.label }}</span>
      </template>

      <template #cell(select)="data">
        <div class="d-flex justify-content-center align-items-center h-100">
          <b-checkbox
            type="checkbox"
            :checked="data.item.selected"
            @change="rowSelected"
            v-model="data.item.selected"
          />
        </div>
      </template>

      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(actions)="data">
        <div class="d-flex">
          <b-button class="mr-2" variant="primary" size="sm" @click="edit(data.item.id)">
            <b-icon-pencil/>
          </b-button>
          <b-button
            variant="danger"
            size="sm" @click="showDeleteModal(data.item.id)">
            <b-icon-trash/>
          </b-button>
        </div>
      </template>
    </b-table>

    <b-pagination v-model="currentPage" @change="handlePageChange" :total-rows="total" />

    <b-modal ref="bulkModal" title="Delete Users" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected users?
    </b-modal>

    <b-modal ref="deleteModal" title="Delete User" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this user?
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
      users: [],
      loading: false,
      selectAll: false,
      sortBy: 'created_at',
      currentPage: 1,
      deletableId: null,
      total: 1,
      isDesc: false,
      // search
      search_id: '',
      search_username: '',
      search_email: '',
      search_ip: '',
      //
      params: {
        search: '',
        sortBy: 'created_at',
        sort: 'desc',
        page: 1
      },
      usersFields: [
        {key: 'select', label: '', sortable: false},
        {key: 'id', label: '#', sortable: true, thStyle: 'width: 100px'},
        {key: 'username', sortable: true},
        {
          key: 'email', formatter: item => {
            return item ? item : '—'
          }, sortable: true
        },
        {key: 'ip_address', label: 'IP address', sortable: true, thStyle: 'width: 150px'},
        {key: 'role', label: 'Status', sortable: true},		
        {
          key: 'created_at', thStyle: 'white-space: nowrap', sortable: true, formatter: createdAt => {
            return moment(createdAt).format('YYYY-MM-DD HH:mm')
          }
        },
        {key: 'actions', label: 'actions', sortable: false}
      ]
    }
  },

  filters: {
  },

  watch: {
    sortBy(data) {
      if (data) {
        this.params.sortBy = data;
        this.fetchUsers();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchUsers();
    },
    search_id(value) {
      value.length > 1 ? this.params.id = value : this.$delete(this.params, 'id')
      this.fetchUsers()
    },
    search_username(value) {
      value.length > 1 ? this.params.username = value : this.$delete(this.params, 'username')
      this.fetchUsers()
    },
    search_email(value) {
      value.length > 1 ? this.params.email = value : this.$delete(this.params, 'email')
      this.fetchUsers()
    },
    search_ip(value) {
      value.length > 1 ? this.params.ip = value : this.$delete(this.params, 'ip')
      this.fetchUsers()
    },
  },

  mounted() {
    this.fetchUsers()
  },

  methods: {
    ...mapActions({
      createUser: 'dialogs/user/create',
      editUser: 'dialogs/user/edit',
      fetchUsers: 'users/FETCH',
		reloadPage() {
		window.location.reload();
		}	  
    }),

    fetchUsers() {
      this.loading = true;
      this.$api.users.fetch(this.currentPage, this.params).then(response => {
        this.users = response.data.data.map(item => {
          item.selected = false;
          return item;
        });
        this.currentPage = response.data.current_page;
        this.total = response.data.total;
        this.loading = false;
      })
    },

    create() {
      this.createUser().then(() => this.fetchUsers());
    },
    edit(id) {
      this.editUser(id).then(() => this.fetchUsers());
    },
    remove() {
      this.$api.users.delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.fetchUsers();
          this.deletableId = null;
        }
      })
    },

    bulkDelete() {
      this.$api.users.bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchUsers();
      });
    },

    selectAllRows() {
      this.selectAll = !this.selectAll;
      this.users = this.users.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.users
        .filter(item => {
          if (item.selected) return item.id
        })
        .map(item => item.id);
    },

    rowSelected() {
      this.ids = this.users
        .filter(item => {
          if (item.selected) return item.id
        })
        .map(item => item.id);
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show()
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchUsers()
    }
  }
}
</script>
<style lang="scss">
.adminUsers {
  padding: 25px;
  border-radius: 5px;
  margin-bottom: 100px;

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>