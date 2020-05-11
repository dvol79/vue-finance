<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Metering.title' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">{{ 'Empty.records' | localize }}</p>

    <section v-else>
      <MeteringTable :records="items" :key="updateCount" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHundler"
        :prev-text="next"
        :next-text="prev"
        :container-class="'pagination'"
        :page-class="'page-item'"
      />
    </section>

    <br />

    <section>
      <div class="row">
        <MeteringIndicators :last="lastRecord" @created="addNewRecord" />
        <MeteringTariffs @updated="updateTariffs" />
      </div>
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import localizeFilter from '@/filters/localize.filter'
import MeteringTable from '@/components/MeteringTable'
import MeteringIndicators from '@/components/MeteringIndicators'
import MeteringTariffs from '@/components/MeteringTariffs'

export default {
  name: 'metering',
  metaInfo() {
    return {
      title: this.$title('Metering')
    }
  },
  mixins: [paginationMixin],
  data() {
    return {
      loading: false,
      records: [],
      updateCount: 0,
      next: localizeFilter('Paginate.next'),
      prev: localizeFilter('Paginate.prev')
    }
  },
  async mounted() {
    this.records = (await this.$store.dispatch('fetchAllIndicators')) || []
    this.setup(this.records)
    this.loading = false
  },
  computed: {
    lastRecord() {
      return this.records.length ? this.records[0] : {}
    }
  },
  methods: {
    async setup(records) {
      await this.setupPagination(records)
    },
    addNewRecord(record) {
      this.records.unshift(record)
      this.setup(this.records)
      this.updateCount++
    },
    updateTariffs() {
      this.updateCount++
    }
  },
  components: {
    MeteringTable,
    MeteringIndicators,
    MeteringTariffs
  }
}
</script>

<style lang="scss">
.pagination .page-item.active {
  background-color: #26a69a !important;
}
</style>
