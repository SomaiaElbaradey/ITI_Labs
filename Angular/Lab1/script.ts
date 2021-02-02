console.log("this is my script");

interface Iaccount {
    DateOfOpening: Date,
    addCustomer: () => void,
    removeCustomer: () => void
}

abstract class Account {
    constructor(public accNo = 100, public balance: number) {
    }
    debtAmount(): number {
        return this.balance * 0.1;
    }
    creditAmount(): number {
        return this.accNo;
    }
    get getBalance() {
        return this.balance;
    }
}

class CurrentAccount extends Account implements Iaccount {
    constructor(accNo: number, balance: number, public intersetRate: number) {
        super(accNo, balance)
    }
    DateOfOpening = new Date();
    addCustomer(): void {
        console.log("customer added to current account");
    }
    removeCustomer = function () {
        console.log("customer removed from current account");
    }
    debtAmount(): number {
        return 0;
    }
}

class SavingAccount extends Account implements Iaccount {
    constructor(accNo: number, balance: number, public minBalance: number) {
        super(accNo, balance)
    }
    DateOfOpening = new Date();
    addCustomer(): void {
        console.log("customer added to saving account");
    }
    removeCustomer = function () {
        console.log("customer removed from saving account");
    }
    creditAmount(): number {
        return this.balance * 1.1;
    }
}