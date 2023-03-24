export default {
    state: {
        moved: null,
        toBackCb: () => {}
    },
    getters: {
        ready: state => !!state.moved,
        moved: state => state.moved,
        toBackCb: state => state.toBackCb,

        taskTitle: state => state.moved?.task?.TITLE,

        fromProjectTitle: state => state.moved?.task?.PROJECT_TITLE,
        toProjectTitle: state => state.moved?.toProject?.title,

        fromStageTitle: state => state.moved?.task?.STAGE_TITLE,
        toStageTitle: state => state.moved?.toStage?.TITLE,
    },

    mutations: {
        moved: (state, val) => state.moved = val,
        toBackCb: (state, val) => state.toBackCb = val,
    },

    actions: {
        async setMoved({commit}, val = null) {
            commit('moved', val)
        },

        setToBackCb({commit}, val = null) {
            commit('toBackCb', val)
        },

        async confirmMoved(_, moved) {
            return this.dispatch('kanban/updateTask', {
                taskId: moved.task.ID,
                RESPONSIBLE_ID: moved.task?.RESPONSIBLE_ID,
                fields: {
                    PARENT_ID: moved.toProject?.projectTaskId,
                    STAGE_TITLE: moved.toStage?.TITLE,
                    STAGE_ID: moved.toStage?.ID
                }
            })
        }
    },

    namespaced: true
}