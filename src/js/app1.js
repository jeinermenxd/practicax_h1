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
  // Después de inicializar Firebase
const tablaProductos = document.getElementById("bodyProductos");

coleccionProductos.on("value", snapshot => {
  tablaProductos.innerHTML = ""; // Limpiar la tabla antes de agregar
  snapshot.forEach(childSnapshot => {
    const producto = childSnapshot.val();
    const fila = `
      <tr>
        <td class="text-center px-4 py-2">${producto.codigo}</td>
        <td class="text-center px-4 py-2">${producto.Nombre}</td>
        <td class="text-center px-4 py-2">${producto.imge}</td>
        <td class="text-center px-4 py-2">${producto.Descripcion}</td>
        <td class=" text-center px-4 py-2">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="abrirModalEditar('${childSnapshot.key}')">Editar</button>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="eliminarProducto('${childSnapshot.key}')">Eliminar</button>
        </td>
      </tr>
    `;
    tablaProductos.innerHTML += fila;
  });
});

function abrirModal() {
    const modal = document.getElementById("modalInsertarProducto");
    modal.classList.remove("hidden");
}


function cerrarModal() {
    const modal = document.getElementById("modalInsertarProducto");
    modal.classList.add("hidden");
}

// Función para guardar el producto en la base
function guardarProducto() {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("Nombre").value;
    const imagen = document.getElementById("imge").value;
    const descripcion = document.getElementById("Descripcion").value;

    // Insertar el nuevo producto 
    coleccionProductos.push({
        codigo: codigo,
        Nombre: nombre,
        imge: imagen,
        Descripcion: descripcion
    });

    // Limpiar los campos
    document.getElementById("codigo").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("imge").value = "";
    document.getElementById("Descripcion").value = "";

    cerrarModal();
}

function abrirModalEditar(key) {
    const modal = document.getElementById("modalEditarProducto");
    const productoRef = coleccionProductos.child(key);

    productoRef.once("value", snapshot => {
      const producto = snapshot.val();
      document.getElementById("editCodigo").value = producto.codigo;
      document.getElementById("editNombre").value = producto.Nombre;
      document.getElementById("editImagen").value = producto.imge;
      document.getElementById("editDescripcion").value = producto.Descripcion;

      // Almacenar referencia del producto para poder actualizarlo
      modal.dataset.productoRefKey = key;
    });

    modal.classList.remove("hidden");
  }

  // Función para cerrar el modal de edición
  function cerrarModalEditar() {
    const modal = document.getElementById("modalEditarProducto");
    modal.classList.add("hidden");
  }
  // Función para guardar la edición del producto en la base de datos
  function guardarEdicionProducto(event) {
    event.preventDefault();

    const modal = document.getElementById("modalEditarProducto");
    const key = modal.dataset.productoRefKey;
    const productoRef = coleccionProductos.child(key);

    const codigo = document.getElementById("editCodigo").value;
    const nombre = document.getElementById("editNombre").value;
    const imagen = document.getElementById("editImagen").value;
    const descripcion = document.getElementById("editDescripcion").value;

    const productoActualizado = {
      codigo: codigo,
      Nombre: nombre,
      imge: imagen,
      Descripcion: descripcion
    };

    productoRef.update(productoActualizado);

    cerrarModalEditar();
  }


function cerrarModalEliminarProducto() {
    const modalEliminarProducto = document.getElementById("modalEliminarProducto");
    modalEliminarProducto.classList.add("hidden");
}

// Variable global para la clave del producto a eliminar
let productoAEliminarKey = null;

// Función para abrir el modal de confirmación de eliminación
function abrirModalEliminar(key) {
    const modal = document.getElementById("modalEliminarProducto");
    modal.classList.remove("hidden");
    // Almacenar la clave del producto a eliminar
    productoAEliminarKey = key;
}

// Función para eliminar un producto
function eliminarProducto(key) {
    abrirModalEliminar(key);
}

function eliminarProductoConfirmado() {
    // Verificar si la clave del producto a eliminar está definida
    if (productoAEliminarKey) {
        // Eliminar el producto usando la clave almacenada
        coleccionProductos.child(productoAEliminarKey).remove();
        cerrarModalEliminarProducto();
        // Restablecer la variable de clave a null después de eliminar 
        productoAEliminarKey = null;
    } else {
        console.error("No se ha especificado la clave del producto a eliminar.");
    }
}

