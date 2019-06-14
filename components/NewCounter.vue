<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn absolute fab bottom right color="accent" v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" class="NewCounter__toolbar">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title dark>New Counter</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat dark @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <p>New counter creation here!</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    counter: {
      name: '',
      manual: true,
      initialValue: 10
    }
  })
}
</script>

<style>
.NewCounter__toolbar {
  border-radius: 0 !important;
}
</style>
