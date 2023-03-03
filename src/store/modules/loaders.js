export default {
    state: {
        batchLoading: true,
        kanbanLoading: false,
    },
    getters: {
        appLoading: state => state.batchLoading || state.kanbanLoading
    },
    mutations: {
        changeLoading: (state, {key, value}) => state[`${key}Loading`] = value
    },
    actions: {
        loading({commit}, manage) {
            commit('changeLoading', manage)
        },
    },
    namespaced: true
}