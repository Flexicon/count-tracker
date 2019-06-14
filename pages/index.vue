<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <counter-list :counters="counters" />
      <new-counter />
    </v-flex>
  </v-layout>
</template>

<script>
import CounterList from '~/components/CounterList.vue'
import NewCounter from '~/components/NewCounter.vue'

export default {
  components: {
    CounterList,
    NewCounter
  },
  computed: {
    counters() {
      return this.$store.state.counters.list
    }
  }
}
</script>
