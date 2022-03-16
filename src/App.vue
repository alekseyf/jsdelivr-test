<template>
  <div class="container my-3">
    <h2 class="mb-3">jsDelivr search</h2>
    <div class="input-group mb-3">
      <search-form
        :query="query"
        :debounce="searchDebounce"
        @changeQuery="changeQuery"
      />
      <ajax-loading v-if="showLoading" />
    </div>
    <div
      v-if="showError"
      class="mb-3"
    >
      <error-alert
        :error="$store.state.app.error"
        @clearError="clearError"
      />
    </div>
    <package-list
      v-if="showPackageList"
      :packages="$store.state.packages.packages"
      :total="$store.state.packages.total"
      :page="page"
      :onPage="packagesOnPage"
      @changePage="changePage"
    />
  </div>
  <div v-if="$store.state.packageInfo.packageInfo !== null">
    <package-info :packageInfo="$store.state.packageInfo.packageInfo" />
  </div>
  <layout-footer />
</template>

<script>
import { searchDebounce, appStatuses, packagesOnPage } from '@/config'
import AjaxLoading from '@/components/AjaxLoading.vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import SearchForm from '@/components/SearchForm.vue'
import PackageList from '@/components/PackageList.vue'
import PackageInfo from '@/components/PackageInfo.vue'

export default {
  name: 'App',
  components: {
    AjaxLoading,
    ErrorAlert,
    LayoutFooter,
    SearchForm,
    PackageList,
    PackageInfo
  },
  data () {
    return {
      query: '',
      page: 1
    }
  },
  computed: {
    searchDebounce () {
      return searchDebounce
    },
    packagesOnPage () {
      return packagesOnPage
    },
    showPackageList () {
      return this.$store.state.app.status === appStatuses.WAITING ||
        (this.$store.state.app.status === appStatuses.LOADING && this.$store.state.packages.total > 0)
    },
    showLoading () {
      return this.$store.state.app.status === appStatuses.LOADING
    },
    showError () {
      return this.$store.state.app.status === appStatuses.ERROR
    }
  },
  methods: {
    changeQuery (query) {
      this.query = query
      this.page = 1
      this.searchPackages()
    },
    changePage (page) {
      this.page = page
      this.searchPackages()
    },
    searchPackages () {
      this.$store.dispatch('packages/searchPackage', {
        query: this.query,
        page: this.page
      })
    },
    clearError () {
      this.query = ''
      this.$store.commit('app/setStatus', appStatuses.INIT)
      this.$store.commit('app/clearError')
    }
  }
}
</script>
