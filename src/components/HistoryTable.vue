<template>
  <table>
    <thead>
      <tr>
        <th>{{ 'Num' | localize }}</th>
        <th>{{ 'Amount' | localize }}</th>
        <th>{{ 'Date' | localize }}</th>
        <th>{{ 'Category' | localize }}</th>
        <th>{{ 'Type' | localize }}</th>
        <th>{{ 'Open' | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(r, idx) in records" :key="r.id">
        <td>{{ +idx + 1 }}</td>
        <td>{{ r.amount | currency('RUB') }}</td>
        <td>{{ r.date | date('datetime') }}</td>
        <td>{{ r.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[r.typeClass]">{{ r.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip:left="viewRecord"
            class="btn-small btn"
            @click="$router.push('/detail/' + r.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'history-table',
  data: () => ({
    viewRecord: localizeFilter('View.record')
  }),
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
