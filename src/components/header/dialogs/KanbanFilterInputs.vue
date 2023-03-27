<template>
  <v-dialog :value="dialog" max-width="1000">
    <v-card :loading="loading" :disabled="loading">
      <v-app-bar color="grey lighten-4">
        <v-toolbar-title>Фильтр</v-toolbar-title>
      </v-app-bar>

      <v-container>
        <v-row class="pb-5">
          <TasksSearchInput :loading="loading" />
          <UsersFilterInput :users="users" :loading="loading" />
          <ProjectsFilterInput :projects="projects" :loading="loading" />
        </v-row>
      </v-container>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="grey lighten-3" class="px-5" :disabled="loading" @click="reload">
          Сбросить
          <v-icon right>mdi-update</v-icon>
        </v-btn>
        <v-btn color="success" class="px-5" :disabled="!searchReady" @click="search">Поиск</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UsersFilterInput from "@/components/header/dialogs/inputs/UsersFilterInput.vue";
import ProjectsFilterInput from "@/components/header/dialogs/inputs/ProjectsFilterInput.vue";
import {mapActions, mapGetters} from "vuex";
import TasksSearchInput from "@/components/header/dialogs/inputs/TasksSearchInput.vue";

export default {
  name: "KanbanFilterInputs",
  components: {TasksSearchInput, ProjectsFilterInput, UsersFilterInput},

  data: () => ({
  }),

  methods: {
    ...mapActions({
      search: 'filterDialog/search',
      reload: 'filterDialog/reload'
    }),
  },

  computed: {
    ...mapGetters({
      users: 'users/all',
      projects: 'kanban/projects',
      loading: 'loaders/appLoading',
      dialog: 'filterDialog/dialog',

      filterReady: 'filterDialog/filterReady',
    }),

    searchReady() {
      return !this.loading && this.filterReady
    }
  }
}
</script>

<style scoped>
</style>