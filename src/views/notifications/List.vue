<template>
  <div class="notificationsList">
    <NotificationsTable method="usersNotifications" />
  </div>
</template>
<script>
import NotificationsTable from "../../components/admin/tables/NotificationsTable";

export default {
  components: {
    NotificationsTable
  }
}
</script>