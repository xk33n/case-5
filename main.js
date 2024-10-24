document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const transactionsList = document.getElementById('transactions-list');
    const totalBalance = document.getElementById('total-balance');
    const expensesChartCanvas = document.getElementById('expenses-chart').getContext('2d');
    const incomeExpensePieCanvas = document.getElementById('income-expense-pie').getContext('2d');

    let transactions = [];

    // Функция для обновления баланса
    function updateBalance() {
        let balance = 0;
        transactions.forEach(transaction => {
            balance += transaction.amount;
        });
        totalBalance.textContent = balance.toFixed(2);
    }

    // Функция для построения графика расходов по категориям
    function drawExpensesChart() {
        const categories = ['Продукты', 'Развлечения', 'Зарплата', 'Другое'];
        const amounts = [0, 0, 0, 0];

        transactions.forEach(transaction => {
            switch (transaction.category) {
                case 'products':
                    amounts[0] += transaction.amount;
                    break;
                case 'entertainment':
                    amounts[1] += transaction.amount;
                    break;
                case 'salary':
                    amounts[2] += transaction.amount;
                    break;
                default:
                    amounts[3] += transaction.amount;
            }
        });

        new Chart(expensesChartCanvas, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Расходы по категориям',
                    data: amounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    // Функция для построения круговой диаграммы доходов и расходов
    function drawIncomeExpensePie() {
        let income = 0;
        let expense = 0;

        transactions.forEach(transaction => {
            if (transaction.category === 'salary') {
                income += transaction.amount;
            } else {
                expense += transaction.amount;
            }
        });

        new Chart(incomeExpensePieCanvas, {
            type: 'pie',
            data: {
                labels: ['Доход', 'Расход'],
                datasets: [{
                    data: [income, expense],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ]
                }]
            }
        });
    }

    // Функция для добавления новой транзакции
    function addTransaction(amount, category) {
        const transaction = { amount, category };
        transactions.push(transaction);

        const li = document.createElement('li');
        li.className = 'transaction-item';

        const spanCategory = document.createElement('span');
        spanCategory.textContent = category;
        spanCategory.className = 'transaction-category';

        const spanAmount = document.createElement('span');
        spanAmount.textContent = amount.toFixed(2);
        spanAmount.className = 'transaction-amount';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.className = 'transaction-remove-button';

        li.appendChild(spanCategory);
        li.appendChild(spanAmount);
        li.appendChild(removeButton);

        transactionsList.appendChild(li);

        // Обновляем баланс после добавления транзакции
        updateBalance();

        // Перерисовываем графики
        drawExpensesChart();
        drawIncomeExpensePie();

        // Обработчик удаления транзакции
        removeButton.addEventListener('click', () => {
            const index = transactions.findIndex(t => t === transaction);
            if (index !== -1) {
                transactions.splice(index, 1);
                li.remove();
                updateBalance();
                drawExpensesChart();
                drawIncomeExpensePie();
            }
        });
    }

    // Обработка формы
    transactionForm.addEventListener('submit', event => {
        event.preventDefault();

        const amountInput = document.getElementById('amount');
        const categorySelect = document.getElementById('category');

        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        if (!isNaN(amount)) {
            addTransaction(amount, category);
            amountInput.value = '';
        } else {
            alert('Введите корректную сумму!');
        }
    });

    // Инициализация графиков при загрузке страницы
    drawExpensesChart();
    drawIncomeExpensePie();
});
