/*
Al tener tantos archivos js como vistas, colocamos el nombre de la vista para guardar una relacion
Ejemplo index.html -> index.js
        admin.html -> admin.js
*/ 

//Documentación de VueJS  -> https://vuejs.org/v2/guide/

//creamos la instancia vue
/*
 primero definimos el elemento (el) para relacionarlo, en nuestro caso el selector es un id app 
 en la data colocamos las variables que usaremos
 creamos los métodos en nuestro caso goLogin para realizar el login correspondiente
*/
new Vue({
  el:'#app',
  data:{
    username:'',
    password:'',
  },
  methods:{
    //metodo goLogin desencadenado por el fomulario con el evento submit
    goLogin(){
      console.log("Hola");
      //verificamos que los datos no estén vacíos.
      if(this.username && this.password){
        // creamos la cadena para enviar los datos 
        form = 'user='+this.username+'&pass='+this.password;

        fetch('ajax.php?mode=login',{
           // define el método que usamos
           method:'post',
           // define la cabecera, como enviamos la información
           headers:{
             'Content-Type':'application/x-www-form-urlencoded'
           },
           // la información viaja en el cuerpo (body)
           credentials:'include',
           body:form
        })
        .then(res=>res.json())
        .then(res=>{
          if(res==1){
            location.reload()
          }else if(res==2){
            swal(
              'Error',                              //titulo de la alerta
              'Usuario o contraseña incorrecta!',   //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else{
            swal(
              'Error',                              //titulo de la alerta
              'Los datos deben estar completos!',   //contenido de la alerta
              'error'                               //tipo de alerta (error)
            )
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