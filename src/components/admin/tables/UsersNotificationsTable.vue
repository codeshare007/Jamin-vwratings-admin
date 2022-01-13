<template>
  <div class="notificationsTable">

    <h2 class="mb-4">Users Notifications</h2>

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
      ref="notificationsTable"
      no-local-sorting
      :sort-by.sync="sortBy"
      :sort-desc.sync="isDesc"
      :no-footer-sorting="false"
      :fields="notificationsFields"
      :busy="loading"
      :items="items">
      <template #head(select)>
        <div class="d-flex flex-column align-items-center">
          <b-button
            :disabled="ids.length === 0"
            variant="danger"
            class="mb-3"
            @click="$refs['bulkModal'].show()"
          ><b-icon-trash/>
          </b-button>
          <div class="d-flex justify-content-center align-items-center h-100">
            <b-checkbox type="checkbox" @change="selectAllRows"/>
          </div>
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

      <template #head(content)="data">
        <b-form-group class="mb-3">
          <b-form-input v-model="search_content" placeholder="content" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(created_at)="data">
        <b-form-group class="mb-3">
          <b-form-datepicker v-model="search_created_at" placeholder="created_at" />
        </b-form-group>
        <span>{{ data.label }}</span>
      </template>

      <template #head(actions)="data">
        <div class="mb-3">
          <b-button variant="success" @click="create" class="mr-2">Create</b-button>
          <b-button variant="primary" @click="fetchNotifications">
            <b-icon-arrow-clockwise />
          </b-button>
        </div>
        <span>{{ data.label }}</span>
      </template>

      <template #cell(index)="data">
        {{ data.index + 1 }}
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

      <template #cell(actions)="row">
        <div class="d-flex justify-content-center">
          <b-button class="mr-2" variant="primary" size="sm" @click="edit(row.item.id)">
            <b-icon-pencil/>
          </b-button>
          <b-button variant="danger" size="sm" @click="showDeleteModal(row.item.id)">
            <b-icon-trash/>
          </b-button>
        </div>
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

    <b-modal ref="bulkModal" :title="`Delete notifications`" @ok="bulkDelete" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete selected notifications?
    </b-modal>

    <b-modal ref="deleteModal" :title="`Delete notification`" @ok="remove" ok-variant="danger" ok-title="Delete">
      Are you sure that you want to delete this notification?
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
      items: [],
      loading: false,
      selectAll: false,
      sortBy: 'created_at',
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
      search_content: '',
      search_created_at: '',
      //
      notificationsFields: [
        {key: 'select', label: '', sortable: false, thStyle: 'width: 60px'},
        {key: 'id', label: '#', sortable: true, thStyle: 'width: 100px'},
        {key: 'username', label: 'User', thStyle: 'width: 200px', sortable: true},
        {key: 'content'},
        {
          key: 'created_at', thStyle: 'white-space: nowrap; width: 300px', sortable: true, formatter: createdAt => {
            return moment(createdAt).format('YYYY-MM-DD HH:mm')
          }
        },
        {key: 'actions', thStyle: 'width: 150px', sortable: false}
      ]
    }
  },

  watch: {
    sortBy(data) {
      if (data) {
        this.params.sortBy = data;
        this.fetchNotifications();
      }
    },
    isDesc(data) {
      this.params.sort = (data === true ? 'desc' : 'asc')
      this.fetchNotifications();
    },
    search_id(value) {
      value.length > 1 ? this.params.id = value : this.$delete(this.params, 'id');
      this.fetchNotifications()
    },
    search_username(value) {
      value.length > 1 ? this.params.username = value : this.$delete(this.params, 'username');
      this.fetchNotifications()
    },
    search_content(value) {
      value.length > 1 ? this.params.content = value : this.$delete(this.params, 'content');
      this.fetchNotifications()
    },
  },

  mounted() {
    this.fetchNotifications()
  },

  methods: {
    ...mapActions({
      createNotification: 'dialogs/userNotification/create',
      editNotification: 'dialogs/userNotification/edit',
    }),

    create() {
      this.createNotification().then(() => {
        this.fetchNotifications()
      })
    },

    edit(id) {
      this.editNotification(id).then(() => {
        this.fetchNotifications()
      })
    },

    fetchNotifications() {
      this.loading = true;
      this.$api.usersNotifications.fetch(this.currentPage, this.params).then(response => {
        this.items = response.data.data.map(item => { item.selected = false; return item; });
        this.currentPage = response.data['current_page'];
        this.total = response.data.total;
        this.loading = false;
      })
    },

    selectAllRows() {
      this.selectAll = !this.selectAll;
      this.items = this.items.map(item => {
        item.selected = this.selectAll;
        return item;
      })

      this.ids = this.items.filter(item => {
        if (item.selected) return item.id
      }).map(item => item.id);
    },

    rowSelected() {
      this.ids = this.items
        .filter(item => {
          if (item.selected) return item.id
        })
        .map(item => item.id);
    },

    remove() {
      this.$api.usersNotifications.delete(this.deletableId).then(response => {
        if (response.data.status === 'success') {
          this.deletableId = null;
          this.fetchNotifications();
        }
      })
    },

    bulkDelete() {
      this.$api.usersNotifications.bulkDelete(this.ids).then(() => {
        this.ids = [];
        this.fetchNotifications();
      });
    },

    showDeleteModal(id) {
      this.deletableId = id;
      this.$refs['deleteModal'].show()
    },

    handlePageChange(value) {
      this.params.page = value;
      this.fetchNotifications()
    }
  }
}
</script>
<style lang="scss">
.notificationsTable {
  border-radius: 5px;
  margin-bottom: 100px;

  .table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
  .table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
    background-position: right 73px;
  }
}
</style>