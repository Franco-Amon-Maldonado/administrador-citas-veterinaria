import Swal from "sweetalert2"

function Paciente({paciente,setPaciente,eliminarPaciente}) {
    //Aplico distroyorin al objeto 
    const {nombre, propietario, email, telefono, fecha, sintomas,id} = paciente

    const handleEliminar = () => {
        Swal.fire({
          title: `Esta seguro que desea eliminar al paciente "${nombre}" del propietario "${propietario}"?`,
          text: "Una vez eliminado, no podrás recuperarlo.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          allowOutsideClick: false
        }).then((result) => {

          if (result.value) {
            eliminarPaciente(id)
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
                icon: 'error',
                title: 'Paciente eliminado'
              })
          }
        })
    }

    
        
    
    

    return ( 
    
        <div className="mt-3 bg-white shadow-md rounded-md p-5">
    
        <p className="font-bold mb-3 uppercase">Nombre mascota: <span className="text-gray-600 font-medium normal-case">{nombre}</span></p>
   
        <p className="font-bold mb-3 uppercase">Nombre propietario: <span className="text-gray-600 font-medium normal-case">{propietario}</span></p>

        <p className="font-bold mb-3 uppercase">E-Mail: <span className="text-gray-600 font-medium normal-case">{email}</span></p>

        <p className="font-bold mb-3 uppercase">Teléfono: <span className="text-gray-600 font-medium normal-case">{telefono}</span></p>
    
        <p className="font-bold mb-3 uppercase">Fecha alta: <span className="text-gray-600 font-medium normal-case">{fecha}</span></p>
    
        <p className="font-bold mb-3 uppercase">Síntomas: <span className="text-gray-600 font-medium normal-case">{sintomas}</span></p>
        
        <div className="flex justify-between mt-8">
            <button onClick={() => setPaciente(paciente)} 
                    type="button" 
                    className="py-3 px-7 bg-green-800 uppercase text-white font-bold hover:bg-green-600 duration-500 ease-in-out rounded-md"
                             >Editar</button>
            
            <button 
                    type="button" 
                    className="py-3 px-7 bg-red-700 uppercase text-white font-bold hover:bg-red-600 duration-500 ease-in-out rounded-md"
                    onClick={handleEliminar}>Eliminar</button>
        </div>
        
    </div>
     );
}

export default Paciente;