<template>
  <div>
    <router-link :key="route.name" v-for="route in fetchNavRoutes()" :to="route" style="text-decoration: none;">
      <v-badge
          v-if="route.name === 'planned'"
          overlap color="black"
          :dot="loading"
          :value="plannedTasksCnt > 0"
          :content="plannedTasksCnt"
      >
        <v-btn
            :disabled="loading" text small class="px-2 pr-3 ml-2" dark
            :class="$route.name === route.name ? 'v-btn--active' : ''">
          {{ route.title }}
        </v-btn>
      </v-badge>

      <v-btn
          v-else
          :disabled="loading" text small class="px-2 ml-4" dark
          :class="$route.name === route.name ? 'v-btn--active' : ''">
        {{ route.title }}
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "KanbanTabs",
  components: {},
  props: ['loading'],

  methods: {
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
      plannedTasksCnt: 'kanban/plannedTasksCnt',
      myProjectsFilter: 'kanban/myProjectsFilter'
    }),
  }
}
</script>

<style scoped>

</style>