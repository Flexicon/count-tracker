<template>
  <v-layout row justify-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Hey there 👋</v-card-title>
        <v-card-text>
          <p>
            This app was made with the idea of having a place where one can keep
            track of arbitrary counters.
          </p>
          <p>Short and simple.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="enterApp()" color="primary" flat>Try it out!</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { UserVisitedKey } from '../middleware/user-has-visited-check'

export default {
  methods: {
    enterApp() {
      if (localStorage) {
        localStorage.setItem(UserVisitedKey, '1')
      }
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
