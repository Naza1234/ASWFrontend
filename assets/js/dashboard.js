

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
            `<svg width="24" height="24" class="deposit" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.05 16.25H11.17C9.84001 16.25 8.75 15.13 8.75 13.75C8.75 13.34 9.09 13 9.5 13C9.91 13 10.25 13.34 10.25 13.75C10.25 14.3 10.66 14.75 11.17 14.75H13.05C13.44 14.75 13.75 14.4 13.75 13.97C13.75 13.43 13.6 13.35 13.26 13.23L10.25 12.18C9.61 11.96 8.75 11.49 8.75 10.02C8.75 8.76999 9.74001 7.73999 10.95 7.73999H12.83C14.16 7.73999 15.25 8.85999 15.25 10.24C15.25 10.65 14.91 10.99 14.5 10.99C14.09 10.99 13.75 10.65 13.75 10.24C13.75 9.68999 13.34 9.23999 12.83 9.23999H10.95C10.56 9.23999 10.25 9.58999 10.25 10.02C10.25 10.56 10.4 10.64 10.74 10.76L13.75 11.81C14.39 12.03 15.25 12.5 15.25 13.97C15.25 15.23 14.26 16.25 13.05 16.25Z" />
            <path d="M12 17.25C11.59 17.25 11.25 16.91 11.25 16.5V7.5C11.25 7.09 11.59 6.75 12 6.75C12.41 6.75 12.75 7.09 12.75 7.5V16.5C12.75 16.91 12.41 17.25 12 17.25Z" />
            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2C12.75 2.41 12.41 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 11.59 21.59 11.25 22 11.25C22.41 11.25 22.75 11.59 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z" />
            <path d="M21 7.75H17C16.59 7.75 16.25 7.41 16.25 7V3C16.25 2.59 16.59 2.25 17 2.25C17.41 2.25 17.75 2.59 17.75 3V6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z" />
            <path d="M16.9999 7.75C16.8099 7.75 16.6199 7.68 16.4699 7.53C16.1799 7.24 16.1799 6.76 16.4699 6.47L21.4699 1.47C21.7599 1.18 22.2399 1.18 22.5299 1.47C22.8199 1.76 22.8199 2.24 22.5299 2.53L17.5299 7.53C17.3799 7.68 17.1899 7.75 16.9999 7.75Z" />
        </svg>` : 
        `<svg width="24" height="24" class="withdrawal" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.05 16.25H11.17C9.84001 16.25 8.75 15.13 8.75 13.75C8.75 13.34 9.09 13 9.5 13C9.91 13 10.25 13.34 10.25 13.75C10.25 14.3 10.66 14.75 11.17 14.75H13.05C13.44 14.75 13.75 14.4 13.75 13.97C13.75 13.43 13.6 13.35 13.26 13.23L10.25 12.18C9.61 11.95 8.75 11.49 8.75 10.02C8.75 8.76999 9.74001 7.73999 10.95 7.73999H12.83C14.16 7.73999 15.25 8.85999 15.25 10.24C15.25 10.65 14.91 10.99 14.5 10.99C14.09 10.99 13.75 10.65 13.75 10.24C13.75 9.68999 13.34 9.23999 12.83 9.23999H10.95C10.56 9.23999 10.25 9.58999 10.25 10.02C10.25 10.56 10.4 10.64 10.74 10.76L13.75 11.81C14.39 12.04 15.25 12.5 15.25 13.97C15.25 15.23 14.26 16.25 13.05 16.25Z" />
            <path d="M12 17.25C11.59 17.25 11.25 16.91 11.25 16.5V7.5C11.25 7.09 11.59 6.75 12 6.75C12.41 6.75 12.75 7.09 12.75 7.5V16.5C12.75 16.91 12.41 17.25 12 17.25Z" />
            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C12.41 1.25 12.75 1.59 12.75 2C12.75 2.41 12.41 2.75 12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 11.59 21.59 11.25 22 11.25C22.41 11.25 22.75 11.59 22.75 12C22.75 17.93 17.93 22.75 12 22.75Z" />
            <path d="M22 6.75C21.59 6.75 21.25 6.41 21.25 6V2.75H18C17.59 2.75 17.25 2.41 17.25 2C17.25 1.59 17.59 1.25 18 1.25H22C22.41 1.25 22.75 1.59 22.75 2V6C22.75 6.41 22.41 6.75 22 6.75Z" />
            <path d="M16.9999 7.75C16.8099 7.75 16.6199 7.68 16.4699 7.53C16.1799 7.24 16.1799 6.76 16.4699 6.47L21.4699 1.47C21.7599 1.18 22.2399 1.18 22.5299 1.47C22.8199 1.76 22.8199 2.24 22.5299 2.53L17.5299 7.53C17.3799 7.68 17.1899 7.75 16.9999 7.75Z" />
        </svg>`
            }
        </li>`;
    container.insertAdjacentHTML('beforeend', html);
}
