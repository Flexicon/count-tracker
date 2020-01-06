<template>
  <div class="CounterList">
    <v-card v-if="counters.length">
      <v-list two-line>
        <template v-for="(counter, index) in counters">
          <counter-list-item
            :key="counter.id"
            :counter="counter"
            :editing="editing"
            @counterEdit="onCounterEdit"
            @counterDecrement="onCounterDecrement"
            @counterReset="onCounterReset"
            @counterDelete="onCounterDelete"
          />

          <v-divider
            v-if="index + 1 < counters.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-card>
    <div v-else class="CounterList__empty-message">
      <v-icon class="grey--text">content_paste</v-icon>
      <span class="grey--text">No counters yet</span>
    </div>
  </div>
</template>

<script>
import CounterListItem from './CounterListItem.vue'

export default {
  components: {
    CounterListItem
  },
  props: {
    counters: {
      type: Array,
      default: () => []
    },
    editing: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    onCounterEdit(id) {
      this.$emit('counterEdit', id)
    },
    onCounterDelete(id) {
      this.$emit('counterDelete', id)
    },
    onCounterDecrement(id) {
      this.$emit('counterDecrement', id)
    },
    onCounterReset(id) {
      this.$emit('counterReset', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.CounterList__empty-message {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 30px 0px;

  > span {
    margin-left: 5px;
  }
}
</style>
