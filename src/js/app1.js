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
  tablaProductos.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
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

 // Función para abrir el modal
function abrirModal() {
    const modal = document.getElementById("modalInsertarProducto");
    modal.classList.remove("hidden");
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById("modalInsertarProducto");
    modal.classList.add("hidden");
}

// Función para guardar el producto en la base de datos
function guardarProducto() {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("Nombre").value;
    const imagen = document.getElementById("imge").value;
    const descripcion = document.getElementById("Descripcion").value;

    // Insertar el nuevo producto en la base de datos
    coleccionProductos.push({
        codigo: codigo,
        Nombre: nombre,
        imge: imagen,
        Descripcion: descripcion
    });

    // Cerrar el modal después de guardar
    // Limpiar los campos del modal después de guardar
    document.getElementById("codigo").value = "";
    document.getElementById("Nombre").value = "";
    document.getElementById("imge").value = "";
    document.getElementById("Descripcion").value = "";

    cerrarModal();
}

// Función para abrir el modal de edición con los datos del producto
function abrirModalEditar(key) {
    const modal = document.getElementById("modalEditarProducto");
    const form = document.getElementById("formEditarProducto");

    // Obtener el snapshot del producto
    const productoSnapshot = coleccionProductos.child(key);

    // Escuchar el evento "value" para obtener los datos del producto
    productoSnapshot.once("value", function(snapshot) {
        const producto = snapshot.val();

        // Llenar el formulario con los datos del producto
        form.elements["editNombre"].value = producto.Nombre;
        form.elements["editImagen"].value = producto.imge;
        form.elements["editDescripcion"].value = producto.Descripcion;

        // Escuchar el evento submit del formulario
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
            const nuevoNombre = form.elements["editNombre"].value;
            const nuevaImagen = form.elements["editImagen"].value;
            const nuevaDescripcion = form.elements["editDescripcion"].value;
            
            // Verificar que se haya proporcionado al menos un campo para actualizar
            if (nuevoNombre || nuevaImagen || nuevaDescripcion) {
                // Actualizar el producto en la base de datos
                const valoresActualizados = {};
                if (nuevoNombre) valoresActualizados.Nombre = nuevoNombre;
                if (nuevaImagen) valoresActualizados.imge = nuevaImagen;
                if (nuevaDescripcion) valoresActualizados.Descripcion = nuevaDescripcion;
                coleccionProductos.child(key).update(valoresActualizados);
                cerrarModalEditar(); // Cerrar el modal después de guardar los cambios
            } else {
                alert("Debes ingresar al menos un campo para actualizar.");
            }
        });

        // Mostrar el modal
        modal.classList.remove("hidden");
    });
}

// Función para cerrar el modal de edición
function cerrarModalEditar() {
    const modal = document.getElementById("modalEditarProducto");
    modal.classList.add("hidden");
}





// Función para cerrar el modal de confirmación de eliminación
function cerrarModalEliminarProducto() {
    const modalEliminarProducto = document.getElementById("modalEliminarProducto");
    modalEliminarProducto.classList.add("hidden");
}

// Variable global para almacenar temporalmente la clave del producto a eliminar
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

// Función para confirmar la eliminación del producto
function eliminarProductoConfirmado() {
    // Verificar si la clave del producto a eliminar está definida
    if (productoAEliminarKey) {
        // Eliminar el producto de la base de datos usando la clave almacenada
        coleccionProductos.child(productoAEliminarKey).remove();
        cerrarModalEliminarProducto();
        // Restablecer la variable de clave a null después de eliminar el producto
        productoAEliminarKey = null;
    } else {
        console.error("No se ha especificado la clave del producto a eliminar.");
    }
}

