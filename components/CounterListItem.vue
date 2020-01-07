<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title
        ><span class="CounterListItem__value primary--text">{{
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
        :disabled="counter.value === 0"
        @click="onDecrement(counter.id)"
        icon
        ripple
        color="primary"
      >
        <v-icon class="CounterListItem__action-icon">
          arrow_downward
        </v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-action v-if="!editing">
      <v-btn
        :disabled="counter.value === counter.initialValue"
        @click="onReset(counter.id)"
        icon
        ripple
        color="secondary"
      >
        <v-icon class="CounterListItem__action-icon">
          autorenew
        </v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-action v-if="editing">
      <v-btn @click="onCounterEdit(counter.id)" icon ripple>
        <v-icon class="CounterListItem__action-icon">
          edit
        </v-icon>
      </v-btn>
    </v-list-tile-action>

    <v-list-tile-action v-if="editing">
      <v-btn @click="onCounterDelete(counter.id)" icon ripple color="error">
        <v-icon class="CounterListItem__action-icon">
          delete
        </v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    counter: {
      type: Object,
      required: true
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

<style lang="stylus">
.CounterListItem__value {
  font-size: 25px;
}

.CounterListItem__action-icon {
  transition: color 0s;
}
</style>
