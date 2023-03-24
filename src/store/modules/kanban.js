import {PLANNED_STAGES} from "@/api/stageNames";

const filterKanbanByAgreed = function (list, agreed) {
    return list.reduce((acc, it) => {
        if (it.agreed === agreed) acc.push(it)
        return acc
    }, [])
}

const filterKanbanStagesByStageNames = function (list, stageNames) {
    return list.reduce((acc, it) => {
        if (stageNames.includes(it.TITLE)) acc.push(it)
        return acc
    }, [])
}

export default {
    state: {
        list: [],
        stages: [],
        projects: [],
        myProjectsFilter: false
    },
    getters: {
        list: state => state.list,
        stages: state => state.stages,

        inWorkList: state => filterKanbanByAgreed(state.list, true),
        plannedList: state => filterKanbanByAgreed(state.list, false),

        plannedStages: state => filterKanbanStagesByStageNames(state.stages, PLANNED_STAGES),

        projects: state => state.projects,
        myProjectsFilter: state => state.myProjectsFilter,
        projectById: state => id => state.list.find(it => parseInt(it.projectTaskId) === parseInt(id)),

        stageByTitle: state => title => {
            for (let key in state.stages)
                if (state.stages[key].TITLE === title) return state.stages[key]
            return null;
        },
    },
    mutations: {
        list: (state, val) => state.list = val,
        stages: (state, val) => state.stages = val,
        projects: (state, kanban) => state.projects = kanban.map(it => ({id: it.projectTaskId, title: it.title})),
        myProjectsFilter: (state, val) => state.myProjectsFilter = val
    },
    actions: {
        setList({commit}, val) {
            commit('list', val)
        },

        setStages({commit}, val) {
            commit('stages', val)
        },

        setProjects({commit}, val) {
            commit('projects', val)
        },

        async updateTask(_, taskData) {
            return new Promise((resolve, reject) => {
                window.BX24.callMethod('tasks.task.update', taskData, response => {
                    if (response.error()) {
                        alert('Ошибка запроса: ' + response.error());
                        reject(response.data())
                    }

                    resolve(response.data())
                })
            });
        },

        async toggleMyProjectsFilter({commit, getters}) {
            return commit('myProjectsFilter', !getters.myProjectsFilter)
        },

        async findMyProjects({dispatch, rootGetters: getters}) {
            return dispatch('fetchKanban', {
                BY: [getters["users/current"].ID]
            }, {root: true})
                .then(_ => dispatch("toggleMyProjectsFilter"))
        },

        async findAllProjects({dispatch}) {
            return dispatch('fetchKanban', {}, {root: true})
                .then(_ => dispatch("toggleMyProjectsFilter"))
        },
    },
    namespaced: true
}