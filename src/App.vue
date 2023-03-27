<template>
  <v-app>
    <v-app-bar app dense color="primary" elevation="1">
      <!--      <v-btn :disabled="appLoading" class="mr-3">Добавить задачу</v-btn>-->
      <InputKanbanFilter :loading="appLoading" />
      <KanbanFilterInputs />

      <v-btn
          class="ml-1"
          @click="getMyProjects" text small dark :disabled="appLoading">
        {{ myProjectsFilter ? "Все проекты" : "Мои проекты" }}
      </v-btn>

      <v-spacer/>

      <KanbanTabs :loading="appLoading" />

      <v-divider vertical inset class="mx-2"/>

      <NewTasksBadgeDialog :loading="appLoading"/>
    </v-app-bar>

    <v-main>
      <keep-alive>
        <router-view v-if="!appLoading"/>
      </keep-alive>
      <KanbanProgressLoader v-show="appLoading"/>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import KanbanProgressLoader from "@/components/kanban/KanbanProgressLoader.vue";
import KanbanFilterInputs from "@/components/header/dialogs/KanbanFilterInputs.vue";
import KanbanTabs from "@/components/header/nav/KanbanTabs.vue";
import InputKanbanFilter from "@/components/header/InputKanbanFilter.vue";
import NewTasksBadgeDialog from "@/components/header/dialogs/NewTasksBadgeDialog.vue";

export default {
  name: "App",
  components: {NewTasksBadgeDialog, InputKanbanFilter, KanbanTabs, KanbanFilterInputs, KanbanProgressLoader},

  data: () => ({
    editExpense: null,
    dialog: false,
    selectedUsers: [],
  }),

  methods: {
    ...mapActions({
      findMyProjects: 'kanban/findMyProjects',
      findAllProjects: 'kanban/findAllProjects',
    }),

    getMyProjects() {
      if (!this.myProjectsFilter)
        this.findMyProjects()
      else
        this.findAllProjects()
    },
  },

  computed: {
    ...mapGetters({
      appLoading: 'loaders/appLoading',
      myProjectsFilter: 'kanban/myProjectsFilter'
    }),
  },
};
</script>

<style>
.theme--dark.v-btn--active::before {
  opacity: 1;
}

.v-btn:before {
  background-color: black;
}
</style>