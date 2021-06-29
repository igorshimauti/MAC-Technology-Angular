export interface Tarefa {
    id?: number,
    tipoTarefaId: string,
    descricao: string,
    data?: Date,
    dataEntrega?: Date
}