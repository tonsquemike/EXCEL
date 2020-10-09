import moment from "moment";
import 'moment/locale/es'

export const initCols = [
    { header: '', key: 'logo', width: 32 },
    //{ header: '', key: 'someSpace', width: 8 },
]
export const lastCols = [
    //{ header: '', key: 'someSpace', width: 8 },
    { header: '', key: 'logoRight', width: 32 },
]
export const getFecha = () => {
    var check = moment(moment(), 'YYYY/MM/DD');

    var month = check.format('M');
    var day = check.format('D');
    var year = check.format('YYYY');
    var hora = moment().format("HH:mm:ss")
    let fecha = day + '/' + month + '/' + year + ' ' + hora

    return fecha
}


export const headerNames = {
    'idDistrito': 'Distrito',
    'nombreAsociacion': 'Partido',
    'siglas': 'Siglas',
    'perdidaAcreditacion': 'Perdida Acreditacion',
    'fechaResolucion': 'Fecha de resolucion',
    'direccion': 'Domicilio',
    'telefono': 'Teléfono(s)',
    'correoNotificaciones': 'Correo electrónico'
}
export const emptyRow = {
    'idDistrito': '',
    'nombreAsociacion': '',
    'siglas': '',
    'perdidaAcreditacion': '',
    'fechaResolucion': '',
    'direccion': '',
    'telefono': '',
    'correoNotificaciones': ''
}

export function addStyleToColumns(selectedColumns, styleObj) {
    return selectedColumns.map(v => ({ ...v, isActive: true }))

}
export const selectedColumns2Columns = (selectedColumns, columnsArray) => {
    let result = []
    console.log(selectedColumns)
    console.log(columnsArray)
    selectedColumns.forEach(element => {
        console.log(element)
        // console.log(columnsArray[element])
        result.push(findObj(element, columnsArray))
    });
    // console.log('result')
    console.log(result)
    // result.reduce((unique, item) => {
    //     return unique.includes(item) ? unique : [...unique, item]
    // })
    // console.log(result)

    return result
}

function findObj(key, array) {
    return array.filter(function (element) {
        return element.key === key
    })[0];
}

var getNumNodesAtLevel = (function() {
    var getNumNodesAtLevel = function(node, curr, desired) {
        if (curr === (desired - 1))
            return node.children.length;

        var count = 0;
        node.children.forEach(function(child) {
            count += getNumNodesAtLevel(child, curr + 1, desired);
        });
        return count;
    };

    return function(root, desired) {

        if (desired === 0)
            return 1;

        var count = getNumNodesAtLevel(root, 0, desired);
        if (count === 0)
            return null; // you could throw an error here

        return count;

    };

}());