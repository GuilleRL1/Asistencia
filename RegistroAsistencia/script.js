// ===============================
// 📌 Navegación con historial
// ===============================
function navegar(id) {
  history.pushState({seccion: id}, "", "#" + id);
  mostrarSeccion(id);
}

function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".section");
  secciones.forEach(seccion => seccion.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

function cerrarSesion() {
  document.getElementById("nav-bar").classList.add("oculto");
  navegar("inicio");
}

window.onpopstate = function(event) {
  if (event.state && event.state.seccion) {
    mostrarSeccion(event.state.seccion);
  } else {
    mostrarSeccion("inicio");
  }
};

// ===============================
// 📌 Login simulado
// ===============================
document.querySelector("#btn-login").addEventListener("click", function () {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  if (usuario === "admin" && contrasena === "1234") {
    alert("✅ Sesión iniciada");
    document.getElementById("nav-bar").classList.remove("oculto");
    navegar("administracion");
  } else {
    alert("❌ Usuario o contraseña incorrectos");
  }
});

// ===============================
// 📌 Control de asistencia
// ===============================
document.getElementById("btn-entrada").addEventListener("click", function() {
  const hora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  document.getElementById("registro-log").innerHTML =
    "<strong>Registro del día:</strong><br>Entrada: " + hora + "<br>Salida: --";
});

document.getElementById("btn-salida").addEventListener("click", function() {
  const hora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  let contenido = document.getElementById("registro-log").innerHTML;
  document.getElementById("registro-log").innerHTML =
    contenido.replace("Salida: --", "Salida: " + hora);
});

// ===============================
// 📌 Campo dinámico (PIN / Clave)
// ===============================
document.getElementById("metodo").addEventListener("change", function() {
  const valor = this.value;
  const campoExtra = document.getElementById("campo-extra");
  if (valor === "PIN" || valor === "Clave") {
    campoExtra.classList.remove("oculto");
    campoExtra.innerHTML = `
      <label for="input-extra">${valor}</label>
      <input type="${valor === "PIN" ? "number" : "password"}" id="input-extra" placeholder="Ingresa tu ${valor}">
    `;
  } else {
    campoExtra.classList.add("oculto");
    campoExtra.innerHTML = "";
  }
});

// ===============================
// 📌 Reloj en tiempo real
// ===============================
function actualizarHora() {
  const formato = document.getElementById("formatoHora")?.value || "12";
  let opciones = {hour: '2-digit', minute: '2-digit'};
  opciones.hour12 = (formato === "12");
  const hora = new Date().toLocaleTimeString([], opciones);
  document.getElementById("hora-actual").value = hora;
}

setInterval(actualizarHora, 1000);

// ===============================
// 📌 Ajustes
// ===============================
function guardarAjustes() {
  const tema = document.getElementById("tema").value;
  document.body.classList.toggle("dark", tema === "oscuro");
  alert("✅ Ajustes guardados");
}

// ===============================
// 📌 Iniciar
// ===============================
window.onload = function () {
  navegar("inicio");
  actualizarHora();

};

let empleados = [];
let asistencias = [];

function mostrarFormularioEmpleado() {
  document.getElementById("formEmpleado").classList.toggle("oculto");
  document.getElementById("reportes").classList.add("oculto");
}

function mostrarReportes() {
  document.getElementById("reportes").classList.toggle("oculto");
  document.getElementById("formEmpleado").classList.add("oculto");
  actualizarReportes();
}

function agregarEmpleado() {
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;

  if (!cedula || !nombre) {
    alert("⚠️ Ingresa al menos cédula y nombre");
    return;
  }

  empleados.push({ cedula, nombre, telefono });
  alert("✅ Usuario agregado");
  document.getElementById("formEmpleado").classList.add("oculto");
}

// Simulación: registrar asistencia desde el registro
function registrarAsistencia(cedula, tipo) {
  const fecha = new Date().toLocaleString();
  asistencias.push({ cedula, tipo, fecha });
}

// Actualizar tabla de reportes
function actualizarReportes() {
  if (asistencias.length === 0) {
    document.getElementById("tablaAsistencias").innerHTML = "No hay registros.";
    return;
  }

  let html = "<table><tr><th>Cédula</th><th>Tipo</th><th>Fecha y Hora</th></tr>";
  asistencias.forEach(a => {
    html += `<tr><td>${a.cedula}</td><td>${a.tipo}</td><td>${a.fecha}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("tablaAsistencias").innerHTML = html;
}

