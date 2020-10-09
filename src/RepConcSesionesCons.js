import React from "react"
import { Avatar, Row, Col } from 'antd';
import sinFoto from "./Assets/sin_foto.png";

export const columnasValidas = [
    'estado',
    'distrito',
    'cargo',
    'nombre',
    'imagenb64',
    'lugarFechaNacimiento',
    'gradoAcademico',
    'fechaIngreso',
    'fechaNombramiento',
    'fechaTitularidad',
    'fechaInicio',
    'fechaFin',
    'puesto',
    'organo'
]
export const columnasSeleccionadas = [
    'distrito',
    'cargo',
    'nombre',
    'imagenb64',
    'lugarFechaNacimiento',
    'gradoAcademico',
    'fechaIngreso',
    'fechaNombramiento',
    'fechaTitularidad',
    'fechaInicio',
    'fechaFin',
    'puesto',
    'organo'
]

export const headerNames = {
    'estado': 'Estado',
    'distrito': 'Junta Ejecutiva',
    'cargo': 'Cargo',
    'nombre': 'Nombre',
    'imagenb64': 'Fotografía',
    'lugarFechaNacimiento': 'Lugar y fecha de nacimiento',
    'gradoAcademico': 'Grado académico',
    'fechaIngreso': 'Fecha de ingreso al IFE/INE',
    'fechaNombramiento': 'Fecha de nombramiento cargo actual',
    'fechaTitularidad': 'Fecha de titularidad',
    'fechaInicio': 'Fecha inicio',
    'fechaFin': 'Fecha final',
    'puesto': 'Puesto',
    'organo': 'Órgano'
}

export const anchuraXLS = [
    { header: '', key: 'estado', width: 32 },
    { header: '', key: 'distrito', width: 32 },
    { header: '', key: 'cargo', width: 15 },
    { header: '', key: 'nombre', width: 30 },
    { header: '', key: 'imagenb64', width: 10 },
    { header: '', key: 'lugarFechaNacimiento', width: 45 },
    { header: '', key: 'gradoAcademico', width: 25 },
    { header: '', key: 'fechaIngreso', width: 35 },
    { header: '', key: 'fechaNombramiento', width: 35 },
    { header: '', key: 'fechaTitularidad', width: 25 },
    { header: '', key: 'fechaInicio', width: 15 },
    { header: '', key: 'fechaFin', width: 15 },
    { header: '', key: 'puesto', width: 25 },
    { header: '', key: 'organo', width: 35 },
]
export const checkboxes = []

export const labels = [
    'VE Vocal Ejecutiva/o',
    'VRFE Vocal de Registro Federal de Electores',
    'VS Vocal Secretaria/o',
    'VCEyEC Vocal de Capacitación Electoral y Educación Cívica',
    'VOE Vocal de Organización Electoral'

]
export const etiquetas = () => {
    return (
        <div>
            <Row>
                <Col span={12}>'VE Vocal Ejecutiva/o'</Col>
                <Col span={12}>'VRFE Vocal de Registro Federal de Electores'</Col>
            </Row >
            <Row>
                <Col span={12}>'VS Vocal Secretaria/o</Col>
                <Col span={12}>'VCEyEC Vocal de Capacitación Electoral y Educación Cívica'</Col>
            </Row >
            <Row>
                <Col span={12}>'VOE Vocal de Organización Electoral'</Col>
            </Row >
        </div>
    )
}
export const columnasFijas = [

]

export const tableColumns = [
    {
        title: 'Junta Ejecutiva',
        dataIndex: 'distrito',
        fixed: 'left'
    },
    {
        title: 'Vocalía',
        dataIndex: 'cargo',
        fixed: 'left',
        // filters: [
        //     { text: "VE", value: "VE" },
        //     { text: "VRFE", value: "VRFE" },
        //     { text: "VS", value: "VS" },
        //     { text: "VCEyEC", value: "VCEyEC" },
        //     { text: "VOE", value: "VOE" },
        // ],
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        fixed: 'left'
    },
    {
        title: 'Fotografía',
        dataIndex: 'imagenb64',
        render: theImageURL =>
            <Avatar shape="square" size={94} src={theImageURL !== '' ? theImageURL : sinFoto} />
    },
    {
        title: 'Lugar y fecha de nacimiento',
        dataIndex: 'lugarFechaNacimiento',
    },
    {
        title: 'Grado académico',
        dataIndex: 'gradoAcademico',
    },
    {
        title: 'Fecha de ingreso al IFE/INE',
        dataIndex: 'fechaIngreso',
    },
    {
        title: 'Fecha de nombramiento',
        dataIndex: 'fechaNombramiento',
    },
    {
        title: 'Experiencia profesional',
        children: [
            {
                title: 'Fecha titularidad',
                dataIndex: 'fechaTitularidad',
            },
            {
                title: 'Fecha inicio',
                dataIndex: 'fechaInicio',
            },
            {
                title: 'Fecha final',
                dataIndex: 'fechaFin',
            },
            {
                title: 'Puesto',
                dataIndex: 'puesto',
            },
            {
                title: 'Órgano',
                dataIndex: 'organo',
            },
        ]
    },
]
export const reetiquetaRegistros = (registros) => {
    let registrosEditar = [...registros]

    registrosEditar.forEach(registro => {
        if (registro.puesto) {
            registro['puesto'] = registro.puesto.replaceAll(',','\n')
        }
        if (registro.organo) {
            registro['organo'] = registro.organo.replaceAll(',','\n')
        }
        if (registro.fechaInicio) {
            registro['fechaInicio'] = registro.fechaInicio.replaceAll(',',' ').replaceAll('-','/')
        }
        if (registro.fechaFin) {
            registro['fechaFin'] = registro.fechaFin.replaceAll(',',' ').replaceAll('-','/')
        }
        if (registro.lugarFechaNacimiento) {
            registro['lugarFechaNacimiento'] = registro.lugarFechaNacimiento.replaceAll(';','\r\n').replaceAll('\;','\r\n').replaceAll('-','/')
        }
    })
    return registrosEditar
}

