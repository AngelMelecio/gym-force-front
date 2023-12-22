export function getColor(diasRestantes) {
    let color;
    let background;
    let info=`${diasRestantes} días restantes`
    if (diasRestantes > 10) {
        color = "text-green-500";
        background = "bg-green-500";
    } else if (diasRestantes >= 6 && diasRestantes <= 10) {
        color = "text-yellow-400";
        background = "bg-yellow-400";
    } else if (diasRestantes >= 2 && diasRestantes <= 5) {
        color = "text-orange-400";
        background = "bg-orange-400";
    } else if (diasRestantes === 1) {
        color = "text-orange-500";
        background = "bg-orange-500";
        info = "Vence Mañana"
    } else if (diasRestantes === 0) {
        color = "text-orange-500";
        background = "bg-orange-500";
        info = "Vence hoy"
    } else if (diasRestantes === null) {
        color = "text-gray-500";
        background = "bg-gray-500";
        info = "Sin fecha de vencimiento"
    }
    return { color, background, info };
}