<template>
  <BaseKanban :kanban="list" :stages="stages"/>
</template>

<script>
import BaseKanban from "@/components/kanban/BaseKanban.vue";
import {mapGetters} from "vuex";

export default {
  name: "PlannedKanban",
  components: {BaseKanban},
  computed: {
    ...mapGetters({
      list: 'kanban/plannedList',
      stages: 'kanban/plannedStages'
    })
  }
}
</script>