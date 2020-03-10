export class Cliente {
   id: number;
   nomeRazaoSocial: string;
   nomeFantasia: string;
   cpfCnpj: string;
   rgInscricaoEstadual: string;
   pessoa = 'FISICA';
   situacao = 'ATIVO';
   dataCadastro: Date;
}

export class Categoria {
   id: number;
   descricao: string;
   // categoriaPai = new Categoria();
}

export class Unidade {
   id: number;
   abreviacao: string;
   descricao: string;
}

export class Mesa {
   id: number;
   numero: number;
}

// export class Ingrediente {
//    id: number;
//    adicional = 'NAO';
//    nome: string;
//    ultimoCusto: number;
//    valorUnitario: number;
// }

export class Produto {
   id: number;
   nome: string;
   codigoBarras: string;
   caracteristica: string;
   situacao = 'ATIVO';
   ingrediente = 'NAO';
   adicional = 'NAO';
   valorUnitario: number;
   categoria = new Categoria();
   unidade = new Unidade();
   dataCadastro: Date;
   ingredientes: any[];
}

export class Pedido {
   id: number;
   dataCriacao: Date;
   dataVenda: Date;
   valorTotalComDesconto: number;
   valorTotalSemDesconto: number;
   operacao = 'PEDIDO';
   tipoDesconto = 'PORCENTAGEM';
   valorDescontoVenda: number;
   observacao: string;
   mesa = new Mesa();
   cliente = new Cliente();
   itens = [];
}

export class Pedido_Item {
   id: number;
   quantidade: number;
   valorUnitarioSemDesconto: number;
   // valorUnitarioComDesconto: number;
   produto = new Produto();
   // venda = new Pedido();
}

// export class Lancamento {
//    id: number;
//    tipo = 'RECEITA';
//    descricao: string;
//    dataVencimento: Date;
//    dataPagamento: Date;
//    valor: number;
//    observacao: string;
//    pessoa = new Pessoa();
//    categoria = new Categoria();
// }



