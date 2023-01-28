
import Paciente from "./Paciente";



function ListadoPacientes({pacientes, setPaciente, eliminarPaciente}) {
    
    
    
    return ( 
        
        <div className="mt-5 sm:mt-0 md:w-3/5 md:ml-6 lg:w-3/5 lg:ml-6">
            {/*Condicion ternaria donde corroboro si hay pacientes o no, para determinar un mensaje*/}
            
            
            { (pacientes && pacientes.length) ? (
                <>

                <h2 className="font-black text-center text-2xl">Listado de pacientes</h2>
                <p className="tracking-wider mt-3 font-medium">Administra tus <span className="text-green-800">Pacientes</span></p>

                <div className="md:h-screen w-full md:overflow-y-scroll div-scroll">
                
                    {pacientes.map((paciente, id) => {
                        return (
                            <Paciente
                                key={id}
                                paciente={paciente}
                                setPaciente={setPaciente}
                                eliminarPaciente={eliminarPaciente}/>
                                
                                
                        )
                    })}

                </div>

                </>) 

                :(

                    <> 
                        <h2 className="font-black text-center text-2xl">Sin pacientes</h2>
                        <p className="tracking-wider mt-3 font-medium text-center">Agrega un paciente para <span className="text-green-800">Administrarlo</span></p>
                    </>
                    )
            } 
         
        </div>
        

    )
}

export default ListadoPacientes;