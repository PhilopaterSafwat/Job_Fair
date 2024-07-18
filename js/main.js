let tbody = document.querySelector('tbody')
let cname = document.querySelector('.cname')
let amount = document.querySelector('.amount')
let transactionsA = ""
let customersA = ""
data()
async function data() {
    let response = await fetch('https://philopatersafwat.github.io/API/db.json')
    let data = await response.json()
    let customers = data.customers
    let transactions = data.transactions
    transactionsA = transactions
    customersA = customers
    display(transactions, customers)
    searchCname(customers, transactions)
    searchAmount(customers, transactions)
}
function display(transactions, customers) {
    let container = ""
    for (let i = 0; i < transactions.length; i++) {
        container += `<tr>
                        <td id="name">${customers[transactions[i].customer_id - 1].name}</td>
                        <td id="date">${transactions[i].date}</td>
                        <td id="amount">${transactions[i].amount}</td>
                        <td>
                            <button class="btn btn-success" onclick="btn(this.parentElement.parentElement)">View</button>
                        </td>
                    </tr>`
    }
    tbody.innerHTML = container
}

function searchCname(customers, transactions) {
    cname.addEventListener('keyup', () => {
        let searchValue = cname.value.toLowerCase();
        let filteredTransactions = transactions.filter(function (transaction) {
            return customers[transaction.customer_id - 1].name.toLowerCase().includes(searchValue);
        });
        display(filteredTransactions, customers);
    });
}
function searchAmount(customers, transactions) {
    amount.addEventListener('keyup', () => {
        let searchValue = amount.value;
        let filteredTransactions = transactions.filter(function (transaction) {
            return transactions[transaction.id - 1].amount.toString().includes(searchValue)
        });
        display(filteredTransactions, customers);
    });
}
function btn(row) {
    let totalAmount = []
    let sum = 0;
    let FName = row.querySelector('#name').innerHTML;
    let FDate = row.querySelector('#date').innerHTML
    if (Array.isArray(transactionsA)) {
        let total = transactionsA.filter(transaction => {
            let customer = customersA.find(c => c.id === transaction.customer_id);
            return customer && customer.name.includes(FName) && transaction.date === FDate;
        });
        total.forEach(element => {
            totalAmount.push(element.amount);
        });
        sum = totalAmount.reduce((acc, current) => acc + current, 0);
        alert(`${FName}, the total transaction amount on ${FDate} is: ${sum}`);
    }
}
