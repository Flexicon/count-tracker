<template>
  <v-card>
    <v-list two-line>
      <template v-for="(counter, index) in counters">
        <v-list-tile :key="counter.id">
          <v-list-tile-content>
            <v-list-tile-title
              >{{ counter.value }}
              <small>/ {{ counter.initialValue }}</small></v-list-tile-title
            >
            <v-list-tile-sub-title>{{ counter.name }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple color="primary">
              <v-icon>
                arrow_downward
              </v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn icon ripple color="secondary">
              <v-icon>
                autorenew
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
    }
  }
}
</script>
