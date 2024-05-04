// Your web app's Firebase configuration
var firebaseConfig = {
  //***ATENCIÓN***//
  //AQUÍ VA EL SDK QUE TE GENERE TÚ FIREBASE//
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
coleccionProductos = db.ref().child('productos');
 // Obtén los datos de los productos
// Función para obtener y mostrar los productos
function mostrarProductos() {
  coleccionProductos.on('value', function(snapshot) {
    // Limpiar el contenedor de productos antes de agregar los nuevos productos
    document.getElementById('productos-container').innerHTML = '';
  
    snapshot.forEach(function(childSnapshot) {
      // Obtener los datos de cada producto
      var producto = childSnapshot.val();
      
      // Crear un elemento HTML para mostrar el producto
      var productoHTML = `
        <div class="w-full px-4 md:w-1/2 xl:w-1/3">
          <div class="mb-10 overflow-hidden duration-300 bg-white rounded-lg dark:bg-dark-2 shadow-1 hover:shadow-3 dark:shadow-card dark:hover:shadow-3">
            <img src="${producto.imge}" alt="image" class="w-full" />
            <div class="p-8 text-center sm:p-9 md:p-7 xl:p-9">
              <h3>
                <a href="javascript:void(0)" class="text-dark dark:text-white hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                  ${producto.Nombre}
                </a>
              </h3>
              <p class="text-base leading-relaxed text-body-color mb-7">
                ${producto.Descripcion}
              </p>
              <a href="javascript:void(0)" class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-primary border-gray-3 px-7 hover:text-white dark:border-dark-3 dark:text-dark-6">
                View Details
              </a>
            </div>
          </div>
        </div>
      `;
      
      // Agregar el elemento HTML del producto al contenedor de productos
      document.getElementById('productos-container').innerHTML += productoHTML;
    });
  });
}

// Llamar a la función para mostrar los productos cuando se carga la página
window.onload = function() {
  mostrarProductos();
};
