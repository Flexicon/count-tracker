<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="cancel"
    @keydown.enter="submit"
  >
    <template v-slot:activator="{ on }">
      <v-btn absolute fab bottom right color="accent" v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary" class="new-counter__toolbar">
        <v-btn icon dark @click="cancel">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title v-if="!counterToEdit" dark>
          New Counter
        </v-toolbar-title>

        <v-toolbar-title v-if="counterToEdit" dark>
          Edit Counter
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn flat dark @click="submit">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div class="pa-3">
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="initialValue"
            :error-messages="initialValueErrors"
            label="Initial value"
            mask="####"
            required
            @input="$v.initialValue.$touch()"
            @blur="$v.initialValue.$touch()"
          ></v-text-field>

          <v-select
            v-if="automatic"
            v-model="resetPeriod"
            :items="periods"
            :error-messages="resetPeriodErrors"
            label="Reset period"
            required
            @change="$v.resetPeriod.$touch()"
            @blur="$v.resetPeriod.$touch()"
          ></v-select>

          <v-checkbox v-model="automatic" label="Automatic reset?"></v-checkbox>

          <v-btn @click="resetForm">clear</v-btn>

          <v-btn v-if="counterToEdit" color="error" @click="deleteCounter">
            <v-icon left dark>delete</v-icon>
            remove
          </v-btn>
        </form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'

export default {
  props: {
    counterToEdit: {
      type: Object,
      default: () => null
    }
  },
  data: () => ({
    dialog: false,
    name: '',
    automatic: false,
    initialValue: 10,
    resetPeriod: null,
    periods: [
      { value: 'day', text: 'Daily' },
      { value: 'week', text: 'Weekly' },
      { value: 'month', text: 'Monthly' }
    ]
  }),
  validations: {
    name: { required },
    initialValue: { required },
    resetPeriod: {
      required: requiredIf(function() {
        return this.automatic
      })
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    initialValueErrors() {
      const errors = []
      if (!this.$v.initialValue.$dirty) return errors
      !this.$v.initialValue.required && errors.push('Count is required.')
      return errors
    },
    resetPeriodErrors() {
      const errors = []
      if (!this.$v.resetPeriod.$dirty) return errors

      if (this.automatic && !this.$v.resetPeriod.required) {
        errors.push('Reset period is required.')
      }
      return errors
    }
  },
  watch: {
    counterToEdit: {
      immediate: true,
      handler(counter) {
        if (!counter) {
          this.resetForm()
        } else {
          this.dialog = true
          this.$v.$reset()
          this.resetForm(counter)
        }
      }
    },
    initialValue(value) {
      this.initialValue = parseInt(value)
    }
  },
  methods: {
    cancel() {
      this.dialog = false
      this.resetForm()

      if (this.counterToEdit) {
        this.$emit('editCancelled')
      }
    },
    async deleteCounter() {
      if (this.counterToEdit) {
        const sure = await this.$confirm('Are you sure?')
        if (sure) {
          const { id } = this.counterToEdit
          this.cancel()
          this.$emit('deleteCounter', id)
        }
      }
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const { name, automatic, initialValue, resetPeriod } = this
        const data = { name, automatic, initialValue, resetPeriod }
        const action = this.counterToEdit ? 'editCounter' : 'addCounter'

        if (this.counterToEdit) {
          data.id = this.counterToEdit.id
        }

        this.$emit(action, data)
        this.dialog = false
        this.resetForm()
      }
    },
    resetForm({ name, automatic, initialValue, resetPeriod } = {}) {
      this.$v.$reset()
      this.name = name || ''
      this.automatic = automatic || false
      this.initialValue = initialValue || 10
      this.resetPeriod = resetPeriod || null
    }
  }
}
</script>

<style>
.new-counter__toolbar {
  border-radius: 0 !important;
}
</style>
