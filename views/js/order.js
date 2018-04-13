new Vue({
  el:'#app',
  data:{
    areas:[],  
    order:{},
    orders:[],
    newOrder:{},
    newDetail:{},
    details:[],
    valor:'',
    filterMode:'all',
    mode: 0, // modo 0: añadir , 1 :actualizar
    modeDetail : 0,
    showModal: false, //mostrar modal para actualizar o añadir pedido
    showModalDetail: false,
    showViewMoreModal: false,
  },
  mounted(){
    this.getAreas();
    this.getOrders();
  },
  computed:{
    filterOrders(){
      switch(this.filterMode){
        case 'all'         : return this.orders;break;
        case 'area'        : return this.orders.filter(order=>order.number_area==this.valor); break;
        case 'tipo'        : return this.orders.filter(order=>order.type==this.valor);break;
        case 'seguimiento' : return this.orders.filter(order=>order.tracing==this.valor);break;
        case 'fecha'       : return this.orders.filter(order=>order.order_date==this.valor);break;
        case 'mes'         : return this.orders.filter(order=>order.order_date.substring(5, 7)==this.valor);break;
        default            : return this.orders; 
      }
    }
  },
  methods:{
    // la función get Areas realiza una petición get para obtener las áreas.
    getAreas(){
      // enviamos la petición por la URL con fetch
      fetch('ajax.php?mode=getAreas')
      // las respuesta que obtenemos la pasamos a un json
      .then(res=>res.json())
      // asignamos el valor obtenido a nuestro arreglo areas
      .then(res=>this.areas=res)
    },
    addDetail(){
      this.showModalDetail=false;
      if(this.newDetail.description && this.newDetail.quantity && this.newDetail.unit)
        this.details.push(this.newDetail);
      this.newDetail={};
    },
    // la función/método getOrders realiza una petición get para obtener los pedidos
    getOrders(){    
      // enviamos la petición por la url con fetch
      fetch('ajax.php?mode=getOrders')
      // la respuesta obtenida la pasamos a json
      .then(res=>res.json())
      // asignamos el valor obtenido a nuestro arrego orders
      .then(res=>this.orders=res)
    },
    addOrder(){
      if(
        this.newOrder.id_area &&
        this.newOrder.cod_pomdihma &&
        this.newOrder.cod_poi &&
        this.newOrder.order_date &&
        this.newOrder.number &&
        this.newOrder.type &&
        this.newOrder.tracing
      ){
        this.newOrder.details = this.details;
        // creamos la cadena con las variables para enviar por petición post
        form =  'area_id=' + this.newOrder.id_area +
                '&cod_pomdihma=' + this.newOrder.cod_pomdihma +
                '&cod_ppto=' + this.newOrder.cod_poi +
                '&fecha=' + this.newOrder.order_date +
                '&fecha_atendido=' + this.newOrder.served_date +
                '&fecha_pc=' + this.newOrder.service_date +
                '&npedido=' + this.newOrder.number +
                '&detalles=' + JSON.stringify(this.newOrder.details) +
                '&tipo=' + this.newOrder.type + 
                '&seguimiento=' + this.newOrder.tracing 
        // con el api fetch enviamos a la url, luego colamos un objeto
        fetch('ajax.php?mode=addOrder',{
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
              'Error',                              //Título de la alerta
              'Los datos deben estar completos!',   //Texto de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==1){
            swal(
              'Error',                              //Título de la alerta
              'Algunos datos deben ser númericos!', //Texto de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==2){
            swal(
              'Error',                                    //Título de la alerta
              'Datos incorrectos, por favor verifica!',   //Texto de la alerta
              'error'                                     //tipo de alerta (error)
            )
          }else if(res==3){
            swal(
              'Error',                                //Título de la alerta
              'Ocurrió un error al agregar pedido!',  //Texto de la alerta
              'error'                                 //tipo de alerta (error)
            )
          }else{
            swal(
              'Bien',                               //Título de la alerta
              'Se ha agregado un nuevo pedido',     //Texto de la alerta
              'success'                             //Tipo de alerta (success)
            )
            this.newOrder={}
            this.details=[]
            this.showModal=false
            this.getOrders()
          }
        })
      }else{
        console.log('Hola mundo')
        swal(
          'Error',                              //Título de la alerta
          'Los datos deben estar completos!',   //Texto de la alerta
          'error'                               //tipo de alerta (error)
        )
      }
    },
    //la función/método showUpdateOrder muestra el modal y asigna la order que es pasada como parametro para que sea actualizada
    //setea el modo a 1, para actualizar el area asignada y muestra el modal
    showUpdateOrder(order){
      this.mode = 1;
      this.newOrder = order;     
      let form = `id_order=${order.id}`;
      fetch('ajax.php?mode=getDetails',{
        method: 'post',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        // la información viaja en el cuerpo (body)
        body:form
      })
      // las respuesta que obtenemos la pasamos a un json
      .then(res=>res.json())
      // asignamos el valor obtenido a nuestro arreglo areas
      .then(res=>{
        this.details=res;
        this.showModal = true;
      })
    },
    //Mostrar el modal para actualizar un detalle(ShowModalDetail)
    showUpdateDetail(detail){
      this.modeDetail = 1;
      this.newDetail = detail;
      this.showModalDetail=true;
    },
    //Mostrar la información de una orden, seleccionada de la tabla
    showViewMore(order){
      this.order = order;
      let form = `id_order=${this.order.id}`;
      fetch('ajax.php?mode=getDetails',{
        method: 'post',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        // la información viaja en el cuerpo (body)
        body:form
      })
      // las respuesta que obtenemos la pasamos a un json
      .then(res=>res.json())
      // asignamos el valor obtenido a nuestro arreglo areas
      .then(res=>{
        this.order.details=res;
        this.showViewMoreModal=true;
      })
    },
    updateOrder(){
      if(
        this.newOrder.id_area &&
        this.newOrder.cod_pomdihma &&
        this.newOrder.cod_poi &&
        this.newOrder.order_date &&
        this.newOrder.served_date &&
        this.newOrder.service_date &&
        this.newOrder.number &&
        this.newOrder.type &&
        this.newOrder.tracing
      ){
        // creamos la cadena con las variables para enviar por petición post
        form =  'area_id=' + this.newOrder.id_area +
                '&cod_pomdihma=' + this.newOrder.cod_pomdihma +
                '&cod_ppto=' + this.newOrder.cod_poi +
                '&fecha=' + this.newOrder.order_date +
                '&fecha_atendido=' + this.newOrder.served_date +
                '&fecha_pc=' + this.newOrder.service_date +
                '&npedido=' + this.newOrder.number +
                '&tipo=' + this.newOrder.type +
                '&seguimiento=' + this.newOrder.tracing 
        // con el api fetch enviamos a la url, luego colamos un objeto
        fetch('ajax.php?mode=updateOrder',{
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
              'Error',                              //Título de la alerta
              'Los datos deben estar completos!',   //Texto de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==1){
            swal(
              'Error',                              //Título de la alerta
              'Algunos datos deben ser númericos!', //Texto de la alerta
              'error'                               //tipo de alerta (error)
            )
          }else if(res==2){
            swal(
              'Error',                                    //Título de la alerta
              'Datos incorrectos, por favor verifica!',   //Texto de la alerta
              'error'                                     //tipo de alerta (error)
            )
          }else if(res==3){
            swal(
              'Error',                                //Título de la alerta
              'Ocurrió un error al actualizar el pedido!',  //Texto de la alerta
              'error'                                 //tipo de alerta (error)
            )
          }else{
            swal(
              'Bien',                               //Título de la alerta
              'Se ha actualizado el pedido',     //Texto de la alerta
              'success'                             //Tipo de alerta (success)
            )
            this.newOrder={}
            this.showModal=false
            this.details=[]
            this.getOrders()
          }
        })
      }else{
        swal(
          'Error',                              //Título de la alerta
          'Los datos deben estar completos!',   //Texto de la alerta
          'error'                               //tipo de alerta (error)
        )
      }
    },
    updateDetail(){
      if(this.newDetail.description && this.newDetail.quantity && this.newDetail.unit 
      && this.newDetail.estimated_cost){
        form =  'id_detalle=' + this.newDetail.id +
                '&descripcion=' + this.newDetail.description +
                '&cantidad=' + this.newDetail.quantity +
                '&unidad=' + this.newDetail.unit +
                '&costo_estimado=' + this.newDetail.estimated_cost +
                '&costo_real=' + this.newDetail.real_cost 
        fetch('ajax.php?mode=updateDetail',{
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
              'Error',
              'Los datos deben estar completos',
              'error'
            )
          }else if(res==1){
            swal(
              'Error',
              'Ocurrió un error al actualizar',
              'error'
            )
          }else{
            swal(
              'Bien',
              'Se ha actualizado el detalle',
              'success'
            )
            let form = `id_order=${this.newOrder.id}`;
            fetch('ajax.php?mode=getDetails',{
              method: 'post',
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              // la información viaja en el cuerpo (body)
              body:form
            })
            // las respuesta que obtenemos la pasamos a un json
            .then(res=>res.json())
            // asignamos el valor obtenido a nuestro arreglo areas
            .then(res=>{
              this.details=res;
              this.modeDetail=0;
              this.showModalDetail=false;
              this.newDetail={};
            })
            
          }
        })
      }else{
        swal(
          'Error',
          'Los datos deben estar completossss',
          'error'
        )
      }
      
    },
    //la función/método execSubmit ejecuta el submit del formulario,
    /*
    a partir del formulario se pueden ejecutar don funciones (actualizar y registrar), según el modo que se encuentre
    */
    execSubmit(){      
      if(this.mode==0){this.addOrder()}
      else{this.updateOrder()}
    },
    execSubmitDetail(){
      if(this.mode==0){this.addDetail()}
      else{this.updateDetail()}
    },
    convertToCSV(objArray){
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for(let i=0; i<array.length; i++){
        let line = '';
        for(let index in array[i]){
          if(line!='') line +=','
          line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    },
    exportCSVFile(headers,items,fileTitle){
      if(headers){
        items.unshift(headers);
      }
      //Convertir Object a JSON
      let jsonObject = JSON.stringify(items);
      let csv = this.convertToCSV(jsonObject);
      let exportedFilename = fileTitle+'.csv' || 'export.csv';
      let blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
      if(navigator.msSaveBlob){
        navigator.msSaveBlob(blob,exportedFilename);
      }else{
        let link = document.createElement("a");
        if(link.download != undefined){
          let url = URL.createObjectURL(blob);
          link.setAttribute('href',url);
          link.setAttribute('download',exportedFilename);
          link.style.visibility='hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    },
    exportData(){
      let headers={
        id:"Item",
        number:"N Pedido",
        cod_poi: "COD POI",
        cod_pomdihma: "COD POMDIHMA",
        type: "Tipo",
        order_date: "Fecha",
        served_date: "Fecha atendido",
        service_date: "Fecha PC",
        number_area: "Area",
        description: "Descripcion",
        quantity: "Cantidad",
        unit: "Unidad",
        estimated_cost: "Costo Estimado",
        real_cost: "Costo Real"
      }

      let orderID = []
      this.filterOrders.map(el=>orderID.push(el.id))


      form = 'id_order=' + JSON.stringify(orderID) 
      // enviamos la petición por la url con fetch
      fetch('ajax.php?mode=getReport',{
         // define el método que usamos
         method:'post',
         // define la cabecera, como enviamos la información
         headers:{
           'Content-Type':'application/x-www-form-urlencoded'
         },
         // la información viaja en el cuerpo (body)
         body:form
      })
      // la respuesta obtenida la pasamos a json
      .then(res=>res.json())
      // asignamos el valor obtenido a nuestro arrego orders
      .then(res=>{
        this.exportCSVFile(headers,res,'pedidos')
      })
      
    }
  }
})