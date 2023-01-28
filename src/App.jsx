import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"




function App() {
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});
 
  //Creo la funcion para eliminar paciente y se la paso por props al comp ListadoPacientes
  const eliminarPaciente = (id)=>{
    const pacienteEliminado = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacienteEliminado)
  }

  //Almaceno los pacientes en localStorage
  useEffect(() => {
    
      localStorage.setItem('pacientes', JSON.stringify(pacientes))
    
   
  }, [pacientes]);

  return (
    <div className="container mx-auto p-5">
        <Header/>

        <div className="md:flex mt-12 mx-auto">
          <Formulario 
              pacientes={pacientes}
              setPacientes={setPacientes}
              paciente={paciente}
              //Se pasa este prop para actualizarlo 
              setPaciente={setPaciente}/>
              
              

          <ListadoPacientes
              pacientes={pacientes}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}/>
              
              
        </div>

        <Footer/>
       
    </div>
  )
}

export default App
