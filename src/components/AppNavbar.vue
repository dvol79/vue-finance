<template>
  <nav class="navbar teal lighten-4">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <!-- <ul class="right hide-on-med-and-down"> -->
      <ul class="right">
        <!-- Dropdown Trigger -->
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <!-- Dropdown Structure -->
          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons right">account_circle</i>
                {{ 'Profile' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons right">assignment_return</i>
                {{ 'Exit' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style lang="sass" scoped>
.dropdown-content li > a > i
  margin: 0 2px 0 6px
  width: 20px
</style>
