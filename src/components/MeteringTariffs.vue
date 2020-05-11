<template>
  <div class="col s12 m6">
    <div class="page-subtitle">
      <h4>{{ 'Metering.tariffs' | localize }}:</h4>
    </div>

    <form class="form mw350" @submit.prevent="saveTariffs">
      <!-- Cold water -->
      <div class="input-field">
        <i class="material-icons prefix blue-text">opacity</i>
        <input
          id="tC_water"
          type="text"
          v-model.number="tC_water"
          :class="{invalid: $v.tC_water.$dirty && !$v.tC_water.minValue}"
        />
        <label for="tC_water">{{ 'Metering.water.cold' | localize }}</label>
        <span
          v-if="$v.tC_water.$dirty && !$v.tC_water.minValue"
          class="helper-text invalid"
        >{{ 'Metering.water.cold.validate' | localize }}</span>
      </div>
      <!-- Hot water -->
      <div class="input-field">
        <i class="material-icons prefix red-text">opacity</i>
        <input
          id="tH_water"
          type="text"
          v-model.number="tH_water"
          :class="{invalid: $v.tH_water.$dirty && !$v.tH_water.minValue}"
        />
        <label for="tH_water">{{ 'Metering.water.hot' | localize }}</label>
        <span
          v-if="$v.tH_water.$dirty && !$v.tH_water.minValue"
          class="helper-text invalid"
        >{{ 'Metering.water.hot.validate' | localize }}</span>
      </div>
      <!-- Out water -->
      <div class="input-field">
        <i class="material-icons prefix brown-text">opacity</i>
        <input
          id="tO_water"
          type="text"
          v-model.number="tO_water"
          :class="{invalid: $v.tO_water.$dirty && !$v.tO_water.minValue}"
        />
        <label for="tO_water">{{ 'Metering.water.out' | localize }}</label>
        <span
          v-if="$v.tO_water.$dirty && !$v.tO_water.minValue"
          class="helper-text invalid"
        >{{ 'Metering.water.out.validate' | localize }}</span>
      </div>
      <!-- Electricity Day -->
      <div class="input-field">
        <i class="material-icons prefix orange-text">power</i>
        <input
          id="tD_elect"
          type="text"
          v-model.number="tD_elect"
          :class="{invalid: $v.tD_elect.$dirty && !$v.tD_elect.minValue}"
        />
        <label for="tD_elect">{{ 'Metering.electr.day' | localize }}</label>
        <span
          v-if="$v.tD_elect.$dirty && !$v.tD_elect.minValue"
          class="helper-text invalid"
        >{{ 'Metering.electr.day.validate' | localize }}</span>
      </div>
      <!-- Electricity Night -->
      <div class="input-field">
        <i class="material-icons prefix grey-darken-2">power</i>
        <input
          id="tN_elect"
          type="text"
          v-model.number="tN_elect"
          :class="{invalid: $v.tN_elect.$dirty && !$v.tN_elect.minValue}"
        />
        <label for="tN_elect">{{ 'Metering.electr.night' | localize }}</label>
        <span
          v-if="$v.tN_elect.$dirty && !$v.tN_elect.minValue"
          class="helper-text invalid"
        >{{ 'Metering.electr.night.validate' | localize }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Metering.save' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
import { minValue } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'metering-tariffs',
  data() {
    return {
      tC_water: 0,
      tH_water: 0,
      tO_water: 0,
      tD_elect: 0,
      tN_elect: 0
    }
  },
  validations: {
    tC_water: { minValue: minValue(1) },
    tH_water: { minValue: minValue(1) },
    tO_water: { minValue: minValue(1) },
    tD_elect: { minValue: minValue(1) },
    tN_elect: { minValue: minValue(1) }
  },
  mounted() {
    setTimeout(() => {
      this.tC_water = this.tariffs['tC_water'] || 0.0
      this.tH_water = this.tariffs['tH_water'] || 0.0
      this.tO_water = this.tariffs['tO_water'] || 0.0
      this.tD_elect = this.tariffs['tD_elect'] || 0.0
      this.tN_elect = this.tariffs['tN_elect'] || 0.0
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['tariffs'])
  },
  methods: {
    ...mapActions(['updateTariffs']),
    async saveTariffs() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const newTarifs = {
          tC_water: this.tC_water,
          tH_water: this.tH_water,
          tO_water: this.tO_water,
          tD_elect: this.tD_elect,
          tN_elect: this.tN_elect
        }
        await this.updateTariffs(newTarifs)

        this.$v.$reset()

        this.$message('Metering.tariffs.updated')
        this.$emit('updated', newTarifs)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collection {
  max-width: 400px;
}
.collection-item {
  .col-item-text {
    line-height: 1.5rem;
    vertical-align: top;
    display: inline-block;
    margin-left: 10px;
    padding: 2px 10px 2px;
  }
}
.mw350 {
  max-width: 350px;
}
</style>
