

let isUpdating = false;
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
.then(async(data) => {
    data.reverse();
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
       const element = data[i];
       await populateData(element)
    }
    itemsClick()
    search()
    sendMessage()
    checkIfActive()
    rearrangeUsers()
    document.getElementsByClassName("loading_animation ")[0].classList.add("not_active")
    setInterval(() => {
        updateUsers()
    }, 5000);
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 



async function populateData(data) {
  var container = document.querySelector(".users ul");
  var newData = await setLastMessage(data._id);

  // Find existing user item by data-id attribute
  const existingUser = container.querySelector(`li[data-id="${data._id}"]`);

  // Define the HTML structure for the user item
  var html = `
      <li data-id="${data._id}">
          <p class="hid">${data._id}</p>
          <p class="hid">${newData.UncleanedDate}</p>
          <span>${newData.date}</span>
          <p>user name: <b class="name_to_chart">${shortenString(data.userName)}</b></p>
          <p>user email: <b>${data.userEmail}</b></p>
          <p><b>${newData.message}</b></p>
      </li>
  `;

  // Create a temporary element to convert the HTML string to an actual element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const newUserElement = tempElement.firstElementChild;

  // Replace the existing user item or append if it doesn't exist
  if (existingUser) {
      existingUser.replaceWith(newUserElement);
  } else {
      container.appendChild(newUserElement);
  }
}




var chatId

function itemsClick(){
    var items =document.querySelectorAll(".users ul li")
    // console.log(items);
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",()=>{
            var id = element.getElementsByClassName("hid")[0].textContent.trim()
            document.querySelector(".edit_account").classList.add("active")
             var nameOfChart=element.getElementsByClassName("name_to_chart")[0].innerHTML.trim()            
             chatId =id
        
         
            populateChat(id)
            document.getElementsByClassName("name_of_chart")[0].innerHTML=`charting with: ${nameOfChart}`
            const container = document.getElementsByClassName("messages_ul")[0]
            container.innerHTML=""
            document.getElementsByClassName("messages_ul")[0].classList.add("active")
        })
    }

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
  
  function sendMessage() {
    var sendMessageBtn = document.getElementsByClassName("button")[0];
    
    sendMessageBtn.addEventListener("click", (e) => {
      var btn = e.target;
      var inputField = btn.parentElement.getElementsByTagName("input")[0]; // Referring to the input field
      var inputValue = inputField.value; // Value from input field
      
      if ((inputValue.length > 0) && chatId && userId) { // Ensure chatId and userId exist
        // Disable the button while the request is being made
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.5";
        
        var params = {
          userId: userId,
          chartId: chatId,
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
  

  function populateChat(chatId) {
    
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
    }); 
  }



  function checkIfActive(){
    const container = document.getElementsByClassName("messages_ul")[0];
    if (container) { // Ensure the container exists
        var id = container.getElementsByClassName("hid")[0]
        if (id) {
            populateChat(id.innerHTML.trim())
        } else {
             // If no element with class "hid" is found
        }
    } else {
        
    }
}

  setInterval(() => {
    checkIfActive()
}, 5000);



function updateUsers() {
  // If updateUsers is already running, exit early
  if (isUpdating) {
    return;
  }

  isUpdating = true; // Mark as updating

  // Fetch users
  fetch(`${apiUrl}/user/user`)
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      data.reverse();
      // Populate user data asynchronously
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        await populateData(element); // Make sure populateData is async
      }

      rearrangeUsers(); // Rearrange users after populating
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      // Reset the flag after the operation is done
      isUpdating = false;
     
    });
}


async function setLastMessage(id) {
    try {
      const response = await fetch(`${apiUrl}/chat/chat/${id}`);
      const data = await response.json();
  

  
      // Return the formatted date and message
      return {
        date: data.length > 0 ? formatDateOrTime(data[data.length - 1].createdAt) : "no chat",
        message: data.length > 0 ? data[data.length - 1].Message : "no message yet",
        UncleanedDate:data.length > 0 ? data[data.length - 1].createdAt : "not yet"
      };
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      return {
        date: "Error",
        message: "Error fetching data"
      };
    }
  }
  
 
function formatDateOrTime(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
  
    // Check if the input date is today
    const isToday = inputDate.getDate() === today.getDate() &&
                    inputDate.getMonth() === today.getMonth() &&
                    inputDate.getFullYear() === today.getFullYear();
  
    if (isToday) {
      // If today, return the time in HH:mm format
      const hours = inputDate.getHours().toString().padStart(2, '0');
      const minutes = inputDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes} today`;
    } else {
      // If not today, return the date in YYYY-MM-DD format
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const day = inputDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }


  function rearrangeUsers() {
    // Select the user list and all user list items
    var userList = document.querySelector(".users ul");
    var users = Array.from(document.querySelectorAll(".users ul li"));
    
    // Sort the users based on their dates
    users.sort((a, b) => {
        var dateA = a.getElementsByClassName("hid")[1].textContent.trim();
        var dateB = b.getElementsByClassName("hid")[1].textContent.trim();

        if (dateA === "not yet") return 1;
        if (dateB === "not yet") return -1;

        var dateObjA = new Date(dateA);
        var dateObjB = new Date(dateB);

        return dateObjB - dateObjA;
    });

    // Remove all existing list items in the DOM
    userList.innerHTML = "";
    // Append each user in the sorted order
    users.forEach(user => {
        userList.appendChild(user);
    });
}
