<template>
  <v-card>
    <v-list two-line>
      <template v-for="(counter, index) in counters">
        <v-list-tile :key="counter.id">
          <v-list-tile-content>
            <v-list-tile-title
              ><span class="CounterList__value primary--text">{{
                counter.value
              }}</span>
              <small class="grey--text"
                >/ {{ counter.initialValue }}</small
              ></v-list-tile-title
            >
            <v-list-tile-sub-title>{{ counter.name }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action v-if="!editing">
            <v-btn
              icon
              ripple
              color="primary"
              :disabled="counter.value === 0"
              @click="onDecrement(counter.id)"
            >
              <v-icon>
                arrow_downward
              </v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="!editing">
            <v-btn
              icon
              ripple
              color="secondary"
              :disabled="counter.value === counter.initialValue"
              @click="onReset(counter.id)"
            >
              <v-icon>
                autorenew
              </v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="editing">
            <v-btn icon ripple @click="onCounterEdit(counter.id)">
              <v-icon>
                edit
              </v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="editing">
            <v-btn
              icon
              ripple
              color="error"
              @click="onCounterDelete(counter.id)"
            >
              <v-icon>
                delete
              </v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider v-if="index + 1 < counters.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
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
    async onCounterDelete(id) {
      const sure = await this.$confirm('Are you sure?')
      if (sure) {
        this.$emit('counterDelete', id)
      }
    },
    onDecrement(id) {
      this.$emit('counterDecrement', id)
    },
    onReset(id) {
      this.$emit('counterReset', id)
    }
  }
}
</script>

<style lang="scss">
.CounterList__value {
  font-size: 25px;
}
</style>
