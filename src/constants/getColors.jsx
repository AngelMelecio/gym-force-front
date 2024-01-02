export function getColor(diasRestantes) {
    let color;
    let background;
    let info=`${diasRestantes} días restantes`
    if (diasRestantes > 10) {
        color = "text-green-500";
        background = "bg-green-500/[0.92]";
        info = "Vigente, " + diasRestantes + " días restantes"
    } else if (diasRestantes >= 6 && diasRestantes <= 10) {
        color = "text-yellow-400";
        background = "bg-yellow-400/[0.92]";
        info = "Por vencer, " + diasRestantes + " días restantes"
    } else if (diasRestantes >= 2 && diasRestantes <= 5) {
        color = "text-orange-400";
        background = "bg-orange-400/[0.92]";
        info = "Por vencer, " + diasRestantes + " días restantes"
    } else if (diasRestantes === 1) {
        color = "text-orange-500";
        background = "bg-orange-500/[0.92]";
        info = "Vence Mañana"
    } else if (diasRestantes === 0) {
        color = "text-orange-500";
        background = "bg-orange-500/[0.92]";
        info = "Vence hoy"
    } else if (diasRestantes < 0) {
        color = "text-red-500";
        background = "bg-red-500/[0.92]";
        info = "Vencido hace " + Math.abs(diasRestantes) + " días"
    } else if (diasRestantes === null) {
        color = "text-gray-500";
        background = "bg-gray-500/[0.92]";
        info = "No hay historial de suscripciones"
    }
    return { color, background, info };
}