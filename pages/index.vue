<template>
  <v-layout row justify-center>
    <v-flex xs12 sm8 md6>
      <counter-list
        :counters="counters"
        :editing="editing"
        @counterEdit="onCounterStartEdit"
        @counterDecrement="onCounterDecrement"
        @counterReset="onCounterReset"
        @counterDelete="onCounterDelete"
      />
      <create-edit-counter
        :counter-to-edit="counterToEdit"
        @addCounter="onAddCounter"
        @editCounter="onEditCounter"
        @editCancelled="onEditCancelled"
        @deleteCounter="onCounterDelete"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import CounterList from '~/components/CounterList.vue'
import CreateEditCounter from '~/components/CreateEditCounter.vue'

export default {
  components: {
    CounterList,
    CreateEditCounter
  },
  computed: {
    counters() {
      return this.$store.state.counters.list
    },
    counterToEdit() {
      return this.$store.state.counters.counterToEdit
    },
    editing() {
      return this.$store.state.editing
    }
  },
  beforeDestroy() {
    this.$store.dispatch('stopEditing')
  },
  methods: {
    onCounterDecrement(id) {
      this.$store.dispatch('counters/decrementCounter', id)
    },
    onCounterReset(id) {
      this.$store.dispatch('counters/resetCounter', id)
    },
    onAddCounter(data) {
      this.$store.dispatch('counters/addCounter', data)
    },
    onEditCounter(data) {
      this.$store.dispatch('counters/editCounter', data)
    },
    onCounterStartEdit(id) {
      this.$store.dispatch('counters/setCounterToEdit', id)
    },
    onEditCancelled() {
      this.$store.dispatch('counters/cancelCounterEdit')
    },
    onCounterDelete(id) {
      this.$store.dispatch('counters/deleteCounter', id)
    }
  }
}
</script>
