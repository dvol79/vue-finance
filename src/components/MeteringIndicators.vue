<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Metering.indicators' | localize }}:</h4>
      </div>

      <form class="form mw350" @submit.prevent="createRecord">
        <!-- Cold water -->
        <div class="input-field">
          <input
            id="w_cold_indicator"
            type="number"
            v-model.number="w_cold_indicator"
            :class="{invalid: $v.w_cold_indicator.$dirty && !$v.w_cold_indicator.minValue}"
          />
          <label for="w_cold_indicator">{{ 'Metering.water.cold' | localize }}</label>
          <span
            v-if="$v.w_cold_indicator.$dirty && !$v.w_cold_indicator.minValue"
            class="helper-text invalid"
          >{{ 'Metering.water.cold.validate' | localize }}</span>
        </div>
        <!-- Hot water -->
        <div class="input-field">
          <input
            id="w_hot_indicator"
            type="number"
            v-model.number="w_hot_indicator"
            :class="{invalid: $v.w_hot_indicator.$dirty && !$v.w_hot_indicator.minValue}"
          />
          <label for="w_hot_indicator">{{ 'Metering.water.hot' | localize }}</label>
          <span
            v-if="$v.w_cold_indicator.$dirty && !$v.w_cold_indicator.minValue"
            class="helper-text invalid"
          >{{ 'Metering.water.hot.validate' | localize }}</span>
        </div>
        <!-- Electricity Day -->
        <div class="input-field">
          <input
            id="e_day_indicator"
            type="number"
            v-model.number="e_day_indicator"
            :class="{invalid: $v.e_day_indicator.$dirty && !$v.e_day_indicator.minValue}"
          />
          <label for="e_day_indicator">{{ 'Metering.electr.day' | localize }}</label>
          <span
            v-if="$v.e_day_indicator.$dirty && !$v.e_day_indicator.minValue"
            class="helper-text invalid"
          >{{ 'Metering.electr.day.validate' | localize }}</span>
        </div>
        <!-- Electricity Night -->
        <div class="input-field">
          <input
            id="e_night_indicator"
            type="number"
            v-model.number="e_night_indicator"
            :class="{invalid: $v.e_night_indicator.$dirty && !$v.e_night_indicator.minValue}"
          />
          <label for="e_night_indicator">{{ 'Metering.electr.night' | localize }}</label>
          <span
            v-if="$v.e_night_indicator.$dirty && !$v.e_night_indicator.minValue"
            class="helper-text invalid"
          >{{ 'Metering.electr.night.validate' | localize }}</span>
        </div>
        <!-- Date Picker -->
        <div class="input-field">
          <input
            ref="date"
            id="date_indicator"
            type="text"
            v-model="date_indicator"
            class="datepicker"
          />
          <label for="date_indicator">{{ 'Date' | localize }}</label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Metering.save' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'
import { mapGetters } from 'vuex'

export default {
  name: 'metering-indicators',
  props: {
    last: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      w_cold_indicator: 0,
      w_hot_indicator: 0,
      e_day_indicator: 0,
      e_night_indicator: 0,
      date_indicator: null
    }
  },
  validations: {
    w_cold_indicator: { minValue: minValue(10) },
    w_hot_indicator: { minValue: minValue(10) },
    e_day_indicator: { minValue: minValue(10) },
    e_night_indicator: { minValue: minValue(10) }
  },
  mounted() {
    M.updateTextFields()
    const options = {
      setDefaultDate: true,
      format: 'dd.mm.yyyy',
      defaultDate: new Date()
    }
    this.date_indicator = M.Datepicker.init(this.$refs.date, options)
  },
  computed: {
    ...mapGetters(['tariffs']),
    isLast() {
      return !!Object.keys(this.last).length
    },
    timestamp() {
      return new Date().toJSON()
    }
  },
  methods: {
    async createRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!Object.keys(this.tariffs).length) {
        this.$error('Metering.tariffs.error')
        return
      }

      try {
        const newIR = {
          date: this.timestamp || new Date().toJSON(),
          w_cold_indicator: this.w_cold_indicator,
          w_cold_tariff: this.tariffs.tC_water,
          w_cold_value: this.getWaterColdVal(),

          w_hot_indicator: this.w_hot_indicator,
          w_hot_tariff: this.tariffs.tH_water,
          w_hot_value: this.getWaterHotVal(),

          w_out_tariff: this.tariffs.tO_water,
          w_out_value: this.getWaterOutVal(),

          e_day_indicator: this.e_day_indicator,
          e_day_tariff: this.tariffs.tD_elect,
          e_day_value: this.getEnergyDayVal(),

          e_night_indicator: this.e_night_indicator,
          e_night_tariff: this.tariffs.tN_elect,
          e_night_value: this.getEnergyNightVal()
        }

        newIR.w_cold_amount = newIR.w_cold_tariff * newIR.w_cold_value
        newIR.w_hot_amount = newIR.w_hot_tariff * newIR.w_hot_value
        newIR.w_out_amount = newIR.w_out_tariff * newIR.w_out_value
        newIR.e_day_amount = newIR.e_day_tariff * newIR.e_day_value
        newIR.e_night_amount = newIR.e_night_tariff * newIR.e_night_value
        newIR.total_amount =
          newIR.w_cold_amount +
          newIR.w_hot_amount +
          newIR.w_out_amount +
          newIR.e_day_amount +
          newIR.e_night_amount

        await this.$store.dispatch('createIndicators', newIR)

        this.w_cold_indicator = 0
        this.w_hot_indicator = 0
        this.e_day_indicator = 0
        this.e_night_indicator = 0
        this.$v.$reset()

        this.$message('Metering.save.mess')
        this.$emit('created', newIR)
      } catch (e) {
        console.log(e)
      }
    },
    getWaterColdVal() {
      return this.isLast
        ? +this.w_cold_indicator - +this.last.w_cold_indicator
        : 0
    },
    getWaterHotVal() {
      return this.isLast
        ? +this.w_hot_indicator - +this.last.w_hot_indicator
        : 0
    },
    getWaterOutVal() {
      return +this.getWaterColdVal() + +this.getWaterHotVal()
    },
    getEnergyDayVal() {
      return this.isLast
        ? +this.e_day_indicator - +this.last.e_day_indicator
        : 0
    },
    getEnergyNightVal() {
      return this.isLast
        ? +this.e_night_indicator - +this.last.e_night_indicator
        : 0
    }
  },
  destroyed() {
    if (this.date_indicator && this.date_indicator.destroy) {
      this.date_indicator.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
.mw350 {
  max-width: 350px;
}
</style>
