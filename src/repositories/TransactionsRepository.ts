import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface DTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce( (previous, current) => {
      switch (current.type) {
        case 'income':
          previous.income += current.value;
          break;
        case 'outcome':
          previous.outcome += current.value
          break;
        default:
          break;
      }

      return previous;

    },{
      income: 0,
      outcome: 0,
      total: 0,
    })

    const {income, outcome} = balance;

    const total = income - outcome;

    return {income, outcome, total};
  }

  public create({title, value, type}: DTO): Transaction {

    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
