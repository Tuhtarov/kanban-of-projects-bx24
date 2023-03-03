export default {
    state: {
        all: [],
        current: null
    },
    getters: {
        all: state => state.all,
        current: state => state.current
    },

    mutations: {
        all: (state, val) => state.all = val,
        current: (state, val) => state.current = val,
    },

    actions: {
        async setAll({commit}, val) {
            return commit('all', val.reduce((acc, it) => {
                const user = {
                    ID: it.ID,
                    NAME: it.NAME,
                    LAST_NAME: it.LAST_NAME,
                    PERSONAL_PHOTO: it.PERSONAL_PHOTO
                }

                acc.push(user)
                return acc
            }, []))
        },

        async setCurrent({commit}, val) {
            return commit('current', {
                ID: val.ID,
                NAME: val.NAME,
                LAST_NAME: val.LAST_NAME,
                PERSONAL_PHOTO: val.PERSONAL_PHOTO
            })
        },
    },

    namespaced: true
}