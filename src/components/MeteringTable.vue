<template>
  <div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">{{ 'Empty.records' | localize }}</p>

    <table v-else class="responsive-table">
      <thead>
        <tr>
          <th>{{ 'Date' | localize }}</th>
          <th v-for="t in allTariffs" :key="t.name">
            <i class="material-icons" :class="t.class">{{ t.icon }}</i>
            <span class="badge">{{ t.val | currency('RUB') }}</span>
            <br />
            <small>{{ `Metering.${t.name}` | localize }}</small>
          </th>
          <th>{{ 'Total' | localize }}</th>
        </tr>
      </thead>

      <tbody v-if="haveRecords">
        <tr v-for="r in records" :key="r.id">
          <td>
            <b>{{ r.date | date('dshort') }}</b>
          </td>
          <td>
            <b class="bluet-text">{{ r.w_cold_value }}</b>
            ({{ r.w_cold_indicator }})
            <br />
            {{ r.w_cold_amount | currency('RUB') }}
          </td>
          <td>
            <b class="red-text">{{ r.w_hot_value }}</b>
            ({{ r.w_hot_indicator }})
            <br />
            {{ r.w_hot_amount | currency('RUB') }}
          </td>
          <td>
            <b class="brown-text">{{ r.w_out_value }}</b>
            <br />
            {{ r.w_out_amount | currency('RUB') }}
          </td>
          <td>
            <b class="orange-text">{{ r.e_day_value }}</b>
            ({{ r.e_day_indicator }})
            <br />
            {{ r.e_day_amount | currency('RUB') }}
          </td>
          <td>
            <b>{{ r.e_night_value }}</b>
            ({{ r.e_night_indicator }})
            <br />
            {{ r.e_night_amount | currency('RUB') }}
          </td>
          <td>
            <b>{{ r.total_amount | currency('RUB') }}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'metering-table',
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    loading: true,
    tDesign: [
      {
        id: 'tC_water',
        name: 'water.cold',
        icon: 'opacity',
        class: 'blue-text',
        val: 0.0
      },
      {
        id: 'tH_water',
        name: 'water.hot',
        icon: 'opacity',
        class: 'red-text',
        val: 0.0
      },
      {
        id: 'tO_water',
        name: 'water.out',
        icon: 'opacity',
        class: 'brown-text',
        val: 0.0
      },
      {
        id: 'tD_elect',
        name: 'electr.day',
        icon: 'power',
        class: 'orange-text',
        val: 0.0
      },
      {
        id: 'tN_elect',
        name: 'electr.night',
        icon: 'power',
        class: 'grey-darken-2',
        val: 0.0
      }
    ]
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 300)
  },
  computed: {
    ...mapGetters(['tariffs']),
    haveRecords() {
      return !!Object.keys(this.records).length
    },
    allTariffs() {
      return this.tDesign.map(r => {
        return {
          ...r,
          val: this.tariffs[r.id] || 0.0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  .bluet-text {
    color: #2196f3;
  }
  .red-text {
    color: #f44336;
  }
  .brown-text {
    color: #795548;
  }
  .orange-text {
    color: #ff9800;
  }
}
</style>
