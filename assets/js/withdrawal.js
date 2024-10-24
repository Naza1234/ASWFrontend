
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



from.addEventListener("submit",(e)=>{
    e.preventDefault()
  
    var input=document.querySelectorAll("input")
    const params= {     
        userId:userId,  
    
        TagType:input[1].value,  
    
        tagId:input[2].value,  
    
        Amount:input[0].value,  
    
        Status:"pending",   
    }



    

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
  
      fetch(`${apiUrl}/withDrawal/withDrawal`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       // console.log(data);
       window.location.reload()
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 

})




fetch(`${apiUrl}/withDrawal/withDrawal/withDrawal/${userId}`)
.then((response) => {
  return response.json();
})
.then((data) => {
  if (data.length > 0) {
      data.reverse();
      
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      populateData(element)
   }
    }
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 



function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

function populateData(data) {
  const container = document.querySelector(".users ul");
  const formattedDate = formatDate(data.withDrawal.createdAt);
  const html = `
      <li >
          <p class="hid">${data.withDrawal._id}</p>
          <span>${formattedDate}</span> 
          <p style="align-self: flex-start;width: 100%; display: flex;">user name : <b>${shortenString(data.user.userName)}</b>   </p>
           
          <p style="align-self: flex-start; align-items: baseline;display: flex;">amount : <b>${data.withDrawal.Amount}</b>   <span class="${data.withDrawal.Status==="pressed"? "approved":"pending"}">${data.withDrawal.Status==="pressed"? "approved":"pending"}</span></p>
      </li>
  `;
  container.insertAdjacentHTML("beforeend", html);
}


