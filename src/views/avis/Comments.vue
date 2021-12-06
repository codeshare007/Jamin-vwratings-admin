<template>
  <div>
    <EntitiesCommentsTable method="avisComments" entities="avis" entity="avi"/>
  </div>
</template>
<script>
import EntitiesCommentsTable from '@/components/admin/tables/EntitiesCommentsTable'

export default {
  components: {
    EntitiesCommentsTable
  }
}
</script>