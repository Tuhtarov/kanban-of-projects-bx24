<template>
  <BaseKanban :kanban="list" :stages="stages"/>
</template>

<script>
import BaseKanban from "@/components/kanban/BaseKanban.vue";
import {mapGetters} from "vuex";

export default {
  name: "FullKanban",
  components: {BaseKanban},
  computed: {
    ...mapGetters({
      list: 'kanban/list',
      stages: 'kanban/stages'
    })
  },
}
</script>