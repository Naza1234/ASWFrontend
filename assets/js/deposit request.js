


var paramsForHistory ={}
var userAccountB
var depositAmount
var userEditId
var depositEditId

function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 15) {
        return data;
    }
    return data.slice(0, 15) + '...';
}





fetch(`${apiUrl}/deposit/deposit`)
.then((response) => {
  return response.json();
})
.then((data) => {
    data.reverse();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
       const element = data[i];
       populateData(element)
    }
    itemsClick()
    search()
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 


function search() {
    const input = document.querySelector(".users div input");
    const items = document.querySelectorAll(".users ul li");
  
    input.addEventListener("keyup", () => {
      const searchValue = input.value.toLowerCase();
  
      items.forEach((item) => {
        const userName = item.querySelector("p:nth-of-type(2)").textContent.trim().toLowerCase();
  
        if (userName.includes(searchValue)) {
          item.classList.remove("hid");
        } else {
          item.classList.add("hid");
        }
      });
    });
  }
  




function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

function populateData(data) {
    const container = document.querySelector(".users ul");
    const formattedDate = formatDate(data.deposit.createdAt);
    const html = `
        <li class="${data.deposit.Approved ? "approved" : ""}">
            <p class="hid">${data.deposit._id}</p>
            <span>${formattedDate}</span>
            <p>user name : <b>${shortenString(data.user.userName)}</b></p>
            <p>amount : <b>${data.deposit.Amount}</b></p>
        </li>
    `;
    container.insertAdjacentHTML("beforeend", html);
}






function itemsClick(){
    var items =document.querySelectorAll(".users ul li")
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",()=>{
            var id = element.getElementsByClassName("hid")[0].textContent.trim()
            depositEditId=id






fetch(`${apiUrl}/deposit/deposit/${id}`)
.then((response) => {
  return response.json();
})
.then((data) => {
   document.querySelector(".edit_account").classList.add("active")
   console.log(data);
   userAccountB=data.user.AccountBalance
   depositAmount=data.deposit.Amount
   userEditId= data.user._id
 paramsForHistory = {
    userId: data.user._id,
    TransferName: data.user.userName,
    Amount: data.deposit.Amount,
    date: data.deposit.createdAt,
    Type: "deposit",
  };
   populateUserDat(data)
   pupLeaded()


})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 











        })
    }

}






function populateUserDat(data){
    var container = document.querySelector(".edit_account");
    var html = `    <h1>
    ${data.user.userName}
</h1>
<p class="hid">${data.deposit._id}</p>
<p>account balance : <b>$${data.user.AccountBalance}</b></p>
<img src="${data.deposit.Proof}" alt="" class="proof">
            <form action="">
                <button> update balance</button>
            </form>
      `;
    
    container.innerHTML=html
}







function pupLeaded() {
    const form = document.querySelector(".edit_account form");
    console.log(form);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paramsForHistory),
      };
  
      fetch(`${apiUrl}/history/history`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const updatedUserData = {
            AccountBalance: userAccountB + parseFloat(depositAmount),
          };
  
          return fetch(`${apiUrl}/user/user/${userEditId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const updatedDepositData = {
            Approved: true,
          };
  
          return fetch(`${apiUrl}/deposit/deposit/${depositEditId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDepositData),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Optionally, reload the page or update the UI
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  }
  