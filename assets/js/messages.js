
function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 15) {
        return data;
    }
    return data.slice(0, 15) + '...';
}





fetch(`${apiUrl}/message/message`)
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
    const formattedDate = formatDate(data.message.createdAt);
    const html = `
        <li >
            <p class="hid">${data.message._id}</p>
            <span>${formattedDate}</span>
            <p>user name : <b>${shortenString(data.user.userName)}</b></p>
            <p>topic : <b>${data.message.Topic}</b></p>
            <p>message : <b>${shortenString(data.message.Message)}</b></p>
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
            withdrawalEditId=id






fetch(`${apiUrl}/message/message/${id}`)
.then((response) => {
  return response.json();
})
.then((data) => {
   document.querySelector(".edit_account").classList.add("active")
   console.log(data);

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
<p class="hid">${data.message._id}</p>
<p>email : <b>${data.user.userEmail}</b></p>

<form action="">
<h2>
    request details
</h2>
<label for="">
   topic
    <input type="text" readonly value="${data.message.Topic}">
</label>                
<label for="">
    message
    <textarea name="" id="" readonly>
    ${data.message.Message}
    </textarea>
</label>                            

<button> process </button>
</form>
      `;
    
    container.innerHTML=html
}




function pupLeaded() {
    const form = document.querySelector(".edit_account form");
    console.log(form);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      document.querySelector(".edit_account").classList.remove("active")
    });
  }
  