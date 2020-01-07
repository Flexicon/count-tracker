<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="layout__toolbar" dark color="primary" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title class="layout__logo">
        <img src="/img/vampire.svg" class="layout__logo-img" />
        <span class="layout__logo-title">{{ title }}</span>
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="hasEditAction"
        @click="editing = !editing"
        class="layout__toolbar-menu-btn"
        dark
        flat
      >
        {{ editing ? 'done' : 'edit' }}
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer class="pa-3">
      <v-flex text-xs-center xs12>
        <span class="copy">&copy; 2019 CountTracker. All rights reserved.</span>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: 'CountTracker',
      items: [
        {
          icon: 'apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Welcome',
          to: '/welcome'
        }
      ]
    }
  },
  computed: {
    editing: {
      get() {
        return this.$store.state.editing
      },
      set(value) {
        this.$store.dispatch(value ? 'startEditing' : 'stopEditing')
      }
    },
    hasEditAction() {
      return this.$route.name === 'index'
    }
  }
}
</script>

<style lang="stylus">
.copy {
  color: #aaa;

  > a {
    text-decoration: none;
  }
}

.layout__toolbar {
  .layout__logo {
    display: flex;
    align-items: center;
    margin-left: 0 !important;

    &-img {
      height: 40px;
      margin-right: 5px;
    }
  }
}
</style>
