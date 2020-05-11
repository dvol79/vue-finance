<template>
  <div>
    <Loader v-if="loading" />

    <p v-else-if="!record" class="center">
      {{ 'Record' | localize }}:
      <b>{{ $route.params.id }}</b>
      {{ 'Not.found.w' | localize }}.
      <router-link to="/history">{{ 'Back' | localize }}</router-link>
    </p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'History' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>
                {{ 'Description' | localize }}:
                <strong>{{ record.description }}</strong>
              </p>
              <p>
                {{ 'Amount' | localize }}:
                <strong>{{ record.amount | currency }}</strong>
              </p>
              <p>
                {{ 'Category' | localize }}:
                <strong>{{ record.categoryName }}</strong>
              </p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'detail',
  metaInfo() {
    return {
      title: this.$title('Detail')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    try {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', id)
      const category = await this.$store.dispatch(
        'fetchCategoryById',
        record.categoryId
      )
      this.record = {
        ...record,
        typeText:
          record.type === 'income'
            ? localizeFilter('Income')
            : localizeFilter('Outcome'),
        typeClass: record.type === 'income' ? 'green' : 'red',
        categoryName: category.title
      }
      this.loading = false
    } catch (e) {
      this.$error(e)
      throw e
    }
  }
}
</script>
