<template>
  <v-col cols="12">
    <p class="mb-1">Наименование задачи</p>

    <v-text-field
        v-model="taskTitle"
        hide-details outlined filled solo
    />
  </v-col>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TasksSearchInput",
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    taskTitle: ''
  }),

  methods: {
    ...mapActions({
      setTaskTitleFilter: 'filterDialog/setTaskTitleFilter'
    }),
  },

  watch: {
    taskTitle(v) {
      this.setTaskTitleFilter(v)
    }
  },

  computed: {},
}
</script>
