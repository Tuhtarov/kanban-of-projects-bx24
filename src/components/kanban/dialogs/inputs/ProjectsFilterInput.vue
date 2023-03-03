<template>
  <v-col cols="12">
    <p class="mb-1">Проекты</p>
    <v-autocomplete
        v-model="selectedProjects"
        :items="projects"
        no-data-text="Не найдено"
        :search-input.sync="search"
        item-text="title"
        item-value="id"

        placeholder="Проекты"
        background-color="white"
        chips hide-details outlined multiple filled solo
    >
      <template v-slot:selection="data">
        <v-chip
            v-bind="data.attrs" :input-value="data.selected" close @click:close="unselect(data.item?.id)"
        >{{ data.item?.title }}
        </v-chip>
      </template>

      <template v-slot:prepend-item>
        <div class="first-item">
          <v-btn @click="selectAll" class="mr-1" depressed color="blue-grey darken-3" dark>
            {{ !selectedAll ? 'выбрать все' : 'очистить' }}
          </v-btn>
        </div>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ProjectsFilterInput",
  props: {
    projects: Array,
    loading: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    selectedProjects: [],
    search: ''
  }),

  computed: {
    selectedAll() {
      return this.selectedProjects.length > 0 && this.selectedProjects.length === this.projects.length
    }
  },

  methods: {
    ...mapActions({
      setProjectsIdsFilter: 'filterDialog/setProjectsIdsFilter',
      setReloadProjectsEvent: 'filterDialog/setReloadProjectsEvent'
    }),

    setOpt() {
      window.BX24.callMethod('user.option.set', {options: {selected: JSON.stringify(this.selected)}});
      this.$store.dispatch('GET_USERS_TASKS')
    },

    unselect(id) {
      const index = this.selectedProjects.findIndex(it => parseInt(it) === parseInt(id))
      if (index >= 0) this.selectedProjects.splice(index, 1)
    },

    selectAll() {
      if (this.selectedAll) this.selectedProjects = []
      else this.selectedProjects = this.projects.slice()
    }
  },

  watch: {
    selectedProjects(val) {
      this.setProjectsIdsFilter(val.reduce((acc, it) => {
        acc.push(it)
        return acc
      }, []))
    }
  },

  mounted() {
    this.setReloadProjectsEvent(() => this.selectedProjects = [])
  }
}
</script>

<style scoped>
.first-item {
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>