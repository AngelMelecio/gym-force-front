export function getColor(diasRestantes,tipoSuscripcion,frase) {
    let color = {};
    let background = {};
    let info = frase;
    let message = "¡ Bienvenid@ ! \n ";
    if (diasRestantes >=8) {
        color = "text-green-500";
        background = "bg-green-500/[0.97]";
        info=frase;
    } else if (diasRestantes >= 5 && diasRestantes <= 7) {
        color = "text-yellow-400";
        background = "bg-yellow-400/[0.97]";
        info = "Suscripción por vencer, " + diasRestantes + " días restantes"
    } else if (diasRestantes >= 2 && diasRestantes <= 4) {
        color = "text-orange-400";
        background = "bg-orange-400/[0.97]";
        info = "Suscripción por vencer, " + diasRestantes + " días restantes"

    } else if (diasRestantes === 1) {
        color = "text-red-500";
        background = "bg-red-500/[0.97]";
        message = "¡ Importante ! \n ";
        info = "Tu suscripción vence mañana"
    } else if (diasRestantes === 0) {
        if (tipoSuscripcion==="Visita") {
            color = "text-green-500";
            background = "bg-green-500/[0.97]";
            info = "Disfruta tu visita"
        } else {
            color = "text-red-500";
            background = "bg-red-500/[0.97]";
            message = "¡ Importante ! \n ";
            info = "Tu suscripción vence hoy"
        }
    } else if (diasRestantes < 0) {
        color = "text-red-500";
        background = "bg-red-500/[0.97]";
        message = "¡ Importante ! \n ";
        info = "Tu suscripción venció hace " + Math.abs(diasRestantes) + " días"
    } else if (diasRestantes === null) {
        color = "text-gray-500";
        background = "bg-gray-500/[0.97]";
        info = "No hay historial de suscripciones"
    }
    return { color, background, info , message};
}