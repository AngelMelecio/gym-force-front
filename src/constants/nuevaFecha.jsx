export function nuevaFecha(dateString){
    let year = dateString.slice(0, 4)
    let month = dateString.slice(5, 7)
    let day = dateString.slice(8, 10)

    return new Date(year, month - 1, day)
}