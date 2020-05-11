import firebase from 'firebase/app'

export default {
  state: {
    tariffs: {}
  },

  mutations: {
    setTariffs(state, tariffs) {
      state.tariffs = tariffs
    },
    clearTariffs(state) {
      state.tariffs = {}
    }
  },

  actions: {
    async createIndicators({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')

        if (!uid) return

        return await firebase
          .database()
          .ref(`/users/${uid}/indicators`)
          .push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchAllIndicators({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')

        if (!uid) return

        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/indicators`)
              .orderByChild('data')
              .once('value')
          ).val() || {}

        const formRecords =
          Object.keys(records).map(key => ({ ...records[key], id: key })) || []

        const sorted = formRecords.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date)
        })

        return sorted
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTariffs({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')

        if (!uid) return

        const tariffs =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/tariffs`)
              .once('value')
          ).val() || {}
        commit('setTariffs', tariffs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTariffs({ commit, dispatch }, tariffs) {
      try {
        const uid = await dispatch('getUid')

        if (!uid) return

        await firebase
          .database()
          .ref(`/users/${uid}/tariffs`)
          .update(tariffs)

        commit('setTariffs', tariffs)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },

  getters: {
    tariffs: s => s.tariffs
  }
}
