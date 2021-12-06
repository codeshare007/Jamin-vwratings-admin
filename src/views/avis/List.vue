<template>
  <div class="avisList">
    <EntitiesTable entities="avis" entity="avi" />
  </div>
</template>
<script>
  import EntitiesTable from "@/components/admin/tables/EntitiesTable";
  export default {
    components: {
      EntitiesTable
    }
  }
</script>