import React, { useEffect, useState } from "react";
import RobotoRegular from '../../../fonts/Roboto-Regular.ttf'
import RobotoBold from '../../../fonts/Roboto-Bold.ttf'
import RobotoCondensedItalic from '../../../fonts/RobotoCondensed-Italic.ttf'
import { Document, PDFViewer, Page, Text, View, Font, Svg, Path, StyleSheet } from "@react-pdf/renderer";
import { MyIcons } from '../../../constants/Icons';
import { nuevaFecha } from '../../../constants/nuevaFecha'

const LogoGymForceSvg = () => (
    <Svg width="84.5" height="40.5" viewBox="0 0 169 81" style={{}}>
        <Path fill="#1C49BD" d="M0 22.665c0-4.085.583-7.535 1.75-10.35C2.934 9.5 4.615 7.193 6.792 5.395c2.08-1.72 4.518-3.05 7.317-3.988C16.91.47 20.125 0 23.76 0c2.507 0 4.732.108 6.676.323 1.943.215 3.673.498 5.189.85 1.535.352 2.896.752 4.081 1.202 1.205.45 2.323.919 3.353 1.407v13.4h-8.775c-.991-1.407-2.1-2.443-3.323-3.108-1.205-.665-2.45-.997-3.732-.997a8.173 8.173 0 00-3.178.645A8.262 8.262 0 0021.34 15.6c-.797.82-1.438 1.828-1.924 3.02-.486 1.173-.729 2.521-.729 4.046 0 3.382.758 5.855 2.274 7.419 1.535 1.563 3.712 2.345 6.53 2.345.7 0 1.4-.039 2.1-.117.718-.078 1.438-.196 2.157-.352v-3.548H26.15v-8.034h18.133v21.405a73.921 73.921 0 01-4.897 1.847 70.293 70.293 0 01-5.16 1.495c-1.71.41-3.392.694-5.044.85a43.423 43.423 0 01-4.577.264c-2.293 0-4.49-.166-6.588-.498a21.721 21.721 0 01-5.89-1.789 22.089 22.089 0 01-4.955-3.225 19.582 19.582 0 01-3.849-4.603c-1.05-1.78-1.865-3.783-2.448-6.011C.292 27.865 0 25.383 0 22.665zM60.143 45.712V33.045l3.731-.938-12.798-18.003-4.723-.704V.674H71.25V13.4l-2.915.704 5.918 9.206 5.918-9.206-2.916-.704V.674h24.868V13.4l-4.694.704-12.798 18.003 3.732.938v12.667h-28.22zM127.923 23.75v21.962h-22.36V32.986l3.732-.733v-18.12l-3.732-.733V.674h22.36l9.388 17.3 9.299-17.3H169V13.4l-3.732.733v18.12l3.732.733v12.726h-22.39V23.75l-9.299 16.185-9.388-16.185z"></Path>
        <Path fill="#CF711A" d="M48.056 52.655c.735-1.478 1.47-2.938 2.204-4.38.734-1.478 1.4-2.85 1.994-4.117a103.806 103.806 0 001.522-3.378c.42-1.02.664-1.83.734-2.428.07-.633.018-1.179-.157-1.636a2.297 2.297 0 00-.892-1.108c-.385-.282-.857-.493-1.417-.634a6.732 6.732 0 00-1.784-.316c-1.155-.07-2.536-.036-4.146.105a27.469 27.469 0 00-4.565.686c-1.47.317-2.746.774-3.83 1.373-1.05.598-1.61 1.336-1.68 2.216-.035.493.052.933.262 1.32.175.316.49.615.945.897.49.281 1.207.387 2.151.316.175 0 .385-.017.63-.052.21-.035.472-.07.787-.106.315-.07.682-.158 1.102-.264l-2.571 3.484c-.49.703-1.015 1.126-1.574 1.266-.56.141-1.067.176-1.522.106-.245-.035-.735-.159-1.47-.37a10.32 10.32 0 01-2.15-.95 6.433 6.433 0 01-1.838-1.689c-.524-.738-.734-1.653-.63-2.744.14-1.267.683-2.428 1.627-3.483.945-1.091 2.257-2.023 3.936-2.797 1.714-.775 3.743-1.373 6.087-1.795 2.38-.422 5.055-.633 8.029-.633 2.239 0 4.023.246 5.352.739 1.33.457 2.292 1.073 2.887 1.847.63.739.927 1.618.892 2.639 0 .985-.21 2.005-.63 3.06-.21.493-.525 1.18-.944 2.06a157.88 157.88 0 01-1.417 3.008 134.41 134.41 0 00-1.785 3.747c-.63 1.372-1.259 2.797-1.889 4.275.945.07 1.802.158 2.572.264.804.105 1.434.193 1.889.264.524.14.7.369.524.686-.314.633-.63 1.108-.944 1.425-.28.316-.595.545-.945.686-.35.105-.734.158-1.154.158-.42-.035-.892-.07-1.417-.105h-.945c-.314-.036-.647-.07-.997-.106a455.63 455.63 0 00-1.941 4.697 479.186 479.186 0 00-1.68 4.434c-.49 1.372-.926 2.638-1.311 3.8-.385 1.16-.647 2.128-.787 2.902a38.817 38.817 0 00-.473 3.062c-.07.809-.105 1.653-.105 2.533 0 .88.14 1.583.42 2.111-.734.211-1.382.387-1.941.528-.525.14-.98.246-1.365.317l-1.05.263c-.979.247-1.678.212-2.098-.105-.385-.282-.49-.985-.315-2.111.07-.774.175-1.654.315-2.64.175-.95.42-2.04.734-3.272.35-1.196.788-2.533 1.312-4.01a72.306 72.306 0 012.1-5.015 144.58 144.58 0 011.678-3.483c.63-1.302 1.295-2.691 1.995-4.17-1.54 0-3.201.106-4.986.317-.98.141-1.941.3-2.886.475-.804.176-1.679.387-2.623.634-.91.21-1.767.457-2.572.739a3.733 3.733 0 01-.21-.845c0-.281.018-.545.053-.791a5.58 5.58 0 01.157-.74 3.35 3.35 0 01.315-.738c.21-.422.542-.95.997-1.584a82.527 82.527 0 014.723-.475c1.504-.105 2.834-.193 3.988-.264a74.708 74.708 0 013.83-.105c.176-.035.316-.035.42 0h.473zM74.976 62.841a18.416 18.416 0 01-1.417 3.747c-.595 1.161-1.312 2.164-2.152 3.009a8.5 8.5 0 01-2.78 1.952c-1.015.493-2.135.74-3.36.74-1.434 0-2.57-.317-3.41-.95a5.794 5.794 0 01-1.837-2.27c-.385-.915-.612-1.918-.682-3.008a32.085 32.085 0 01-.157-3.062c0-.668.087-1.407.262-2.216.14-.81.35-1.636.63-2.48.28-.845.63-1.69 1.05-2.534.454-.845.979-1.619 1.574-2.322.21-.599.524-1.126.944-1.584a5.83 5.83 0 011.522-1.108 7.148 7.148 0 011.889-.686 7.57 7.57 0 011.941-.264c.106 0 .193.017.263.053l.315.105c.454.035 1.014.211 1.679.528.7.317 1.364.792 1.994 1.425.665.633 1.225 1.443 1.68 2.428.454.95.681 2.11.681 3.483 0 .282-.017.634-.052 1.056-.035.387-.07.721-.105 1.002a26.03 26.03 0 002.519-1.16 42.886 42.886 0 002.519-1.426c.84-.527 1.609-1.055 2.309-1.583.7-.528 1.259-1.003 1.679-1.425.35-.317.647-.493.892-.528.245-.035.42.035.525.211.105.176.122.423.052.74-.07.316-.262.668-.577 1.055-.175.21-.63.633-1.365 1.267-.7.633-1.539 1.319-2.518 2.058-.98.739-2.047 1.46-3.201 2.164-1.155.703-2.257 1.231-3.306 1.583zm-8.869-8.022c-.105.316-.157.65-.157 1.003 0 .563.035 1.16.105 1.794.07.598.245 1.144.525 1.636.28.493.717.915 1.311 1.267.63.317 1.487.475 2.572.475h.525l.524-.106c.105-.457.193-.862.263-1.214.105-.387.157-.72.157-1.002.07-.669.07-1.355 0-2.059a7.573 7.573 0 00-.42-1.9c-.175-.598-.42-1.073-.734-1.425-.28-.387-.63-.58-1.05-.58-.664 0-1.312.193-1.941.58-.595.352-1.155.862-1.68 1.53zm-3.358 9.289c0 .633.035 1.266.105 1.9.07.598.21 1.143.42 1.636.21.457.49.844.84 1.161.35.281.804.422 1.364.422.63 0 1.207-.14 1.731-.422a6.413 6.413 0 001.417-1.161 8.911 8.911 0 001.102-1.636c.35-.634.647-1.284.892-1.953l-.734.105h-.735c-1.33 0-2.484-.386-3.463-1.16-.945-.81-1.68-1.83-2.204-3.062-.21.74-.385 1.46-.525 2.164-.14.704-.21 1.372-.21 2.006z"></Path>
        <Path fill="#CF711A" d="M78.597 70.969c-.245.387-.508.633-.788.739-.314.14-.577.158-.787.052-.245-.07-.402-.246-.472-.527-.07-.282 0-.634.21-1.056.105-.21.35-.686.734-1.425.35-.739.788-1.618 1.312-2.639.49-1.055 1.032-2.181 1.627-3.377l1.68-3.484c.56-1.09 1.066-2.058 1.521-2.903.455-.88.787-1.513.997-1.9a26.954 26.954 0 01-.787-.738c-.14-.176-.245-.528-.315-1.056-.07-.458.035-1.056.315-1.795a10.11 10.11 0 011.102-2.11 8.555 8.555 0 011.522-1.795c.56-.493 1.102-.739 1.627-.739.98 0 1.661.317 2.046.95.42.633.665 1.284.735 1.953.07.457.035 1.038-.105 1.741a5.084 5.084 0 01-.787 1.9c.105.07.245.159.42.264.174.07.454.106.84.106.559 0 .944-.035 1.154-.106.244-.07.612-.105 1.102-.105.594 0 1.084.158 1.469.475.385.281.7.65.944 1.108.245.422.42.897.525 1.425.14.493.228.95.263 1.372.105.88-.123 1.795-.683 2.745-.56.95-1.242 1.988-2.046 3.114-.49.703-.98 1.495-1.47 2.375-.49.88-.7 1.671-.63 2.375.07.457.193.827.368 1.108.175.282.665.422 1.47.422.594 0 1.241-.21 1.941-.633a15.35 15.35 0 002.204-1.689 34.3 34.3 0 002.256-2.27 96.083 96.083 0 002.047-2.427 35.75 35.75 0 001.574-2.164c.455-.633.787-1.09.997-1.372.175-.282.403-.475.682-.58.28-.106.525-.106.735 0 .21.105.332.316.367.633.07.316-.052.738-.367 1.266-.21.352-.577.915-1.102 1.689a34.133 34.133 0 01-1.837 2.586 50.905 50.905 0 01-2.361 2.956c-.874.985-1.802 1.9-2.781 2.744a16.43 16.43 0 01-2.886 2.006c-.945.527-1.854.791-2.729.791-.91 0-1.662-.175-2.256-.527a5.191 5.191 0 01-1.47-1.267 6.184 6.184 0 01-.787-1.689 6.205 6.205 0 01-.157-1.742c.035-.422.14-.862.315-1.319.21-.493.437-.985.682-1.478a60 60 0 01.84-1.53c.314-.528.594-1.038.839-1.531a45.799 45.799 0 001.417-2.586c.385-.739.577-1.355.577-1.847 0-.317-.07-.599-.21-.845-.14-.246-.367-.37-.682-.37-.21 0-.367.018-.472.054h-.263c-.07 0-.192.017-.367.052h-.682c-.455 0-.84-.07-1.155-.21a5.463 5.463 0 00-.892-.317c-.14.246-.455.774-.944 1.583-.49.81-1.067 1.76-1.732 2.85-.63 1.09-1.312 2.234-2.047 3.43-.7 1.197-1.364 2.323-1.994 3.378-.63 1.02-1.154 1.9-1.574 2.64a35.4 35.4 0 01-.84 1.266z"></Path>
        <Path fill="#CF711A" d="M111.341 69.438c1.085 0 2.274-.422 3.569-1.266a28.12 28.12 0 003.83-3.061 39.952 39.952 0 003.411-3.537c1.05-1.231 1.837-2.216 2.362-2.955.314-.458.612-.721.892-.792.279-.105.489-.07.629.106s.193.457.158.844c-.035.352-.193.757-.473 1.214-.244.422-.664 1.038-1.259 1.847a43.548 43.548 0 01-2.047 2.586 38.801 38.801 0 01-2.676 2.85c-.979.95-2.011 1.83-3.096 2.64a17.803 17.803 0 01-3.358 1.9c-1.155.527-2.292.791-3.411.791-1.539 0-2.834-.3-3.883-.897a7.161 7.161 0 01-2.467-2.217 9.166 9.166 0 01-1.259-3.008 15.605 15.605 0 01-.367-3.325c0-1.091.244-2.446.734-4.064a18.592 18.592 0 012.152-4.645 14.218 14.218 0 013.673-3.852c1.469-1.091 3.201-1.637 5.195-1.637 1.12 0 2.064.387 2.834 1.161.804.775 1.189 1.83 1.154 3.167 0 .634-.105 1.267-.315 1.9a6.555 6.555 0 01-.839 1.636c-.35.458-.77.827-1.26 1.109a2.83 2.83 0 01-1.521.422c-.455 0-.805-.158-1.05-.475a3.295 3.295 0 01-.42-1.161 8.3 8.3 0 010-1.32c.07-.422.14-.703.21-.844.175-.246.367-.422.577-.528l.735-.37c.21-.105.367-.263.472-.474.14-.211.21-.44.21-.686a.986.986 0 00-.21-.634c-.14-.176-.367-.264-.682-.264-.315 0-.892.264-1.732.792-.804.493-1.644 1.25-2.518 2.27-.84.985-1.592 2.234-2.257 3.747-.664 1.513-1.014 3.272-1.049 5.277-.035 1.162.122 2.112.472 2.85.35.74.787 1.32 1.312 1.742a4.8 4.8 0 001.732.897 6.803 6.803 0 001.836.264z"></Path>
        <Path fill="#CF711A" d="M145.713 60.255a42.186 42.186 0 01-3.569 4.539 34.158 34.158 0 01-4.25 3.905 22.814 22.814 0 01-4.566 2.745c-1.539.704-3.043 1.055-4.513 1.055-.769 0-1.609-.193-2.518-.58-.875-.352-1.68-.915-2.414-1.689-.735-.774-1.33-1.777-1.784-3.008-.42-1.232-.543-2.727-.368-4.486.14-1.443.578-2.956 1.312-4.54a22.047 22.047 0 012.781-4.433c1.12-1.337 2.362-2.445 3.726-3.325 1.399-.88 2.799-1.32 4.198-1.32 1.33 0 2.292.335 2.886 1.003.595.67.857 1.496.787 2.481a7.378 7.378 0 01-.944 3.009 11.475 11.475 0 01-1.784 2.48c-.7.739-1.452 1.407-2.257 2.006a57.573 57.573 0 01-2.204 1.636c-.769.528-1.504 1.038-2.204 1.53-.699.458-1.312.88-1.836 1.267.035.88.192 1.618.472 2.217.28.598.63 1.09 1.05 1.477a4.32 4.32 0 001.416.792c.56.14 1.12.211 1.68.211 1.189 0 2.431-.37 3.725-1.108a27.082 27.082 0 003.779-2.745 39.76 39.76 0 003.463-3.377 70.128 70.128 0 002.676-3.009c.245-.281.49-.44.735-.475.28-.07.49-.035.63.106.174.105.262.316.262.633 0 .282-.123.616-.367 1.003zm-13.434-8.128c-.42 0-.927.211-1.522.633-.56.423-1.119 1.038-1.679 1.848-.56.774-1.085 1.741-1.574 2.903-.49 1.125-.857 2.427-1.102 3.905.419-.317.874-.633 1.364-.95.49-.352.98-.721 1.469-1.108 1.505-1.161 2.554-2.182 3.149-3.061.595-.88.927-1.636.997-2.27.07-.668 0-1.143-.21-1.425a1.009 1.009 0 00-.892-.475z"></Path>
    </Svg>
)

const ReportToPrint = ({tittle,data,onCloseModal}) => {

    const [productos, setProductos] = useState([]);
    const [suscripciones, setSuscripciones] = useState([]);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const productosConsolidados = {};
        const suscripcionesConsolidadas = {};
        let totalGeneral = 0; 

        data.reportData.forEach((venta) => {
            venta.detallesVenta.forEach((producto) => {
                const { idProducto, nombreProducto, precioVenta, cantidad } = producto;
                const importeTotalProducto = parseFloat(precioVenta) * cantidad;

                if (productosConsolidados[idProducto]) {
                    productosConsolidados[idProducto].cantidad += cantidad;
                    productosConsolidados[idProducto].importeTotal += importeTotalProducto;
                } else {
                    productosConsolidados[idProducto] = {
                        nombreProducto,
                        precioVenta: parseFloat(precioVenta),
                        cantidad,
                        importeTotal: importeTotalProducto,
                    };
                }

                totalGeneral += importeTotalProducto;
            });

            venta.detallesSuscripcion.forEach((suscripcion) => {
                const { idSuscripcion, nombreSuscripcion, precio } = suscripcion;

                if (suscripcionesConsolidadas[idSuscripcion]) {
                    suscripcionesConsolidadas[idSuscripcion].cantidad += 1;
                    suscripcionesConsolidadas[idSuscripcion].importeTotal += precio;
                } else {
                    suscripcionesConsolidadas[idSuscripcion] = {
                        nombreSuscripcion,
                        precio,
                        cantidad: 1,
                        importeTotal: precio,
                    };
                }

                totalGeneral += precio; 
            });
        });

        const productosReporte = Object.values(productosConsolidados);
        const suscripcionesReporte = Object.values(suscripcionesConsolidadas);

        setProductos(productosReporte);
        setSuscripciones(suscripcionesReporte);
        setTotal(totalGeneral.toFixed(2));
    }, [data])


    Font.register({
        family: 'Roboto', fonts: [
            { src: RobotoBold, fontWeight: 600 },
            { src: RobotoRegular, fontWeight: 300 },
            { src: RobotoCondensedItalic, fontWeight: 300, fontStyle: 'italic' },
        ]
    });

    const styles = StyleSheet.create({
        headerTable: {
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: 9,
            textAlign: 'center'
        },
        textTable: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: 8,
        },
    });

    return (
        <>
            {console.log(data)}
            <div className='absolute z-10 flex items-center justify-center w-full h-full p-1 grayTrans'>
                <div className='w-3/4 h-full rounded-lg shadow-xl modal-box pdf-gray'  >
                    <div className='flex flex-col w-full h-full p-1'>
                        <div className="relative z-10 flex w-full h-12 px-4 py-2">
                            <div className="relative flex flex-row w-full total-center ">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onCloseModal();
                                    }}
                                    className="absolute flex items-center justify-center p-1 text-white rounded-full left-1 hover:bg-gray-500">
                                    <MyIcons.Cancel size="20px" />
                                </button>
                                <p className="text-2xl font-semibold text-white">
                                    {tittle}
                                </p>
                            </div>
                        </div>

                        <div id="modal-body" className="relative flex w-full h-full">
                            <div className='absolute flex flex-col justify-center w-full h-full bg-transparent'>
                                <div className='flex flex-row justify-center w-full text-3xl text-center text-white font-extralight'>
                                    Generando ticket...
                                </div>

                            </div>
                            <PDFViewer className="z-10 w-full h-full" >
                                <Document >
                                    <Page size={[201, 595]}>
                                        <View style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', paddingTop: 2 }}>

                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                <LogoGymForceSvg />
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '100%' }}>
                                                <Text style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: 9, marginBottom: 3 }}>{"Av. América #795, Moroleón, Gto."}</Text>
                                                <Text style={{ fontFamily: 'Roboto', fontWeight: 600, fontSize: 9, }}>{'Reporte de venta del ' + (nuevaFecha(data.frmData.fechaInicio)).toLocaleDateString('es-ES') + ' al ' +(nuevaFecha(data.frmData.fechaFin)).toLocaleDateString('es-ES')}</Text>
                                                <Text style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: 8, marginVertical: 4 }}>
                                                    {'A continuación se muestra el total de productos y suscripciones vendidas en el periodo seleccionado.'}
                                                </Text>
                                            </View>

                                            <View style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', marginTop: 2 }}>

                                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', borderTop: 1, borderBottom: 1 }}>
                                                    <Text style={[styles.headerTable, { width: '10%' }]}>Cant.</Text>
                                                    <Text style={[styles.headerTable, { width: '50%' }]}>Descripción</Text>
                                                    <Text style={[styles.headerTable, { width: '20%', textAlign: 'right' }]}>P. Unit.</Text>
                                                    <Text style={[styles.headerTable, { width: '20%', textAlign: 'right' }]}>Importe</Text>
                                                </View>

                                                {suscripciones?.map((dtll, i) => (
                                                    <View key={`DTLL_S_${i}`} style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 2 }}>
                                                        <Text style={[styles.textTable, { width: '10%', textAlign: 'center' }]}>{dtll.cantidad}</Text>
                                                        <Text style={[styles.textTable, { width: '50%', textAlign: 'left' }]}>{dtll.nombreSuscripcion}</Text>
                                                        <Text style={[styles.textTable, { width: '20%', textAlign: 'right' }]}>${(Number(dtll.precio)).toFixed(2)}</Text>
                                                        <Text style={[styles.textTable, { width: '20%', textAlign: 'right' }]}>${(Number(dtll.precio)).toFixed(2)}</Text>
                                                    </View>
                                                ))}

                                                {productos?.map((dtll, i) => (
                                                    <View key={`DTLL_${i}`} style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 2 }}>
                                                        <Text style={[styles.textTable, { width: '10%', textAlign: 'center' }]}>{dtll.cantidad}</Text>
                                                        <Text style={[styles.textTable, { width: '50%', textAlign: 'left' }]}>{dtll.nombreProducto}</Text>
                                                        <Text style={[styles.textTable, { width: '20%', textAlign: 'right' }]}>${(Number(dtll.precioVenta)).toFixed(2)}</Text>
                                                        <Text style={[styles.textTable, { width: '20%', textAlign: 'right' }]}>${(Number(dtll.cantidad) * Number(dtll.precioVenta)).toFixed(2)}</Text>
                                                    </View>
                                                ))}

                                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, justifyContent: 'center' }}>
                                                    <Text style={{ fontFamily: 'Roboto', fontWeight: 600, fontSize: 10 }}>Total: </Text>
                                                    <Text style={{ fontFamily: 'Roboto', fontWeight: 600, fontSize: 10 }}>${total}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </Page>
                                </Document>
                            </PDFViewer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReportToPrint;