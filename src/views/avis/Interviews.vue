<template>
  <div class="avisInterviewsTable">
    <EntitiesInterviewsTable entities="avis" entity="avi" method="avisInterviews" />
  </div>
</template>
<script>
import EntitiesInterviewsTable from "@/components/admin/tables/EntitiesInterviewsTable";

export default {
  components: {
    EntitiesInterviewsTable
  }
}
</script>