import { useState, useEffect } from "react";
import Error from "./Error";
import Swal from "sweetalert2"



function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    //Se corrobora si el objeto esta vacio, y si no esta se completa el formulario para editarlo
    useEffect(() => {
        if (Object.keys(paciente).length > 0) { 
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setTelefono(paciente.telefono)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente]);
    
    
    const generatorId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const cargadoOK = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Agregado correctamente'
          })
    }

    const resetForm = () => {
        setNombre('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha('')
        setSintomas('')
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        //Si el formulario esta vacio muestra el error y retorna
        if([nombre, propietario, email, telefono, fecha, sintomas].includes('')) {
            setError(true)
            return
        }

        setError(false)

        //Creo el objeto de paciente para tomar los valores nuevos y luego agregarselo al objeto pacientes
        const objPacientes = {
            nombre, 
            propietario,
            email, 
            telefono, 
            fecha, 
            sintomas,
            id:generatorId()
        }
        
        if (paciente.id){
            objPacientes.id = paciente.id
            const pacienteAct = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objPacientes : pacienteState)
            setPacientes(pacienteAct)
           
            //Se limpia de memoria el paciente
            setPaciente({})
        }else{
            objPacientes.id = generatorId()
             //Se toma una copia de pacientes y luego se le asigna el nuevo objeto, para no mutar el arreglo original 
            setPacientes([...pacientes, objPacientes])
        }
       
        
        //Reinicio el formulario
        resetForm()
        //popup de "cargado correctamente"
        cargadoOK()
    }


    
    

    
    
    
    
    return (  
        <div className="md:w-1/2 lg:w-2/5 ">
                <h1 className="text-2xl font-black text-center">Seguimiento de pacientes</h1>
                <p className="font-medium tracking-wider mt-3 ">Añade un nuevo <span className="text-green-800">Paciente</span></p>

            <form onSubmit={handleSubmit} className="bg-white mt-3 rounded-md shadow-md p-5">
                                        {/*children*/}
            {error && <Error><p className="font-bold">Todos los campos son obligatorios</p></Error>}

            <div>
                <label htmlFor="mascota" className="block mb-3 font-bold uppercase text-sm">Nombre mascota</label>
                <input id="mascota"
                    type="text" 
                    placeholder="Nombre de la mascota" 
                    className="w-full px-3 py-4 border-2"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}/>
                    
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="propietario" className="block mb-3 font-bold uppercase text-sm">nombre Propietario</label>
                <input id="propierario"
                    type="text" 
                    placeholder="Nombre del propietario" 
                    className="w-full px-3 py-4 border-2"
                    value={propietario}
                    onChange={(e)=>setPropietario(e.target.value)}/>
                    
            </div>

            <div>
                <label htmlFor="email" className="block mb-3 font-bold uppercase text-sm">Correo electrónico</label>
                <input id="email"
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full px-3 py-4 border-2"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                    
            </div>

            <div className="mb-3 mt-3">
                <label htmlFor="telefono" className="block mb-3 font-bold uppercase text-sm">teléfono</label>
                <input id="telefono"
                    type="tel" 
                    placeholder="Teléfono" 
                    className="w-full px-3 py-4 border-2"
                    value={telefono}
                    onChange={(e)=>setTelefono(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="alta" className="block mb-3 font-bold uppercase text-sm">Fecha de alta</label>
                <input id="alta"
                    type="date" 
                    className="w-full px-3 py-4 border-2 mb-3"
                    value={fecha}
                    onChange={(e)=>setFecha(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="sintomas" className="block mb-3 font-bold uppercase text-sm">Síntomas</label>
                <textarea name="" id="sintomas" cols="30" rows="5" 
                    placeholder="Describa los sintomas" 
                    className="w-full px-3 py-4 border-2"
                    value={sintomas}
                    onChange={(e)=>setSintomas(e.target.value)}/>
            </div>

            <input type="submit" className="w-full p-5 bg-green-800 rounded-lg mt-3 uppercase font-bold text-white text-sm hover:bg-green-600 cursor-pointer duration-500 ease-in-out" 
                   value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}/>

            </form>
        </div>
    )
}

export default Formulario;