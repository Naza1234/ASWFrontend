
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