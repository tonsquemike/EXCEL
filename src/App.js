import React from 'react';
import logo from './logo.svg';
import './App.css';
import { saveAsExcel } from './XLSX/XLS'
import logoINE from "./Assets/Rep_INELogo.png";
import logoSistema from './Assets/Juntas_01.png'
import {columnasSeleccionadas, anchuraXLS, headerNames, tableColumns} from './RepCuaderno'
//import {columnasSeleccionadas, anchuraXLS, headerNames, tableColumns} from './RepConcSesionesCons'
function App() {
  let nombreReporte = 'TEST OLIVER'
  let headerData = [
    'INE',
    'EDOMEX - TOLUCA',
    'Reporte ',
    'Fecha reporte ',
  ]

  saveAsExcel('TEST REPORTE', logoINE, [],
      columnasSeleccionadas, headerNames, logoSistema, headerData,
      anchuraXLS, undefined,
      undefined, nombreReporte, false, tableColumns)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
