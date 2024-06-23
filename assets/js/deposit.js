

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




fetch(`${apiUrl}/tag/tag`)
.then((response) => {
  return response.json();
})
.then((data) => {
if (data.length>0) {
    document.getElementsByClassName("tag_type")[0].innerHTML=data[data.length-1].TagType
    document.getElementsByClassName("tag_id")[0].innerHTML=data[data.length-1].TagId
}
})
.catch((error) => {
  // Handle any errors
  console.error('Error:', error);
}); 


document.getElementsByClassName("button_process")[0].addEventListener("click",()=>{
    document.getElementsByClassName("popup")[0].classList.add("active")
})



var form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
  e.preventDefault()
  var Input = form.getElementsByTagName("input")


  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('Amount', Input[0].value);
  formData.append('media', Input[1].files[0]);

  const requestProof = {
      method: 'POST',
      body: formData,
  };
  

  
  fetch(`${apiUrl}/deposit/deposit`, requestProof)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementsByClassName("popup")[0].classList.remove("active")
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  }); 
})