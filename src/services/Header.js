//Devuelve un objeto que contiene el JWT del usuario actualmente conectado desde el almacenamiento local.
export default function Header() {
    //user se settea en la conexión por post a el login.
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        console.log("Token: " + user.accessToken);
        return { Authorization: 'Bearer ' + user.accessToken }; // retorna el token del usuario
    } else {
        return {};
    }
  }