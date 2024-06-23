



var form = document.getElementsByTagName("form")[0]

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var input=form.getElementsByTagName("input")
    const params={
        TagType:input[0].value,  
    
        TagId:input[1].value, 
    }

    

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
  
      fetch(`${apiUrl}/tag/tag`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
      location.reload()
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 
})