document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');

        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        if (!isNaN(amount)) {
            addTransactionToList(amount, category);
            clearForm();
        }
    });

    function addTransactionToList(amount, category) {
        const transactionItem = document.createElement('li');
        transactionItem.className = 'transaction-item';

        const amountText = document.createTextNode(`Сумма: ${amount}`);
        const categoryText = document.createTextNode(`Категория: ${category}`);

        transactionItem.appendChild(amountText);
        transactionItem.appendChild(document.createElement('br'));
        transactionItem.appendChild(categoryText);

        transactionsList.appendChild(transactionItem);
    }

    function clearForm() {
        document.getElementById('amount').value = '';
        document.getElementById('category').selectedIndex = 0;
    }
});
