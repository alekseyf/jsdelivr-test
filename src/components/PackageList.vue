<template>
  <div v-if="total === 0">
    No results founds
  </div>
  <div v-else>
    <div class="mb-3">
      <span class="badge bg-success me-2">Total packages: {{ total }}</span>
      <span class="badge bg-info">Total Pages: {{ totalPages }}</span>
    </div>
    <div class="mb-3">
      <simple-pagination
        :totalPages="totalPages"
        :page="page"
        @changePage="(val) => { $emit('changePage', val) }"
      />
    </div>
    <div class="list-group mb-3">
      <package-item
        v-for="(packageItem, index) in packages"
        :key="index"
        :packageItem="packageItem"
      />
    </div>
    <div class="mb-3">
      <simple-pagination
        :totalPages="totalPages"
        :page="page"
        @changePage="(val) => { $emit('changePage', val) }"
      />
    </div>
  </div>
</template>

<script>
import PackageItem from '@/components/PackageItem'
import SimplePagination from '@/components/SimplePagination'

export default {
  components: {
    PackageItem,
    SimplePagination
  },
  props: {
    packages: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    onPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.onPage)
    }
  }
}
</script>
