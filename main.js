document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const appContainer = document.getElementById('app-container');
    const usernameInput = document.getElementById('username');
    const newUsernameInput = document.getElementById('newUsername');

    let currentUser = null;
    let transactions = [];

        // Проверяем, существует ли пользователь в localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        loadUserData(currentUser.username);
        showApp();
    } else {
        showLoginForm();
    }

    // Функция для показа формы авторизации
    function showLoginForm() {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        appContainer.classList.add('hidden');
    }

    // Функция для показа формы регистрации
    function showRegisterForm() {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }

    // Функция для показа основного контента приложения
    function showApp() {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        appContainer.classList.remove('hidden');
    }

    // Функция для загрузки данных пользователя
    function loadUserData(username) {
        const userData = localStorage.getItem(username);
        if (userData) {
            transactions = JSON.parse(userData).transactions || [];
            renderTransactions();
            updateBalance();
            drawExpensesChart();
            drawIncomeExpensePie();
        }
    }

    // Функция для сохранения данных пользователя
    function saveUserData() {
        const userData = {
            username: currentUser.username,
            transactions: transactions
        };
        localStorage.setItem(currentUser.username, JSON.stringify(userData));
    }

    // Обработчик формы авторизации
    loginForm.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

        const username = usernameInput.value.trim();

        if (username) {
            const userExists = localStorage.getItem(username);
            if (userExists) {
                currentUser = { username };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                loadUserData(username);
                showApp();
            } else {
                alert('Пользователь не найден.');
            }
        } else {
            alert('Пожалуйста, введите имя пользователя.');
        }
    });

    // Обработчик формы регистрации
    registerForm.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

        const newUsername = newUsernameInput.value.trim();

        if (newUsername) {
            const userExists = localStorage.getItem(newUsername);
            if (!userExists) {
                currentUser = { username: newUsername };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.setItem(newUsername, JSON.stringify({ transactions: [] }));
                showApp();
            } else {
                alert('Такое имя пользователя уже занято.');
            }
        } else {
            alert('Пожалуйста, введите имя пользователя.');
        }
    });

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

        updateBalance();
        drawExpensesChart();
        drawIncomeExpensePie();
        saveUserData();

        // Обработчик удаления транзакции
        removeButton.addEventListener('click', () => {
            const index = transactions.findIndex(t => t === transaction);
            if (index !== -1) {
                transactions.splice(index, 1);
                li.remove();
                updateBalance();
                drawExpensesChart();
                drawIncomeExpensePie();
                saveUserData();
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

    function downloadTransactions() {
    const jsonData = JSON.stringify(transactions);
    const blob = new Blob([jsonData], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
}

function uploadTransactions(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedTransactions = JSON.parse(e.target.result);
                transactions = importedTransactions;
                transactionsList.innerHTML = "";
                importedTransactions.forEach(transaction => {
                    addTransaction(transaction.amount, transaction.category);
                });
                updateBalance();
                drawExpensesChart();
                drawIncomeExpensePie();
            } catch (error) {
                console.error("Ошибка при парсинге JSON:", error);
                alert("Невозможно импортировать файл. Проверьте формат данных.");
            }
        };
        reader.readAsText(file);
    }
}
    // Инициализация графиков при загрузке страницы
    drawExpensesChart();
    drawIncomeExpensePie();
});
