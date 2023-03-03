export default {
    state: {
        dialog: false,

        projectIds: [],
        userIds: [],
        taskTitle: '',

        reloadProjectsEvent: () => {
        },
        reloadUsersEvent: () => {
        }
    },
    getters: {
        dialog: state => state.dialog,
        projectIds: state => state.projectIds,
        userIds: state => state.userIds,
        taskTitle: (state) => state.taskTitle,
        filterReady: state => state.userIds.length > 0
            || state.projectIds.length > 0
            || state.taskTitle.length > 0,

        reloadProjectsEvent: (state) => state.reloadProjectsEvent,
        reloadUsersEvent: (state) => state.reloadUsersEvent,
    },

    mutations: {
        dialog: (state, val) => state.dialog = val,

        projectIds: (state, val) => state.projectIds = val,
        userIds: (state, val) => state.userIds = val,
        taskTitle: (state, val) => state.taskTitle = val,

        reloadProjectsEvent: (state, val) => state.reloadProjectsEvent = val,
        reloadUsersEvent: (state, val) => state.reloadUsersEvent = val,
    },

    actions: {
        async show({commit, getters}, val = null) {
            commit('dialog', val ?? !getters.dialog)
        },

        async search({dispatch, getters}) {
            let filter = {}

            if (getters.userIds.length > 0)
                filter.BY = getters.userIds.map(it => parseInt(it))

            if (getters.projectIds.length > 0)
                filter.ID = getters.projectIds.map(it => parseInt(it));

            if (getters.taskTitle.length > 0)
                filter.TASK_TITLE = getters.taskTitle

            return dispatch('fetchKanban', filter, {root: true})
        },

        async reload({dispatch, getters}) {
            return dispatch('fetchKanban', {}, {root: true}).then(r => {
                dispatch('setUsersIdsFilter')
                dispatch('setProjectsIdsFilter')

                getters?.reloadProjectsEvent()
                getters?.reloadUsersEvent()

                return r
            })
        },

        async setProjectsIdsFilter({commit}, val = []) {
            commit('projectIds', val)
        },

        async setUsersIdsFilter({commit}, val = []) {
            commit('userIds', val)
        },

        async setTaskTitleFilter({commit}, val = []) {
            commit('taskTitle', val)
        },

        async setReloadProjectsEvent({commit}, val = []) {
            commit('reloadProjectsEvent', val)
        },

        async setReloadUsersEvent({commit}, val = []) {
            commit('reloadUsersEvent', val)
        },
    },

    namespaced: true
}