<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-badge :value="newTasksCnt > 0" color="black" overlap :content="newTasksCnt" :dot="loading">
        <v-btn
            :disabled="loading" text small class="px-3" dark
            v-bind="attrs" v-on="on"
        >
          Новые
        </v-btn>
      </v-badge>
    </template>

    <v-card max-height="500">
      <v-card-title class="grey lighten-2" style="padding-left: 16px;">
        Новые задачи
      </v-card-title>

      <v-list density="compact" class="mt-2">
        <v-list-item
            v-for="(task, i) in newTasks"
            :key="i"
            link
            @click="goto(task)"
            :title="`Задача №${task.ID}`"
        >
          <v-list-item-title style="font-size: 0.9rem;">
            <b>{{ task.GROUP_NAME }}</b>: {{ task.TITLE }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NewTasksBadgeDialog",
  props: ['loading'],

  data: () => ({
    dialog: false
  }),

  methods: {
    goto(task) {
      window.BX24.openPath(
          '/company/personal/user/' + task.RESPONSIBLE_ID + '/tasks/task/view/' + task.ID + '/'
      );
    }
  },

  computed: {
    ...mapGetters('kanban', [
      'newTasksCnt',
      'newTasks'
    ])
  }
}
</script>

<style scoped>

</style>