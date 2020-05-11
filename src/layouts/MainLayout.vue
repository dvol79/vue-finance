<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isSidebarOpen = !isSidebarOpen" />

      <Sidebar v-model="isSidebarOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isSidebarOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + 'add'">
        <router-link class="btn-floating btn-large" to="/record" v-tooltip:left="addNewRec">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/AppNavbar";
import Sidebar from "@/components/AppSidebar";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "main-layout",
  data: () => ({
    isSidebarOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    if (!Object.keys(this.$store.getters.tariffs).length) {
      await this.$store.dispatch("fetchTariffs");
    }

    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
    addNewRec() {
      return localizeFilter("Btn.add.new.record");
    }
  },
  watch: {
    error(fbError) {
      this.$error(fbError.code || "Error.unknown");
    }
  }
};
</script>