"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log("this is my script");
var Account = /** @class */ (function () {
    function Account(accNo, balance) {
        if (accNo === void 0) { accNo = 100; }
        this.accNo = accNo;
        this.balance = balance;
    }
    Account.prototype.debtAmount = function () {
        return this.balance * 0.1;
    };
    Account.prototype.creditAmount = function () {
        return this.accNo;
    };
    Object.defineProperty(Account.prototype, "getBalance", {
        get: function () {
            return this.balance;
        },
        enumerable: false,
        configurable: true
    });
    return Account;
}());
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(accNo, balance, intersetRate) {
        var _this = _super.call(this, accNo, balance) || this;
        _this.intersetRate = intersetRate;
        _this.DateOfOpening = new Date();
        _this.removeCustomer = function () {
            console.log("customer removed from current account");
        };
        return _this;
    }
    CurrentAccount.prototype.addCustomer = function () {
        console.log("customer added to current account");
    };
    CurrentAccount.prototype.debtAmount = function () {
        return 0;
    };
    return CurrentAccount;
}(Account));
var SavingAccount = /** @class */ (function (_super) {
    __extends(SavingAccount, _super);
    function SavingAccount(accNo, balance, minBalance) {
        var _this = _super.call(this, accNo, balance) || this;
        _this.minBalance = minBalance;
        _this.DateOfOpening = new Date();
        _this.removeCustomer = function () {
            console.log("customer removed from saving account");
        };
        return _this;
    }
    SavingAccount.prototype.addCustomer = function () {
        console.log("customer added to saving account");
    };
    SavingAccount.prototype.creditAmount = function () {
        return this.balance * 1.1;
    };
    return SavingAccount;
}(Account));
