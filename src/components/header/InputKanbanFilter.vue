<template>
  <v-text-field
      @click="showFilterDialog"
      :disabled="loading"
      placeholder="Найти"
      style="margin-left: -7px; font-size: 15px;"
      background-color="white"
      append-icon="mdi-magnify"
      full-width readonly hide-details outlined filled dense
  />
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "InputKanbanFilter",
  props: ['loading'],
  methods: {
    ...mapActions({
      showFilterDialog: 'filterDialog/show',
    })
  }
}
</script>

<style scoped>

</style>