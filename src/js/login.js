// Your web app's Firebase configuration
var firebaseConfig = {
    //***ATENCIÓN***//
    apiKey: "AIzaSyCRTmcrCKhMaC-xf1UvRBqir_H-od5WxZM",
    authDomain: "pruebaxd-571b0.firebaseapp.com",
    databaseURL: "https://pruebaxd-571b0-default-rtdb.firebaseio.com",
    projectId: "pruebaxd-571b0",
    storageBucket: "pruebaxd-571b0.appspot.com",
    messagingSenderId: "444086052627",
    appId: "1:444086052627:web:3e84a4f7609c21932c9ce6",
    measurementId: "G-GEJ8R179RD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionUsuarios = db.ref().child('user');
//coleccionProductos = db.ref().child('productos');

coleccionUsuarios.once('value', (snapshot) => {
    const usuarios = snapshot.val();
    console.log(usuarios);
});

$('#btnLogin').click(function () {
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de correo electrónico y contraseña del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Realizar una consulta a la base de datos para verificar si el usuario existe y la contraseña coincide
            const snapshot = await coleccionUsuarios.once('value');
            const usuarios = snapshot.val();
            
            // Verificar si el usuario con el correo electrónico proporcionado existe y si la contraseña coincide
            let usuarioEncontrado = false;
            if (usuarios) {
                Object.keys(usuarios).forEach((key) => {
                    const usuario = usuarios[key];
                    if (usuario.email === email && usuario.password === password) {
                        usuarioEncontrado = true;
                        console.log("Usuario encontrado:", usuario.user);
                        console.log("Rol:", usuario.rol);
                        window.location.href = "https://jeinermenxd.github.io/practicax_h1/src/components/admin.html"
                        // Si el inicio de sesión es exitoso, muestra una alerta
                        Swal.fire({
                            icon: 'success',
                            title: 'Signed in successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        
                    }
                });
            }

            if (!usuarioEncontrado) {
                console.log("Usuario no encontrado o contraseña incorrecta.");
                             // Si el inicio de sesión es exitoso, muestra una alerta
                             Swal.fire({
                                icon: 'error',
                                title: 'Usuario no encontrado o contraseña incorrecta.',
                                showConfirmButton: false,
                                timer: 1500
                            });
            }
        } catch (error) {
            console.error("Error al consultar la base de datos:", error);
            // Aquí puedes manejar el error como desees, por ejemplo, mostrando un mensaje al usuario
        }
    });
});

