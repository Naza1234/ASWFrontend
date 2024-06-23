var winUrl="https://americansave.pro"
var apiUrl="https://aswserver.onrender.com"



document.getElementsByClassName("nav_tog")[0].addEventListener("click",()=>{
    document.querySelector(".nav ul").classList.toggle("active")
})


var userId = localStorage.getItem("ASWebUserKeyByNAZA")
console.log(userId);


fetch(`${apiUrl}/user/user/${userId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data.userIsAdmin) {
      const navList = document.querySelector(".nav ul");
      navList.insertAdjacentHTML('beforeend', `
        <a href="./users.html">
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22.75C11.3 22.75 10.59 22.48 10.06 21.95L8.34998 20.26C7.92998 19.84 7.35001 19.61 6.76001 19.61H6C3.93 19.61 2.25 17.94 2.25 15.89V4.97998C2.25 2.92998 3.93 1.26001 6 1.26001H18C20.07 1.26001 21.75 2.92998 21.75 4.97998V15.89C21.75 17.94 20.07 19.61 18 19.61H17.24C16.65 19.61 16.07 19.85 15.65 20.26L13.94 21.95C13.41 22.48 12.7 22.75 12 22.75ZM6 2.75C4.76 2.75 3.75 3.74997 3.75 4.96997V15.88C3.75 17.11 4.76 18.1 6 18.1H6.76001C7.75001 18.1 8.70997 18.5 9.40997 19.19L11.12 20.88C11.61 21.36 12.4 21.36 12.89 20.88L14.6 19.19C15.3 18.5 16.26 18.1 17.25 18.1H18C19.24 18.1 20.25 17.1 20.25 15.88V4.96997C20.25 3.73997 19.24 2.75 18 2.75H6Z" />
              <path d="M11.9999 10.7501C10.2999 10.7501 8.91992 9.37004 8.91992 7.67004C8.91992 5.97004 10.2999 4.59009 11.9999 4.59009C13.6999 4.59009 15.08 5.97004 15.08 7.67004C15.08 9.37004 13.6999 10.7501 11.9999 10.7501ZM11.9999 6.09009C11.1299 6.09009 10.4199 6.80004 10.4199 7.67004C10.4199 8.54004 11.1299 9.25006 11.9999 9.25006C12.8699 9.25006 13.58 8.54004 13.58 7.67004C13.58 6.80004 12.8699 6.09009 11.9999 6.09009Z" />
              <path d="M16 16.4101C15.59 16.4101 15.25 16.0701 15.25 15.6601C15.25 14.2801 13.79 13.1501 12 13.1501C10.21 13.1501 8.75 14.2801 8.75 15.6601C8.75 16.0701 8.41 16.4101 8 16.4101C7.59 16.4101 7.25 16.0701 7.25 15.6601C7.25 13.4501 9.38 11.6501 12 11.6501C14.62 11.6501 16.75 13.4501 16.75 15.6601C16.75 16.0701 16.41 16.4101 16 16.4101Z" />
            </svg>
            admin
          </li>
        </a>
      `);
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
