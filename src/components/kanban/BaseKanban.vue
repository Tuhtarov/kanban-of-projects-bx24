<template>
  <div class="kanban d-flex overflow-x-auto overflow-visible flex-wrap">
    <div class="kanban-body kanban-header d-flex" :style="headerStyles" ref="kanbanHeader">
      <div class="kanban-body-row">
        <div class="kanban-body-block-header kanban-body-block__project">
          <div class="kanban-block-content">
            <span style="font-weight: 500;">Проекты</span>
          </div>
        </div>

        <div v-for="stage in stages" :key="stage.ID"
             class="kanban-body-block-header" :style="{background: '#' + stage.COLOR + '21'}">
          {{ stage.TITLE }}
        </div>
      </div>
    </div>

    <div class="kanban-body kanban-main d-flex" :style="bodyStyles" ref="kanbanBody">
      <template v-for="project in kanban">
        <div :key="`row${project.projectTaskId}`" class="kanban-body-row">

          <div class="kanban-body-block-first kanban-body-block__project">
            <div class="kanban-block-content kanban-block-content__project">
              <v-card class="px-0" width="100%">
                <v-card-title
                    :title="`Открыть шторку проекта №${project.projectTaskId}`"
                    @click="gotoProject(project)"
                    class="kanban-project-card-title pb-0 px-1 px-md-2 pt-2">
                  {{ titleOf(project) }}
                </v-card-title>

                <v-card-text class="kanban-project-card-text pt-1 px-1 px-md-2 pb-1">
                  <v-divider class="pb-1"/>
                  <p>
                    <span class="kanban-project-text-opacity" title="(группа)">Клиент</span>
                    <span
                        class="kanban-project-text-link" title="Открыть шторку клиента (группы)"
                        @click="gotoWorkgroup(project)">{{ project.groupName }}</span>
                  </p>

                  <p v-show="project.deadline">
                    <span class="kanban-project-text-opacity">Дедлайн 🔥</span>
                    {{ project.deadline }}
                  </p>

                  <template v-if="project.cost">
                    <p>
                      <span class="kanban-project-text-opacity">Стоимость</span>
                      {{ project.cost }} ₽
                    </p>

                    <p>
                      <span class="kanban-project-text-opacity">Маржинальность</span>
                      {{ project.cost ? project.cost + ' ₽' : '-' }}
                    </p>
                  </template>
                </v-card-text>
              </v-card>
            </div>
          </div>

          <template v-for="stage in stages">
            <TaskKanbanCards
                :key="`cell${stage.ID}`"
                :project="project"
                :stage="stage"
                @drag="onDrag"
            />
          </template>
        </div>
      </template>
    </div>

    <ConfirmMoveTaskDialog/>
  </div>
</template>

<script>
import {throttle} from 'throttle-debounce';
import {mapActions, mapGetters} from "vuex";
import ConfirmMoveTaskDialog from "@/components/kanban/dialogs/ConfirmMoveTask.vue";
import TaskKanbanCards from "@/components/kanban/TaskKanbanCards.vue";

export default {
  name: "BaseKanban",
  components: {TaskKanbanCards, ConfirmMoveTaskDialog},
  props: ['kanban', 'stages'],

  computed: {
    ...mapGetters({
      projectById: 'kanban/projectById',
      stageByTitle: 'kanban/stageByTitle',
    }),
  },

  methods: {
    ...mapActions({
      setMoved: 'confirmMoveTaskDialog/setMoved',
      setToBackCb: 'confirmMoveTaskDialog/setToBackCb'
    }),

    gotoProject({responsibleId, projectTaskId}) {
      const uri = `/company/personal/user/${responsibleId}/tasks/task/view/${projectTaskId}/`;
      window.BX24.openPath(uri);
    },

    gotoWorkgroup({groupId}) {
      window.BX24.openPath(`/workgroups/group/${groupId}/`);
    },

    titleOf(project) {
      return project.title
    },

    getCoords(elem) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    },

    /** начало перемещения карточки */
    onDrag({event: e, task}) {
      let card = e.target.closest('.v-card')
      let parentCardBlock = card.parentElement.closest('.kanban-body-block')

      const startWidth = card.offsetWidth
      const startHeight = card.offsetHeight

      card.style.position = 'absolute';
      card.style.width = startWidth + 'px'
      card.style.height = startHeight + 'px'
      card.classList.add('dragging')

      let coords = this.getCoords(card);
      let shiftX = e.pageX - coords.left;
      let shiftY = e.pageY - coords.top + startHeight / 2;
      card.style.cursor = 'grabbing!important';
      this.$refs.kanbanBody.appendChild(card);
      card.style.zIndex = 1000;

      let throttleFn = null
      let lastCardBlock = null

      const unactivatedBodyBlocks = () => {
        document.querySelectorAll('.dragging-place.cell-active')
            .forEach(i => i.classList.remove('cell-active'))
      }

      /* момент перемещения карточки */
      const moveAt = (e) => {
        if (card.style.position !== 'absolute') return;

        card.style.left = e.pageX - shiftX + 'px';
        card.style.top = e.pageY - shiftY + 'px';

        if (throttleFn) throttleFn(e)
        else {
          /* подсветка доступного места под карточкой */
          throttleFn = throttle(20, (ev) => {
            let cardBlock = document.elementsFromPoint(ev.pageX - shiftX, ev.clientY)
                .find(i => i.closest('.kanban-body-block.dragging-place'))
            cardBlock = cardBlock.closest('.kanban-body-block.dragging-place')

            if (cardBlock) {
              unactivatedBodyBlocks()
              cardBlock.classList.add('cell-active')
              lastCardBlock = cardBlock
            }
          })

          throttleFn(e)
        }
      }

      moveAt(e);
      document.onmousemove = moveAt

      /* момент отпускания карточки */
      this.$refs.kanbanBody.onmouseup = () => {
        if (card.style.position === 'static') return;

        document.onmousemove = null;
        card.style.position = 'static'
        card.style.left = 'unset';
        card.style.top = 'unset';
        card.onmouseup = null;
        card.classList.remove('dragging')

        if (lastCardBlock && lastCardBlock !== parentCardBlock) {
          this.moveTo(lastCardBlock, card, task);
          this.setToBackCb(() => this.moveBackTo(parentCardBlock, card))

        } else this.moveBackTo(parentCardBlock, card);

        throttleFn?.cancel()
        unactivatedBodyBlocks()
      };
    },

    /** перемещаем карточку в ячейку */
    moveTo(toCell, card, task) {
      toCell.classList.remove('cell-active')
      toCell.appendChild(card)

      const moved = {
        task,
        toProject: this.projectById(toCell.dataset.projectId),
        toStage: this.stageByTitle(toCell.dataset.stageTitle)
      };

      this.setMoved(moved).then(() => card = null)
    },

    /** возвращаем карточку в исходное место */
    moveBackTo(parentCardBlock, card) {
      parentCardBlock?.appendChild(card)
    },

    onResizeLister() {
      this.headerStyles.position = 'static'
      this.headerStyles.position = 'fixed'
      this.headerStyles.width = this.$refs.kanbanBody.offsetWidth + 'px'
      this.bodyStyles.marginTop = this.$refs.kanbanHeader.offsetHeight + 'px'
    }
  },

  mounted() {
    onresize = this.onResizeLister
  },

  activated() {
    this.onResizeLister()
  },

  data: () => ({
    headerStyles: {
      position: 'static',
      width: '100%'
    },
    bodyStyles: {
      marginTop: '0px'
    },
  }),
}
</script>

<style>
.kanban {
  padding-left: 10px;
  background-color: #eeeeee;
}

.kanban-body, .kanban-body-row {
  width: 100%;
}

.kanban-block-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.kanban-header {
  margin-top: 1px !important;
  background: white;
  z-index: 100;
}

.kanban-header.fixed {
  position: fixed;
}

.kanban-body-block-header {
  min-height: unset;
  font-size: .95rem;
  /*border: 1px solid #959595;*/
  border-right: 1px solid #959595;
  border-bottom: 1px solid #959595;
  padding: 6px 6px 6px;
  min-width: 150px;
  flex-grow: 1;
  width: 100%;
  background-color: white;
}

.kanban-block-content__project {
  /*background-color: #bebebe;*/
  /*background-color: #fff9e8;*/
  background-color: #a5fdf7;
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: 0.8rem;
  padding: 10px 5px;
  align-items: start;
}

.kanban-body {
  flex-wrap: wrap;
}

.kanban-body-row {
  display: flex;
}

.kanban-body-block {
  min-height: 100px;
  /*border: 1px solid #959595;*/
  border-right: 1px solid #959595;
  border-bottom: 1px solid #959595;
  padding: 6px 6px 6px;
  min-width: 150px;
  flex-grow: 1;
  width: 100%;
  background-color: white;
}

.kanban-body-block-first {
  min-width: 150px;
  flex-grow: 1;
  width: 100%;
  background-color: #55B9B3FF;
  min-height: 100px;
  /*border: 1px solid #959595;*/
  border-right: 1px solid #959595;
  border-bottom: 1px solid #959595;
  padding: 6px 6px 6px;
  /*padding: 0;*/
}

.kanban-body-block__project {
  background-color: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  border-bottom: 1px solid #959595;
  border-right: 1px solid #959595;
}

.kanban-project-card-title {
  display: inline-block !important;
  font-size: .8rem;
  line-height: 1rem;
}

.kanban-project-card-title::first-letter {
  text-transform: uppercase;
}

.kanban-project-card-title:hover {
  cursor: pointer;
  text-decoration: underline;
}

.kanban-project-card-text p {
  font-size: .7rem;
  line-height: 1rem;
  font-weight: 400;
  color: black;

  margin: 0 0 6px;
}

.kanban-project-text-opacity {
  opacity: .8;
  display: block;
}

.kanban-project-text-link {
  display: inline-block;
}

.kanban-project-text-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>