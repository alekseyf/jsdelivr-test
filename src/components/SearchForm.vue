<template>
    <input
      :value="query"
      class="form-control"
      placeholder="search all of npm (min. 2 symbols)"
      type="text"
      @input="debounceChangeQuery"
    />
</template>

<script>

import _ from 'lodash'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    debounce: {
      type: Number,
      default: 300
    }
  },
  mounted () {
    this.debounceChangeQuery = _.debounce((e) => {
      this.changeQuery(e.target.value)
    }, this.debounce)
  },
  methods: {
    changeQuery (value) {
      this.$emit('changeQuery', value)
    }
  }
}
</script>
