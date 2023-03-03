import FullKanban from "@/components/kanban/types/FullKanban.vue";
import InWorkKanban from "@/components/kanban/types/InWorkKanban";
import PlannedKanban from "@/components/kanban/types/PlannedKanban";

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'В работе'
        },
        component: InWorkKanban,
    },
    {
        path: '/planned',
        name: 'planned',
        meta: {
            title: 'Планируемые'
        },
        component: PlannedKanban,
    },
    {
        path: '/full',
        name: 'full',
        meta: {
            title: 'Полный канбан'
        },
        component: FullKanban,
    },
];

export default routes