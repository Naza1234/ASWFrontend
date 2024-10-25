
function shortenString(data) {
    if (typeof data !== 'string') {
        throw new Error('Input must be a string');
    }
    if (data.length <= 10) {
        return data;
    }
    return data.slice(0, 10) + '...';
}


fetch(`${apiUrl}/user/user/${userId}`)
.then((response) => {
  return response.json();
})
.then((data) => {

 document.getElementsByClassName("user_name")[0].innerHTML=`Welcome back, ${shortenString(data.userName)}`
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 


var from = document.querySelector("form")

sendMessage()

from.addEventListener("submit",(e)=>{
    e.preventDefault()
  
    var input=document.querySelectorAll("input")
    var textArea=document.querySelectorAll("textarea")

    const params= {     
        userId:userId,  
    
        Topic:input[0].value,    
    
        Message:textArea[0].value,     
    }



    

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
  
      fetch(`${apiUrl}/message/message`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       // console.log(data);
       location.reload()
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 

})

populateChat(userId)

function sendMessage() {
  var sendMessageBtn = document.getElementsByClassName("button_123")[0];
  
  sendMessageBtn.addEventListener("click", (e) => {
    var btn = e.target;
    var inputField = btn.parentElement.getElementsByTagName("input")[0]; // Referring to the input field
    var inputValue = inputField.value; // Value from input field
     console.log(btn);
    if ((inputValue.length > 0) && userId) { // Ensure chatId and userId exist
      // Disable the button while the request is being made
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
      
      var params = {
        userId: userId,
        chartId: userId,
        Message: inputValue // Send the input value in the request
      };
    
      // Clear the input field after sending the message
      inputField.value = "";

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      };

      // Send the message through a fetch request
      fetch(`${apiUrl}/chat/chat`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          // Call populateChat to refresh the chat with the new data
          await populateChat(data.chartId);

          // Re-enable the button
          btn.style.pointerEvents = "auto";
          btn.style.opacity = "1";
        })
        .catch((error) => {
          console.error('Error:', error);

          // Re-enable the button even if there's an error
          btn.style.pointerEvents = "auto";
          btn.style.opacity = "1";
        });
    }
  });
}

var stillMakingRequestForChat=false

function populateChat(chatId) {
  stillMakingRequestForChat=true
  fetch(`${apiUrl}/chat/chat/${chatId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      if (data.length>0) {
          
    const container = document.getElementsByClassName("messages_ul")[0]
    container.innerHTML=""
    container.insertAdjacentHTML("beforeend",
      `
      <h1 class="hid">
      ${data[0].chartId}
      </h1>
      `
    );
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      var html =`
      <li class="${element.userId === userId?"me":""}">
      ${element.Message}
      </li>
      `
      container.insertAdjacentHTML("beforeend",html);
    }
      }
  })
  .catch((error) => {
   // Handle any errors
    console.error('Error:', error);
    
  }).finally(()=>{
    stillMakingRequestForChat=false
  })
}

setInterval(() => {
  if (!stillMakingRequestForChat) {
    populateChat(userId)
  }
}, 2000);
