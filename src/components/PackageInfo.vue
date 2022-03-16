<template>
  <div class="modal-mask">
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ packageInfo.name }}</h5>
            <div class="ms-2">
              <span class="badge bg-primary">{{ packageInfo.version }}</span>
            </div>
            <button
              type="button"
              class="btn-close"
              @click="$store.commit('packageInfo/clearPackageInfo')"
            >
            </button>
          </div>
          <div class="modal-body">
            <div
              v-for="(entryPoint, index) in entryPoints"
              :key="index"
              class="input-group flex-nowrap mb-2"
            >
              <label :for="entryPoint.name" class="input-group-text" style="min-width: 50px;">
                {{ entryPoint.name }}
              </label>
              <input
                :id="entryPoint.name"
                type="text"
                class="form-control"
                :value="entryPoint.value"
                @focus="$event.target.select()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsdelivrCdnUrl } from '@/config'

export default {
  props: {
    packageInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    entryPoints () {
      const entryPoints = []
      for (const [key, value] of Object.entries(this.packageInfo.entrypoints)) {
        entryPoints.push({
          name: key,
          value: `${jsdelivrCdnUrl}/${this.packageInfo.name}@${this.packageInfo.version}${value.file}`
        })
      }
      return entryPoints
    }
  }
}
</script>
