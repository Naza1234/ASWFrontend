
var paramsForHistory ={}
var userAccountB
var withdrawalAmount
var userEditId
var withdrawalEditId

function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 15) {
        return data;
    }
    return data.slice(0, 15) + '...';
}





fetch(`${apiUrl}/withDrawal/withDrawal`)
.then((response) => {
  return response.json();
})
.then((data) => {
    data.reverse();
    // console.log(data);
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
    const formattedDate = formatDate(data.withDrawal.createdAt);
    const html = `
        <li class="${data.withDrawal.Status != "pending"? "approved" : ""}">
            <p class="hid">${data.withDrawal._id}</p>
            <span>${formattedDate}</span>
            <p>user name : <b>${shortenString(data.user.userName)}</b></p>
            <p>amount : <b>${data.withDrawal.Amount}</b></p>
            <p>tag type : <b>${data.withDrawal.TagType}</b></p>
        </li>
    `;
    container.insertAdjacentHTML("beforeend", html);
}






function itemsClick(){
    var items =document.querySelectorAll(".users ul li")
    // console.log(items);
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",()=>{
            var id = element.getElementsByClassName("hid")[0].textContent.trim()
            withdrawalEditId=id






fetch(`${apiUrl}/withDrawal/withDrawal/${id}`)
.then((response) => {
  return response.json();
})
.then((data) => {
   document.querySelector(".edit_account").classList.add("active")
   // console.log(data);
   userAccountB=data.user.AccountBalance
   withdrawalAmount=data.withDrawal.Amount
   userEditId= data.user._id


 paramsForHistory = {
    userId: data.user._id,
    TransferName: data.user.userName,
    Amount: data.withDrawal.Amount,
    date: data.withDrawal.createdAt,
    Type: "withdrawal",
  };
   maker(data)
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
<p class="hid">${data.withDrawal._id}</p>
<p>email : <b>${data.user.userEmail}</b></p>
<p>account balance : <b>$${data.user.AccountBalance}</b></p>

<form action="">
<h2>
    request details
</h2>
<label for="">
    amount
    <input type="text" readonly value="${data.withDrawal.Amount}">
</label>                
<label for="">
    tag type
    <input type="text" readonly value="${data.withDrawal.TagType}">
</label>                
<label for="">
    tag id
    <input type="text" readonly value="${data.withDrawal.tagId}">
</label>                

<button> processed </button>
<br>
<button type="button" onclick="downloadHTMLAsPDF('${data.user.userName}-withdraw-slip')">
generate slip
</button>

</form>
      `;
    
    container.innerHTML=html
}


function pupLeaded() {
    const form = document.querySelector(".edit_account form");
    // console.log(form);
  
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
            AccountBalance: userAccountB - parseFloat(withdrawalAmount),
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
            Status: "pressed",
          };
  
          return fetch(`${apiUrl}/withDrawal/withDrawal/${withdrawalEditId}`, {
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
  


  
  function downloadHTMLAsPDF(name) {
    // Get the HTML element to convert
    var element = document.getElementById('content-to-download');
    
    // Optional settings for the PDF
    const options = {
        margin: 0, // No margins
        filename: `${name}.pdf`, // Output filename
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 }, // Scale up for higher quality
        jsPDF: { 
            unit: 'px', 
            format: [382, 735], // Custom width and height for PDF page in pixels
            orientation: 'portrait' 
        }, 
        // Avoid breaks between elements
    };

 
    // Convert the HTML element to PDF and trigger download
    html2pdf().from(element).set(options).save();
}


function maker({user,withDrawal}) {
  console.log(user);
  console.log(withDrawal);
  var html=
  `
  <div class="main_r_body" id="content-to-download" style="position: relative;width: 382px; height: 735px; isolation: isolate; background: url(../images/r back.png); background-position: center; display: flex; justify-content: center; align-items: center; background-size: cover; background-repeat: no-repeat;">
  <img src="./assets/images/r back.png" alt="" style="position: absolute;width: 100%;height: 100%; z-index: -10;">
  <div class="more_info_r" style="width: 360px; height: 530px; padding: 14px; background-color: #fff; border-radius: 5px; gap: 20px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
      <img src="./assets/images/logo (3).png" alt="" style="height: 33px; width: auto;">
      <br>
      <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
          <h2 style="font-size: 12px; font-weight: 500; opacity: .7;">Account name</h2>
          <h1 style="font-size: 12px; font-weight: 500;">${user.userName}</h1>
      </span>
      <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
          <h2 style="font-size: 12px; font-weight: 500; opacity: .7;">Account email</h2>
          <h1 style="font-size: 12px; font-weight: 500;">${user.userEmail}</h1>
      </span>
      <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
          <h2 style="font-size: 12px; font-weight: 500; opacity: .7;">Account balance</h2>
          <h1 style="font-size: 12px; font-weight: 500;">$${user.AccountBalance - withDrawal.Amount}</h1>
      </span>

      <br>
      <h5 style="font-size: 12px; font-weight: 500; opacity: .5;">Withdraw details</h5>
      <div style="width: 250px; display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center;">
          <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
              <h2 style="font-size: 10px; font-weight: 500; opacity: .7;">Amount</h2>
              <h1 style="font-size: 10px; font-weight: 500;">$${withDrawal.Amount}</h1>
          </span>
          <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
              <h2 style="font-size: 10px; font-weight: 500; opacity: .7;">Tag type</h2>
              <h1 style="font-size: 10px; font-weight: 500;">${withDrawal.TagType}</h1>
          </span>
          <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
              <h2 style="font-size: 10px; font-weight: 500; opacity: .7;">Tag ID</h2>
              <h1 style="font-size: 10px; font-weight: 500;">${formatString(withDrawal.tagId)}</h1>
          </span>
          <br>
          <img src="./assets/images/successful 1.png" alt="" style="width: 50px; height: 50px;">
          <h6 style="font-size: 16px; color: #008000; font-weight: 500;">Transaction Success</h6>
          <br>
          <span style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
              <h2 style="font-size: 10px; font-weight: 500; opacity: .7;">Date</h2>
              <h1 style="font-size: 10px; font-weight: 500;">${formatDate(withDrawal.createdAt)}</h1>
          </span>
      </div>
  </div>
</div>

  `

  document.getElementsByClassName("risipt")[0].innerHTML=html
}



function formatString(input) {
  // Check if input is valid (must be at least 5 characters long)
  if (!input || input.length < 5) {
      return "####################";
  }

  // Remove spaces from input for processing
  let cleanedInput = input.replace(/\s+/g, '');

  // Extract the first 2 characters
  let firstTwo = cleanedInput.substring(0, 2);

  // Extract the last 3 characters
  let lastThree = cleanedInput.substring(cleanedInput.length - 3);

  // Calculate the number of asterisks for the middle portion
  let middleLength = 15; // Total length - (first 2 + last 3)

  // Ensure we have enough characters for the asterisks to cover
  let asterisks = middleLength > 0 ? '*'.repeat(middleLength) : '';

  // Return the formatted string
  return `${firstTwo}${asterisks}${lastThree}`;
}


function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
      return "Invalid date";
  }

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero to month if needed
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day if needed

  // Return the formatted date as 'year-month-day'
  return `${day}-${month}-${year}`;
}

