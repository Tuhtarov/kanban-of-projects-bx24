<template>
  <v-container fluid class="fill-height">
    <v-row align-content="center" justify="center" class="fill-height">
      <v-col class="py-0 mt-3 d-flex" cols="12">
        <p class="py-0 mb-0 mx-auto"><b>Загрузка</b></p>
      </v-col>

      <v-col class="d-flex" cols="12">
        <v-progress-circular class="mx-auto" indeterminate size="50" color="primary"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "KanbanProgressLoader",
}
</script>
