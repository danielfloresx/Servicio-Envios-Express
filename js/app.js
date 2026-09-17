console.log("Servicio Envíos Express se ha iniciado correctamente.");

const botonesServicio = document.querySelectorAll(".service-button");
const tarjetasServicio = document.querySelectorAll(".service-card");

let servicioSeleccionado = "";

botonesServicio.forEach(function (boton) {

    boton.addEventListener("click", function () {

        tarjetasServicio.forEach(function (tarjeta) {
            tarjeta.classList.remove("is-selected");
        });

        const tarjetaSeleccionada = boton.closest(".service-card");

        tarjetaSeleccionada.classList.add("is-selected");

        servicioSeleccionado = boton.dataset.service;

        console.log("Servicio seleccionado:", servicioSeleccionado);
    });

});

//Manejar el botón de detalles para mostrar u ocultar información adicional
const botonDetalles = document.querySelector("#details-button");
const informacionAdicional = document.querySelector("#additional-info");

botonDetalles.addEventListener("click", function () {

    if (informacionAdicional.hidden) {

        informacionAdicional.hidden = false;
        botonDetalles.textContent = "Ocultar información adicional";

    } else {

        informacionAdicional.hidden = true;
        botonDetalles.textContent = "Ver información adicional";

    }

});

//Procesar y validar el formulario de envío

const formulario = document.querySelector("#shipping-form");
const resultado = document.querySelector("#result-card");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const origen = document.querySelector("#origen").value;
    const destino = document.querySelector("#destino").value;
    const tipoEnvio = document.querySelector("#tipo-envio").value;
    const peso = document.querySelector("#peso").value;
    const urgencia = document.querySelector("#urgencia").value;

    let servicioRecomendado = "";
    let nombreServicio = "";

    if (urgencia === "baja") {

        servicioRecomendado = "Básico";
        nombreServicio = "basico";

    } else if (urgencia === "media") {

        servicioRecomendado = "Estándar";
        nombreServicio = "estandar";

    } else if (urgencia === "alta") {

        servicioRecomendado = "Prioritario";
        nombreServicio = "prioritario";

    }

    //Mostrar datos obtenidos en la sección de resultados
    resultado.innerHTML = `
    <h3>${servicioRecomendado}</h3>

    <p><strong>Origen:</strong> ${origen}</p>
    <p><strong>Destino:</strong> ${destino}</p>
    <p><strong>Tipo de envío:</strong> ${tipoEnvio}</p>
    <p><strong>Peso:</strong> ${peso} kg</p>

    <p>
        <strong>Servicio sugerido:</strong>
        ${servicioRecomendado}
    </p>`;

    resultado.scrollIntoView({
    behavior: "smooth",
    block: "center"
    });

    //Quitar selecion anteir
    tarjetasServicio.forEach(function (tarjeta) {
        tarjeta.classList.remove("is-selected");
    });


    botonesServicio.forEach(function (boton) {

        if (boton.dataset.service === nombreServicio) {

            const tarjeta = boton.closest(".service-card");

            tarjeta.classList.add("is-selected");

        }

    });


    console.log(origen, destino, tipoEnvio, peso, urgencia);

});

//Restablecer la interfaz al limpiar el formulario
formulario.addEventListener("reset", function () {

    tarjetasServicio.forEach(function (tarjeta) {
        tarjeta.classList.remove("is-selected");
    });

    servicioSeleccionado = "";

    informacionAdicional.hidden = true;

    botonDetalles.textContent = "Ver información adicional";

    resultado.innerHTML = `
        <h3>Servicio recomendado</h3>
        <p>Completa el formulario para obtener una recomendación.</p>
    `;

});