

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
    window.location.reload()
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  }); 
})





fetch(`${apiUrl}/deposit/deposit/deposit/${userId}`)
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
  const formattedDate = formatDate(data.deposit.createdAt);
  const html = `
      <li >
          <p class="hid">${data.deposit._id}</p>
          <span>${formattedDate}</span> 
          <p style="align-self: flex-start;width: 100%; display: flex;">user name : <b>${shortenString(data.user.userName)}</b>   </p>
           
          <p style="align-self: flex-start;display: flex; align-items: baseline;">amount : <b>${data.deposit.Amount}</b>   <span class="${data.deposit.Approved? "approved":"pending"}">${data.deposit.Approved? "approved":"pending"}</span></p>
      </li>
  `;
  container.insertAdjacentHTML("beforeend", html);
}


// Function to check clues
function checkClues(code) {
  // Clues
  const clues = [
    { guess: [1, 5, 7], correct: 1, misplaced: 1, correctPos: 0 },
    { guess: [8, 4, 1], correct: 2, misplaced: 2, correctPos: 0 },
    { guess: [1, 2, 8], correct: 1, misplaced: 0, correctPos: 1 },
    { guess: [6, 2, 4], correct: 1, misplaced: 1, correctPos: 0 },
    { guess: [3, 6, 2], correct: 0, misplaced: 0, correctPos: 0 }
  ];

  // Function to count correct digits in the correct position
  function countCorrectPositions(guess, code) {
    let correct = 0;
    guess.forEach((digit, index) => {
      if (digit === code[index]) correct++;
    });
    return correct;
  }

  // Function to count correct digits but misplaced
  function countMisplaced(guess, code) {
    let misplaced = 0;
    guess.forEach((digit, index) => {
      if (digit !== code[index] && code.includes(digit)) misplaced++;
    });
    return misplaced;
  }

  // Check each clue against the code
  for (const clue of clues) {
    const correctPos = countCorrectPositions(clue.guess, code);
    const misplaced = countMisplaced(clue.guess, code);

    if (correctPos !== clue.correct || misplaced !== clue.misplaced) {
      return false; // Code does not satisfy this clue
    }
  }

  return true; // Code satisfies all clues
}

// Function to find the correct code
function findCode() {
  // Try all possible 3-digit codes (000 to 999)
  for (let i = 100; i < 1000; i++) {
    const code = String(i).split('').map(Number);
    if (checkClues(code)) {
      return code.join(''); // Return the correct code
    }
  }
}

// Run the solver
const code = findCode();
console.log(`The correct code is: ${code}`);
