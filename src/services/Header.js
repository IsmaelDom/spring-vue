export default function Header() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        console.log("Token: " + user.accessToken);
        return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    } else {
        return {};
    }
  }