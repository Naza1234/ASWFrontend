
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
       location.reload()
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 

})


