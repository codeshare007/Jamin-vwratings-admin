<template>
  <div class="partiesList">
    <EntitiesTable entities="parties" entity="party" />
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