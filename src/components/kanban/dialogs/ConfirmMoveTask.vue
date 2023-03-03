<template>
  <v-dialog :value="dialogReady" width="auto" max-width="600"
      @keydown="escapeClose" @click:outside="cancelMove"
  >
    <v-card>
      <v-app-bar color="grey lighten-4">
        <v-toolbar-title>Подтвердите действие</v-toolbar-title>
      </v-app-bar>

      <v-card-subtitle style="color: black;" class="mt-3">
        <b>Перемещение задачи</b><br>
        {{ taskTitle }}
      </v-card-subtitle>

      <v-card-text style="color: black;">
        <b>На проект</b><br>
        {{ toProjectTitle }}
        <br><br>

        <template v-if="fromStageTitle !== toStageTitle">
          <b>{{ fromStageTitle }}</b> --> <b>{{ toStageTitle }}</b>
        </template>
      </v-card-text>

      <v-card-actions class="py-3">
        <v-btn small @click="cancelMove" class="mr-8" color="error">Отменить</v-btn>
        <v-spacer/>
        <v-btn small @click="saveMove" color="success">Подтвердить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ConfirmMoveTask",

  methods: {
    escapeClose(e) {
      if (e.key === 'Escape') this.cancelMove()
    },

    cancelMove() {
      this.setMoved(null)
      this.toBackCb()
    },

    saveMove() {
      this.confirmMoved(this.movedTask)
          .then(() => {
            this.setMoved(null)
          })
          .catch(this.cancelMove)
    },

    ...mapActions({
      setMoved: 'confirmMoveTaskDialog/setMoved',
      confirmMoved: 'confirmMoveTaskDialog/confirmMoved'
    })
  },

  computed: {
    ...mapGetters({
      movedTask: 'confirmMoveTaskDialog/moved',
      dialogReady: 'confirmMoveTaskDialog/ready',
      taskTitle: 'confirmMoveTaskDialog/taskTitle',
      toProjectTitle: 'confirmMoveTaskDialog/toProjectTitle',
      fromStageTitle: 'confirmMoveTaskDialog/fromStageTitle',
      toStageTitle: 'confirmMoveTaskDialog/toStageTitle',
      toBackCb: 'confirmMoveTaskDialog/toBackCb'
    }),
  }
}
</script>

<style scoped>

</style>