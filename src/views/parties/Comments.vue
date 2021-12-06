<template>
  <div>
    <EntitiesCommentsTable method="partiesComments" entities="parties" entity="party" />
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