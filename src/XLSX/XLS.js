import ExcelJS from 'exceljs/dist/es5/exceljs.browser.js'
import { saveAs } from 'file-saver'
import { lastCols, selectedColumns2Columns } from './constants'
import sinFoto from "../Assets/sin_foto.png";

const headerFont = { name: 'Arial', size: 10, color: { argb: '000' }, bold: true }
const fuenteCabaceraTabla = {
    name: 'Arial',
    family: 1,
    size: 12,
    bold: true,
    color: { argb: 'FFFFFF' },
}

const titulosTabla = {

    fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '333333' },
        bgColor: { argb: '333333' }
    }
}

function createHeader(worksheet, workbook, logoINE, logoSistema, columnaParaLogoSistema, headerData, fechaConsulta, nombreReporte) {
    const logo = workbook.addImage({
        base64: logoINE,
        extension: 'png',
    });
    const logoRight = workbook.addImage({
        base64: logoSistema,
        extension: 'png',
    });

    let col = String.fromCharCode(64 + columnaParaLogoSistema); // where n is 0, 1, 2 ...
    let range = col + '1:' + col + '3'
    worksheet.mergeCells('A1:A4');
    worksheet.mergeCells('B2:C2');
    worksheet.mergeCells('C4:D4');
    worksheet.mergeCells('C3:E3');
    worksheet.mergeCells(range.replace('3','4'));
    worksheet.addImage(logo, 'A1:A3');
    worksheet.addImage(logoRight, range);

    ['B1', 'B2', 'B3', 'B4'].forEach((key, index) => {
        worksheet.getCell(key).font = headerFont
        worksheet.getCell(key).value = headerData[index]

    });
    worksheet.getCell('C3').font = headerFont
    worksheet.getCell('C3').value = nombreReporte
    worksheet.getCell('C4').font = headerFont
    worksheet.getCell('C4').value = fechaConsulta.fechaCadena + ' ' + fechaConsulta.hora

}
function appendContentByKeys(worksheet, registers) {
    const style = {
        name: 'Arial',
        family: 1,
        size: 10,
    };
    registers.forEach(register => {
        // Object.keys(register).forEach(function(key,index) {
        //     register[index] = register[index].replaceAll('\;','\n').replaceAll(',','\n')
        //     // key: the name of the object key
        //     // index: the ordinal position of the key within the object
        // });
        //register.forEach(item=>item?item.replaceAll('\;','\n').replaceAll(',','\n'):'');
        addStyledRow(style, register, worksheet)
    });
}
function appendImages(workbook, worksheet, registers, columnsWithImages, logoINE, selectedColumns) {
    let arraysImages = []
    let ubicacion = []
    columnsWithImages.forEach(column => {
        let array = []
        registers.forEach(register => {
            array.push(register[column] !== "" ? register[column] : sinFoto)
        })

        let index = selectedColumns.indexOf(column)
        ubicacion.push(index)
        arraysImages.push(array)
    })

    const filaDondoComienzaContenido = 6
    const columnaInicioContenido = 0
    arraysImages.forEach(function (images, i) {
        let columnaParaImagen = 0
        images.forEach(function (image, j) {
            const imageId1 = workbook.addImage({
                base64: image,
                extension: 'png',
            });
            columnaParaImagen = String.fromCharCode(65+columnaInicioContenido + ubicacion[i])

            worksheet.addImage(imageId1, columnaParaImagen + (filaDondoComienzaContenido + j) + ':' + columnaParaImagen + (filaDondoComienzaContenido + j));
            //TODO cambiar la altura del as columnas en esta sección
            const row = worksheet.getRow((filaDondoComienzaContenido + j))
            row.height = 40;
            row.text = ''

        });
    })
}

function addStyledRow(style, register, worksheet) {
    let registerFixed = { ...register }
    if (registerFixed.imagenb64) {
        registerFixed.imagenb64 = ''
    }
    if (registerFixed.imagenb642) {
        registerFixed.imagenb642 = ''
    }
    let row = worksheet.addRow(registerFixed)
    row.font = style
}


export async function saveAsExcel(sheetName, logoINE, registros, selectedColumns, headerNames, logoSistema, headerData, anchuraColumnas, columnasConImagen, fechaConsulta, nombreReporte, checkAgregaEstado) {
    const wb = new ExcelJS.Workbook()
    wb.creator = 'Sistema de Sesiones 1.0';
    wb.lastModifiedBy = 'Sistema de reportes';
    wb.created = new Date(fechaConsulta.anio, fechaConsulta.mes, fechaConsulta.dia);
    wb.modified = new Date();
    wb.lastPrinted = new Date(fechaConsulta.anio, fechaConsulta.mes, fechaConsulta.dia);

    const ws = wb.addWorksheet(sheetName, {
        pageSetup: {
            orientation: 'landscape',
            horizontalCentered: true
        }
    });

    const styleObj = {
        font: { name: 'Arial Black', size: '10', bold: true, alignment : { wrapText: true } },
    }

    let styledColumns = (selectedColumns2Columns(selectedColumns, anchuraColumnas)).concat(lastCols)

    ws.columns = styledColumns.map(v => ({ ...v, style: styleObj }))

    createHeader(ws, wb, logoINE, logoSistema, selectedColumns.length, headerData, fechaConsulta, nombreReporte)
    //addStyledRow(styleTableHeader, emptyRow, ws)

    //crea cabecera de la tabla
    addStyledRow(titulosTabla, headerNames, ws)
    appendContentByKeys(ws, registros)
    //Para pintar cabecera de tabla
    Array.from({ length: styledColumns.length-1 }, (v, k) => String.fromCharCode(64 + k + 1) + 5).forEach(key => {
        ws.getCell(key).style = titulosTabla
        ws.getCell(key).font = fuenteCabaceraTabla;
    });
    //Permite la decodificación de salto de línea \n
    Array.from({ length: registros.length }, (v, k) =>  k + 5).forEach(row => {
        Array.from({ length: styledColumns.length-1 }, (v, k) => String.fromCharCode(64 + k + 1) + row).forEach(key => {
            ws.getCell(key).alignment = { wrapText: true };
        });
    });
    ws.properties.defaultRowHeight = 15
    ws.properties.defaultColWidth = 25

    // appendContent(ws, headerNames, registros, selectedColumns)
    if (columnasConImagen !== undefined) {
        if (columnasConImagen.length > 0) {
            appendImages(wb, ws, registros, columnasConImagen, logoINE, selectedColumns)
        }
    }
    const buf = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buf]), nombreReporte + '.xlsx')
}

