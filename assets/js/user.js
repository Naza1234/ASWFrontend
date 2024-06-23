


var userEditId
var userAccountB

function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 15) {
        return data;
    }
    return data.slice(0, 15) + '...';
}



fetch(`${apiUrl}/user/user`)
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




function populateData(data) {
    var container = document.querySelector(".users ul");
    var html = `  <li>
    <p class="hid">${data._id}</p>
    <p>user name : <b>${shortenString(data.userName)}</b></p>
    <p>user email : <b>${data.userEmail}</b></p>
    <p>account balance : <b>$${data.AccountBalance}</b></p>
</li>
      `;
    
    container.insertAdjacentHTML("beforeend",html);
}




function itemsClick(){
    var items =document.querySelectorAll(".users ul li")
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",()=>{
            var id = element.getElementsByClassName("hid")[0].textContent.trim()
            userEditId = id






fetch(`${apiUrl}/user/user/${id}`)
.then((response) => {
  return response.json();
})
.then((data) => {
   document.querySelector(".edit_account").classList.add("active")
   console.log(data);
   userAccountB=data.AccountBalance
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
    ${data.userName}
</h1>
<p class="hid">${data._id}</p>
<p>user email : <b>${data.userEmail}</b></p>
<p>account balance : <b>$${data.AccountBalance}</b></p>
<form action="">
    <h2>
        edit account balance
    </h2>
    <label for="">
        type
        <select name="" id="" required>
            <option value="deposit">deposit</option>
            <option value="withdrawal">withdrawal</option>
        </select>
    </label>
    <label >
        amount
        <input type="number" required>
    </label>
    <label >
    date
    <input type="date" required>
    </label>
    <label>
        from?
        <input type="text" required>
    </label>
    <button> update </button>
</form>
      `;
    
    container.innerHTML=html
}


function  pupLeaded(){

    const form = document.querySelector(".edit_account form");
console.log(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    
      const inputs = form.getElementsByTagName("input");
      const selects = form.getElementsByTagName("select");
      
      const params = {
        userId: userEditId,
        TransferName: inputs[2].value,
        Amount: parseFloat(inputs[0].value),
        date: inputs[1].value,
        Type: selects[0].value,
      };
    
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };
    
      fetch(`${apiUrl}/history/history`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          const updatedUserData = {
            AccountBalance: userAccountB + parseFloat(inputs[0].value),
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
          // Optionally, reload the page or update the UI
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
} 



function search() {
    const input = document.querySelector(".users div input");
    const items = document.querySelectorAll(".users ul li");
  
    input.addEventListener("keyup", () => {
      const searchValue = input.value.toLowerCase();
  
      items.forEach((item) => {
        const userName = item.querySelector("p:nth-of-type(2)").textContent.trim().toLowerCase();
        const userEmail = item.querySelector("p:nth-of-type(3)").textContent.trim().toLowerCase();
  
        if (userName.includes(searchValue) || userEmail.includes(searchValue)) {
          item.classList.remove("hid");
        } else {
          item.classList.add("hid");
        }
      });
    });
  }
  