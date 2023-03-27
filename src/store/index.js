import Vue from 'vue'
import Vuex from 'vuex'

import kanban from "@/store/modules/kanban";
import loaders from "@/store/modules/loaders";
import users from "@/store/modules/users";

import confirmMoveTaskDialog from "@/store/modules/dialogs/confirm-move-task";
import filterDialog from "@/store/modules/dialogs/filter-dialog";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},

    actions: {
        runBatch() {
            this.dispatch('loaders/loading', {key: 'batch', value: true})

            window.BX24.complexBatch({
                headers: ['tasks.kanban.headers'],
                kanban: ['tasks.kanban.list'],
                users: ['user.get', {
                    'USER_TYPE':'employee',
                    'ACTIVE': true,
                }],
                currentUser: ['user.current'],
                newTasks: ['tasks.kanban.newTasks'],
            }, r => {
                this.dispatch('kanban/setStages', r.headers_0.answer.result)
                this.dispatch('kanban/setList', r.kanban_0.answer.result)
                this.dispatch('kanban/setProjects', r.kanban_0.answer.result)
                this.dispatch('users/setAll', r.users_0.answer.result)
                this.dispatch('kanban/setNewTasks', r.newTasks_0.answer.result)
                this.dispatch('users/setCurrent', r.currentUser_0.answer.result)
                this.dispatch('loaders/loading', {key: 'batch', value: false})
            })
        },

        async fetchKanban(_, filter) {
            this.dispatch('loaders/loading', {key: 'batch', value: true})

            return new Promise((resolve, _) => {
                window.BX24.complexBatch({
                    headers: ['tasks.kanban.headers'],
                    kanban: ['tasks.kanban.list', filter],
                    newTasks: ['tasks.kanban.newTasks'],
                }, (r) => {
                    this.dispatch('kanban/setStages', r.headers_0.answer.result)
                    this.dispatch('kanban/setList', r.kanban_0.answer.result)
                    this.dispatch('kanban/setNewTasks', r.newTasks_0.answer.result)
                    this.dispatch('loaders/loading', {key: 'batch', value: false})
                    resolve()
                })
            })
        },
    },

    modules: {
        kanban,
        loaders,
        confirmMoveTaskDialog,
        filterDialog,
        users
    }
})
