<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Planning' | localize }}</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="c in categories" :key="c.id">
        <p class="progress-data">
          <strong>{{ c.title }}:</strong>
          {{ c.spend | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltipText">
          <div
            class="determinate"
            :class="c.progressColor"
            :style="{width: c.progressPercent + '%', minHeight: 20 + 'px'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planing',
  metaInfo() {
    return {
      title: this.$title('Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    setTimeout(() => {
      this.categories = categories.map(c => {
        const spend = records
          .filter(r => r.categoryId === c.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return (total += +record.amount)
          }, 0)

        const percent = (100 * spend) / c.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor =
          percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

        const tooltipValue = c.limit - spend
        let tooltipText =
          tooltipValue < 0
            ? localizeFilter('Excess.on')
            : localizeFilter('Left')
        tooltipText += currencyFilter(Math.abs(tooltipValue))

        return {
          ...c,
          spend,
          progressPercent,
          progressColor,
          tooltipText
        }
      })
    }, 0)

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.progress {
  height: 8px;
  margin: -0.7rem 0 1rem 0;
}
.progress-data {
  margin-top: 26px;
}
</style>
