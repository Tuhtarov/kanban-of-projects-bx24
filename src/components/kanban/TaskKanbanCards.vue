<template>
  <div
      class="kanban-body-block dragging-place"
      :data-project-id="project.projectTaskId"
      :data-stage-title="stage.TITLE"
  >
    <template v-if="tasks(project, stage).length > 0">
      <v-card
          v-for="task in tasks(project, stage)"
          :key="`task${task.ID}`"
          @mousedown="onDragCard($event, task)"
          outlined
          elevation="3"
          rounded="5"
          class="ma-1 v-card--link"
      >
        <v-card-title class="card-title__small pb-0 pt-3" :title="task.TITLE">
          {{ titleOf(task) }}
        </v-card-title>

        <v-card-text class="pb-0 pt-1">
          <div v-show="task.TASK_TYPE" class="task-type">
            <span class="px-2">{{ task.TASK_TYPE }}</span>
          </div>

          <div class="my-progress-bar" title="Прогресс">
            <v-progress-linear
                :value="task.PROGRESS_TIME" :color="task.PROGRESS_TIME > 100 ?'#ff2a55':'#97c89a'"
                height="9" background-color="white" rounded
            />
          </div>

          <p class="mb-0" style="font-size: 12px;text-align: end;width: inherit;">
            {{ (task.TIME_SPENT_IN_LOGS / 3600).toFixed(1) }}ч / {{ task.TIME_ESTIMATE / 3600 }}ч
            <span v-if="task.PROGRESS_TIME > 0">- {{ task.PROGRESS_TIME }}%</span>
          </p>

          <p class="mb-0" style="font-size: 12px;text-align: end;width: inherit;">
            {{ task.DEADLINE }}
          </p>
        </v-card-text>

        <v-card-actions class="my-0 pt-0 pb-1 ps-3">
          <div :title="task.CREATOR_NAME">
            <img
                v-if="!task.CREATOR_AVATAR.includes('default_avatar.png')"
                class="my-card-avatar"
                width="24"
                height="24"
                :src="'https://crm.mywebstor.com'+task.CREATOR_AVATAR"
                :alt="task.CREATOR_NAME"
            >
            <v-icon size="24" v-else>mdi-account-circle</v-icon>
          </div>

          <v-spacer/>

          <v-btn
              icon
              :title="`Открыть шторку задачи №${task.ID}`"
              @click="goto(task)" class="link-task-btn" color="primary">
            <v-icon small>mdi-open-in-new</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>

<script>
const MAX_TITLE_LENGTH = 40;

export default {
  name: "TaskKanbanCards",
  props: ['project', 'stage'],
  emits: ['drag'],

  methods: {
    tasks(project, {TITLE}) {
      return project.tasks[TITLE] ?? []
    },

    titleOf(task) {
      if (task.TITLE.length < MAX_TITLE_LENGTH) return task.TITLE
      return task.TITLE.substr(0, MAX_TITLE_LENGTH) + '...'
    },

    onDragCard(event, task) {
      if (event.target.closest('.link-task-btn')) {
        this.goto(task)
        return;
      }

      let card = event.target.closest('.v-card');
      if (!card) return;
      card.ondragstart = () => false;

      this.$emit('drag', {event, task})
    },

    goto(task) {
      window.BX24.openPath(
          '/company/personal/user/' + task.RESPONSIBLE_ID + '/tasks/task/view/' + task.ID + '/'
      );
    }
  }
}
</script>

<style>
.my-progress-bar {
  min-width: 60%;
  border: 1px solid #949494;
  border-radius: 5px;
  height: 11px;
  margin-top: 5px;
}

.my-card-avatar {
  border-radius: 50%;
  width: 24px;
  display: block;
  margin: auto 0;
}

.task-type {
  display: inline-block;
  background-color: rgb(83, 77, 77);
  color: white;
  border-radius: 5px;
  line-height: 1.1;
  font-size: .7rem;
  padding: 2px 0 2px 0;
}

.card-title__small {
  font-weight: 400 !important;;
  letter-spacing: unset !important;
  line-height: 1.2rem !important;
  font-size: .8rem;
}

.dragging {
  box-shadow: 0 12px 24px -6px #091e4240, 0 0 0 1px #091e4214;
  cursor: grabbing;
  transform: rotate(4deg);
}

.dragging-cell-placeholder {
  background-color: rgb(149, 149, 149);
}

.kanban-body-block.dragging-place.cell-active {
  outline: 3px dashed rgba(128, 128, 128) !important;
  outline-offset: -3px;
}
</style>