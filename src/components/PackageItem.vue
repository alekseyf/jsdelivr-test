<template>
  <a
    href="#"
    class="list-group-item list-group-item-action"
    @click.prevent="setPackageInfo"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ packageItem.package.name }}</h5>
      <div>
        <span class="badge bg-primary"> {{ packageItem.package.version }}</span>
      </div>
    </div>
    <p class="mb-1">{{ packageItem.package?.description }}</p>
    <span
      v-if="packageItem.package?.author?.name"
      class="badge bg-secondary"
    >
      {{ packageItem.package.author.name }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    packageItem: {
      type: Object
    }
  },
  methods: {
    setPackageInfo () {
      this.$store.dispatch('packageInfo/packageInfo', {
        name: this.packageItem.package.name,
        version: this.packageItem.package.version
      })
    }
  }
}
</script>
