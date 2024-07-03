// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    enum State { NOT_INITIATED, AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }

    struct Transaction {
        address payable buyer;
        address payable seller;
        uint256 amount;
        State state;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    event TransactionCreated(uint256 transactionId, address buyer, address seller, uint256 amount);
    event PaymentMade(uint256 transactionId);
    event DeliveryConfirmed(uint256 transactionId);

    function createTransaction(address payable _seller) public payable {
        require(msg.value > 0, "Amount must be greater than zero");

        transactionCount++;
        transactions[transactionCount] = Transaction({
            buyer: payable(msg.sender),
            seller: _seller,
            amount: msg.value,
            state: State.AWAITING_PAYMENT
        });

        emit TransactionCreated(transactionCount, msg.sender, _seller, msg.value);
    }

    function makePayment(uint256 _transactionId) public payable {
        Transaction storage transaction = transactions[_transactionId];

        require(transaction.state == State.AWAITING_PAYMENT, "Transaction is not in awaiting payment state");
        require(msg.value == transaction.amount, "Incorrect amount");

        transaction.state = State.AWAITING_DELIVERY;

        emit PaymentMade(_transactionId);
    }

    function confirmDelivery(uint256 _transactionId) public {
        Transaction storage transaction = transactions[_transactionId];

        require(msg.sender == transaction.buyer, "Only buyer can confirm delivery");
        require(transaction.state == State.AWAITING_DELIVERY, "Transaction is not in awaiting delivery state");

        transaction.seller.transfer(transaction.amount);
        transaction.state = State.COMPLETE;

        emit DeliveryConfirmed(_transactionId);
    }
}
