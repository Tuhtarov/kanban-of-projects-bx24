<template>
  <BaseKanban :kanban="list" :stages="stages"/>
</template>

<script>
import BaseKanban from "@/components/kanban/BaseKanban.vue";
import {mapGetters} from "vuex";

export default {
  name: "InWorkKanban",
  components: {BaseKanban},
  computed: {
    ...mapGetters({
      list: 'kanban/inWorkList',
      stages: 'kanban/stages',
    }),
  },
}
</script>