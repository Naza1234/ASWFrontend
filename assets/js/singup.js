var winUrl="https://americansave.pro"
var apiUrl="https://aswserver.onrender.com"




var from = document.querySelector("form")
var inputs = document.querySelectorAll('.pin input');

document.addEventListener('DOMContentLoaded', (event) => {

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && index > 0 && input.value.length === 0) {
                inputs[index - 1].focus();
            }
        });
    });
});



from.addEventListener("submit",(e)=>{
    e.preventDefault()
    const pin = Array.from(inputs).map(input => input.value).join('');
    var input=document.querySelectorAll("input")
    const params= {
        userName: input[1].value,      
        userEmail:input[0].value,  
        userPin:pin,  
    }



    

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
         body: JSON.stringify(params),
      };
  
      fetch(`${apiUrl}/user/user`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       localStorage.setItem("ASWebUserKeyByNAZA",data._id)
       // console.log(data.id);
       window.location=`${winUrl}/dashboard.html`
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      }); 

})