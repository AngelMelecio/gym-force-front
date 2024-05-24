export function getColor(diasRestantes,tipoSuscripcion,frase) {
    let colorMessage = {};
    let colorInfo = {};
    let background = {};
    let info = frase;
    let message = "";

    if (diasRestantes >=8) {
        colorMessage = "text-green-500";
        colorInfo = "text-gray-700";
        background = "bg-green-500/[0.97]";
        info=frase;
    } else if (diasRestantes >= 5 && diasRestantes <= 7) {
        colorMessage = "text-gray-700";
        colorInfo = "text-yellow-400";
        background = "bg-yellow-400/[0.97]";
        info = "Acceso por vencer, " + diasRestantes + " días restantes"

    } else if (diasRestantes >= 2 && diasRestantes <= 4) {

        colorMessage = "text-gray-700";
        colorInfo = "text-orange-400";
        background = "bg-orange-400/[0.97]";
        info = "Acceso por vencer, " + diasRestantes + " días restantes"

    } else if (diasRestantes === 1) {

        colorMessage = "text-gray-700";
        colorInfo = "text-red-500";
        background = "bg-red-500/[0.97]";
        info = "Tu acceso vence mañana"

    } else if (diasRestantes === 0) {
        if (tipoSuscripcion==="Visita") {

            colorMessage = "text-green-500";
            colorInfo = "text-gray-700";
            background = "bg-green-500/[0.97]";
            info = "Disfruta tu visita"

        } else {

            colorMessage = "text-gray-700";
            colorInfo = "text-red-500";
            background = "bg-red-500/[0.97]";
            info = "Tu acceso vence hoy"
        }
    } else if (diasRestantes < 0) {

        colorMessage = "text-gray-700";
        colorInfo = "text-red-500";
        background = "bg-red-500/[0.97]";
        info = "Tu acceso venció hace " + Math.abs(diasRestantes) + " días"

    } else if (diasRestantes === null) {

        colorMessage = "text-gray-500";
        colorInfo = "text-gray-500";
        background = "bg-gray-500/[0.97]";
        info = "No hay historial de suscripciones"
    }
    return { background, info , message, colorMessage, colorInfo};
}