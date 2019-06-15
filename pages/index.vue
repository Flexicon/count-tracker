<template>
  <v-layout column>
    <v-flex xs12 sm8 md6>
      <counter-list
        :counters="counters"
        @counterDecrement="onCounterDecrement"
        @counterReset="onCounterReset"
      />
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
  },
  methods: {
    onCounterDecrement(id) {
      this.$store.dispatch('counters/decrementCounter', id)
    },
    onCounterReset(id) {
      this.$store.dispatch('counters/resetCounter', id)
    }
  }
}
</script>
