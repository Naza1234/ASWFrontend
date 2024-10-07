

function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 10) {
        return data;
    }
    return data.slice(0, 10) + '...';
}

function checkNetworkError(error) {
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        console.error('Network error, retrying...');
        location.reload(); // Reload the app on network error
    } else {
        console.error('Error:', error);
    }
}

// Fetch user data
fetch(`${apiUrl}/user/user/${userId}`)
    .then((response) => response.json())
    .then((data) => {
        document.getElementsByClassName("user_name")[0].innerHTML = `Welcome back, ${shortenString(data.userName)}`;
        document.getElementsByClassName("loading_animation")[0].classList.add("not_active")
        document.getElementsByClassName("total_bal")[0].innerHTML = `$${data.AccountBalance}`;
    })
    .catch((error) => checkNetworkError(error));

// Fetch transaction history
var deposit = [];
var withdrawal = [];

function sumArray(numbers) {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

fetch(`${apiUrl}/history/history/${userId}`)
    .then((response) => response.json())
    .then((data) => {
        data.reverse();
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            populateData(element);
            if (element.Type === "deposit") {
                deposit.push(element.Amount);
                document.getElementsByClassName("deposit_amount")[0].innerHTML = `$${sumArray(deposit)}`;
            } else {
                withdrawal.push(element.Amount);
                document.getElementsByClassName("withdrawal_amount")[0].innerHTML = `$${sumArray(withdrawal)}`;
            }
        }
    })
    .catch((error) => checkNetworkError(error));

function populateData(data) {
    var container = document.querySelector(".history ul");
    var html = `
        <li>
            <p>${new Date(data.date).toLocaleDateString()}</p>
            <h1>Transfer ${data.Type === "deposit" ? "from" : "to"} ${shortenString(data.TransferName)}</h1>
            <h2>$${data.Amount}</h2>
            ${data.Type === "deposit" ? 
                `<svg width="24" height="24" class="deposit">...</svg>` : 
                `<svg width="24" height="24" class="withdrawal">...</svg>`
            }
        </li>`;
    container.insertAdjacentHTML('beforeend', html);
}
