export interface Professor {
    id?: number,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    email: string,
    celular: string,
    enderecoResidencial: {
        cep: string,
        uf: string,
        cidade: string,
        bairro: string,
        logradouro: string,
        numero: string,
        complemento: string
      }
}