<template>
  <v-app>
    <v-app-bar app dense color="primary" elevation="1">
<!--      <v-btn :disabled="appLoading" class="mr-3">Добавить задачу</v-btn>-->

      <v-text-field
          @click="showFilterDialog"
          :disabled="appLoading"
          placeholder="Найти"
          style="margin-left: -7px;"
          background-color="white"
          append-icon="mdi-magnify"
          full-width readonly hide-details outlined filled dense
      />

      <KanbanFilterInputs/>

      <v-btn
          class="ml-1"
          @click="getMyProjects" text small dark :disabled="appLoading">
        {{ myProjectsFilter ? "Все проекты" : "Мои проекты" }}
      </v-btn>

      <v-spacer/>

      <div>
        <router-link :key="route.name" v-for="route in fetchNavRoutes()" :to="route" style="text-decoration: none;">
          <v-btn
              :disabled="appLoading" text small class="px-1 ml-1" dark
              :class="$route.name === route.name ? 'v-btn--active' : ''">
            {{ route.title }}
          </v-btn>
        </router-link>
      </div>

<!--      <v-btn icon :disabled="appLoading">-->
<!--        <v-icon>mdi-cog</v-icon>-->
<!--      </v-btn>-->
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
import KanbanFilterInputs from "@/components/kanban/dialogs/KanbanFilterInputs.vue";

export default {
  name: "App",
  components: {KanbanFilterInputs, KanbanProgressLoader},

  data: () => ({
    editExpense: null,
    dialog: false,
    selectedUsers: [],
  }),

  methods: {
    ...mapActions({
      showFilterDialog: 'filterDialog/show',
      findMyProjects: 'kanban/findMyProjects',
      findAllProjects: 'kanban/findAllProjects',
    }),

    getMyProjects() {
      if (!this.myProjectsFilter)
        this.findMyProjects()
      else
        this.findAllProjects()
    },

    /** Формирование маршрутов из vue router */
    fetchNavRoutes() {
      return this.$router.options.routes.reduce((accumulator, route) => {
        const title = route.meta?.title;
        if (title) accumulator.push({name: route.name, title});
        return accumulator
      }, [])
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