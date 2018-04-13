new Vue({
  el:'#app',
  data:{
    areas:[],         // arreglo de areas
    area_id:'',       // id del area para agregar
    area_nombre:'',   // nombre del area para agregar
    oldArea:{},       // area a ser actualizada
    showModal:false,   // boleano para mostrar el modal, para actualizar un área
    oldId:''          // variable que guarda el antiguo Id al realizar una actualización
  },
  // mounted, es una función que se ejecuta cuándo se carga la vista (area.html)
  mounted(){
    // ejecutamos la función/método getAreas.
    this.getAreas();
  },
  methods:{
    // la función get Areas realiza una petición get para obtener las áreas.
    getAreas(){
      // enviamos la petición por la URL con fecth
      fetch('ajax.php?mode=getAreas')
      // las respuesta que obtenemos la pasamos a un json
      .then(res=>res.json())
      // asignamos el valor abtenido a nuestro arreglo areas
      .then(res=>{this.areas=res})
    },
    // la función/método addArea agrega una area meditante una petición post.
    addArea(){
      // verificamos que los datos no estén vacíos
      if(this.area_id && this.area_nombre){
        // creamos la cadena con las variables para enviar por petición post
        form = 'id='+this.area_id+'&name='+this.area_nombre;
        // con el api fetch enviamos a la url, luego colamos un objeto
        fetch('ajax.php?mode=addArea',{
          // define el método que usamos
          method:'post',
          // define la cabecera, como enviamos la información
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          // la información viaja en el cuerpo (body)
          body:form
        })
        .then(res=>res.json())
        .then(res=>{
          if(res==0){
            swal(
              'Error',                              //titulo de la alerta
              'Los datos deben estar completos!',   //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==1){
            swal(
              'Error',                              //titulo de la alerta
              'El ID debe ser un número!',          //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==2){
            swal(
              'Error',                              //titulo de la alerta
              'El nombre no puede ser un número!',  //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==3){
            swal(
              'Error',                              //titulo de la alerta
              'Ocurrió un error al insertar!',      //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==4){
            swal(
              'Bien',                              //titulo de la alerta
              'Se inserto la nueva área!',         //contenido de la alerta
              'success'                            //tipo de alerta (success)
            )
            // cuando la respues es 4 (se realizo la inserción, limpiamos los valores y volvemos a actualizar la áreas)
            this.area_id='';
            this.area_nombre='';
            this.getAreas();
          }
        })
      }else{
        // si los datos se encuentran vacíos mandamos una alerta con  sweetalert2
        swal(
          'Error',                              //titulo de la alerta
          'Los datos deben estar completos!',   //contenido de la alerta
          'error'                               //tipo de alerta (error)
        )
      }
    },
    // la función/método deleteArea eliminará una área, la cuál recibe como parametro.
    deleteArea(area){
      // colocamos una alerta de tipo warning, el cuál me pide una confirmación para realizar una función
      swal({
        title: 'Estás seguro?',                       //Título de la alerta
        text: `Eliminaras el área : ${area.name}`,  //Texto de la alerta
        type: 'warning',                              //Tipo de alerta (warning)
        showCancelButton: true,                       //Mostrar el boton cancelar : true
        confirmButtonColor: '#3085d6',                //Estilos(color) del botón confirmar 
        cancelButtonColor: '#d33',                    //EStilos(color) del botón cancelar
        confirmButtonText: 'Sí, eliminar!',           //Texto del botón confirmar
        cancelButtonText: 'No, cancelar!'             //Texto del botón cancelar
      }).then((result) => { // recibe el resultado                                  
        // si el resultado es sí realiza una función, al cancelar solo se cierra la alerta
        if (result.value) {   
          // creamos la cadena con las variables para enviar por petición post
          form = 'id='+area.number;
          // con el api fetch enviamos a la url, luego colamos un objeto
          fetch('ajax.php?mode=deleteArea',{
            // define el método que usamos
            method:'post',
            // define la cabecera, como enviamos la información
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            },
            // la información viaja en el cuerpo (body)
            body:form
          })
          .then(res=>res.json())
          .then(res=>{
            if(res==0){
              swal(
                'Error',                              //titulo de la alerta
                'Los datos deben estar completos!',   //contenido de la alerta
                'error'                               //tipo de alerta (error)
              )
            }else if(res==1){
              swal(
                'Error',                              //titulo de la alerta
                'Ocurrió un error al eliminar!',   //contenido de la alerta
                'error'                               //tipo de alerta (error)
              )
            }else{
              //Mostramos una alerta que se ha eliminado el area
              swal(
                'Eliminado!',                           //Título de la alerta
                `${area.name} ha sido eliminada.`,    //Texto de la alerta
                'success'                               //Tipo de alerta (success)
              )
              this.getAreas();   // volvemos a llamar a getAreas para actualizar nuestra lista
            }
          })
        }
      })
    },
    // la función/método showUpdateArea muestra el modal y asigna un área, la cuál recibe como parametro.
    showUpdateArea(area){
      this.oldArea = Object.assign({}, area); ;
      this.oldId = area.number;
      this.showModal = true;
    },
    // la función/método updateArea actualiza el área que se encuentra en la variable oldArea.
    updateArea(){
       // verificamos que los datos no estén vacíos
      if(this.oldArea.number && this.oldArea.name){
        // creamos la cadena con las variables para enviar por petición post
        form = 'id='+this.oldArea.number+'&name='+this.oldArea.name+'&oldId='+this.oldId;
        // con el api fetch enviamos a la url, luego colamos un objeto
        fetch('ajax.php?mode=updateArea',{
          // define el método que usamos
          method:'post',
          // define la cabecera, como enviamos la información
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          // la información viaja en el cuerpo (body)
          body:form
        })
        .then(res=>res.json())
        .then(res=>{
          console.log(res)
          if(res==0){
            swal(
              'Error',                              //titulo de la alerta
              'Los datos deben estar completos!',   //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==1){
            swal(
              'Error',                              //titulo de la alerta
              'El ID debe ser un número!',          //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==2){
            swal(
              'Error',                              //titulo de la alerta
              'El nombre no puede ser un número!',  //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==3){
            swal(
              'Error',                              //titulo de la alerta
              'Ocurrió un error al actualizar!',      //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==4){
            swal(
              'Bien',                              //titulo de la alerta
              'Se actualizo el área!',         //contenido de la alerta
              'success'                            //tipo de alerta (success)
            )
            this.showModal = false //cerramos el modal            
            this.getAreas();   // volvemos a llamar a getAreas para actualizar nuestra lista
          }
        })
      }else{
        // si los datos se encuentran vacíos mandamos una alerta con  sweetalert2
        swal(
          'Error',                              //titulo de la alerta
          'Los datos deben estar completos!',   //contenido de la alerta
          'error'                               //tipo de alerta (error)
        )
      }
    }

  }
})