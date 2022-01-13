<template>
  <div class="notificationsList">
    <UsersNotificationsTable method="usersNotifications" />
  </div>
</template>
<script>
import UsersNotificationsTable from "@/components/admin/tables/UsersNotificationsTable";

export default {
  components: {
    UsersNotificationsTable
  }
}
</script>