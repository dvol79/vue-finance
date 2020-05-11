<template>
  <div class="col s12 m6 l8">
    <div class="card cyan darken-1 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Exchange' | localize }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ 'Currency' | localize }}</th>
              <th>{{ 'Rate' | localize }}</th>
              <th>{{ 'Dynamic' | localize }}</th>
              <th>{{ 'Date' | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].Value.toFixed(2) }}</td>
              <td>{{ (rates[cur].Value - rates[cur].Previous).toFixed(2) }}</td>
              <td>{{ date | date('date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['USD', 'EUR']
  })
}
</script>
