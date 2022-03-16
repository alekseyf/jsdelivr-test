<template>
  <div class="d-flex justify-content-between align-items-center">
    <button
      v-if="page > 1"
      type="button"
      class="btn bg-secondary  text-white btn-sm"
      @click="$emit('changePage', page - 1)"
    >
      Prev
    </button>
    <div v-else></div>
    <div>
      <span class="badge bg-secondary me-2">
        Current page: {{ page }}
      </span>
    </div>
    <button
      v-if="page < totalPages"
      type="button"
      class="btn bg-secondary text-white btn-sm"
      @click="$emit('changePage', page + 1)"
    >
      Next
    </button>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  }
}
</script>
