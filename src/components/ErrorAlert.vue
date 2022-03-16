<template>
  <div v-if="error" class="alert alert-danger alert-dismissible">
    {{ error.message }}
    <button
      type="button"
      class="btn-close"
      @click="$emit('clearError')"
    >
    </button>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      default: null
    }
  }
}
</script>
