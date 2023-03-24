<template>
  <v-col cols="12">
    <p class="mb-1">Пользователи</p>
    <v-autocomplete
        v-model="selectedUsers"
        :items="users"
        no-data-text="Не найдено"
        background-color="white"
        item-title="NAME"
        item-value="ID"

        chips hide-details outlined multiple filled solo
    >
      <template v-slot:selection="data">
        <v-chip
            v-bind="data.attrs" :input-value="data.selected" close @click:close="unselect(data.item?.ID)"
        >
          <v-avatar v-if="data.item?.PERSONAL_PHOTO" left>
            <v-img :src="data.item?.PERSONAL_PHOTO"/>
          </v-avatar>
          <v-icon color="white" class="mr-1" v-else>mdi-account-circle</v-icon>

          {{ data.item?.LAST_NAME + " " + data.item?.NAME }}
        </v-chip>
      </template>

      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>

        <template v-else>
          <v-list-item-avatar>
            <img v-if="data.item?.PERSONAL_PHOTO" :src="data.item?.PERSONAL_PHOTO" alt="Аватарка">
            <v-icon v-else large color="black">mdi-account-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="data.item?.LAST_NAME + ' ' + data.item?.NAME"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item?.PERSONAL_CITY"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>

      <template v-slot:prepend-item>
        <div class="first-item">
          <v-btn @click="toggleSelectUsers" depressed color="blue-grey darken-3" dark>
            {{ selectedUsers.length > 0 ? 'очистить' : 'все' }}
          </v-btn>

          <v-btn @click="isResp = !isResp" :color="!isResp ? 'primary' : 'secondary'" link class="ml-3">
            постановщик
          </v-btn>

          <v-btn @click="isResp = !isResp" :color="isResp ? 'primary' : 'secondary'" link class="ml-1">
            ответственный
          </v-btn>
        </div>
      </template>
    </v-autocomplete>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "UsersFilterInput",
  props: {
    users: Array,
    loading: {
      default: false,
      type: Boolean
    }
  },

  data: () => ({
    selectedUsers: [],
    isResp: false
  }),

  watch: {
    selectedUsers(val) {
      this.setUsersIdsFilter(val)
    },

    isResp(val) {
      this.setOnlyResponsible(val)
    },
  },

  methods: {
    ...mapActions('filterDialog', [
      'setUsersIdsFilter',
      'setReloadUsersEvent',
      'setOnlyResponsible',
    ]),

    unselect(id) {
      const index = this.selectedUsers.findIndex(it => parseInt(it) === parseInt(id))
      if (index >= 0) this.selectedUsers.splice(index, 1)
    },

    toggleSelectUsers() {
      this.selectedUsers.length > 0 ? this.clear() : this.selectAll()
    },

    selectAll() {
      this.selectedUsers = this.users.slice()
    },

    clear() {
      this.selectedUsers = []
    },
  },

  computed: {
    selectedAll() {
      return this.selectedUsers.length > 0 && this.selectedUsers.length === this.users.length
    }
  },

  mounted() {
    this.setReloadUsersEvent(() => this.selectedUsers = [])
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