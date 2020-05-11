import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, tuUpdate) {
      try {
        const uid = await dispatch('getUid')
        if (!uid) return
        const updateData = { ...getters.info, ...tuUpdate }
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        if (!uid) return
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once('value')
        ).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
