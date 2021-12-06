<template>
  <EntitiesRatingsTable
    method="partiesRatings"
    entities="ratings"
  />
</template>
<script>
import EntitiesRatingsTable from "@/components/admin/tables/EntitiesRatingsTable";

export default {
  components: {
    EntitiesRatingsTable
  }
}
</script>