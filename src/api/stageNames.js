export const NEW = 'Новые'
export const WAITING_APPROVAL = 'Ждем согласования'
export const IN_QUEUE = 'В очереди'
export const IN_WORK = 'В работе'
export const CHECKING = 'Проверка'
export const WAITING_OTHERS = 'Ждём других'
export const DEFERRED = 'Отложена'
export const COMPLETED = 'Завершена'

export const IN_WORK_STAGES = [
    IN_QUEUE, IN_WORK, CHECKING, DEFERRED, WAITING_OTHERS
]

export const PLANNED_STAGES = [
    NEW, WAITING_APPROVAL
]