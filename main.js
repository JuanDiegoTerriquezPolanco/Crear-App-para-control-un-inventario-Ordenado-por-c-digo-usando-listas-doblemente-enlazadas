//CLASE PARA LOS OBJETOS PRODUCTOS
class Product{
    constructor(id, name, amount, cost){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.next=null;
        this.previous=null;
    }
    getTotal(){
        return this.amount * this.cost;
    }
    //IMPRIME LOS RESULTADOS EN HTML
    infoHTML(){
        return `| ${this.id} | ${this.name} | ${this.amount} | ${this.cost} | ${this.getTotal()} |<br>`;
    }
}
//CLASE PARA LOS FUNCIONES DE LOS PRODUCTOS
class Depot{
    constructor(){
        this.products = null;
    }
    //AGREGAR PRODUCTOS
    add(product){
        if (this.products==null) {
            this.products=product;
        } else if (this.search(product.id)==null){
            this.resetList();
            //_add(product,this.products)
            let aux = this.products;
            while (product.next==null&&product.previous==null) {
                if (product.id<aux.id) {
                    if (aux.previous==null) {
                        aux.previous=product;
                        product.next=aux;
                    }else{
                        aux.previous.next=product;
                        product.previous=aux.previous;
                        aux.previous=product;
                        product.next=aux;
                    }
                }else if (aux.next==null){
                    aux.next=product;
                    product.previous=aux;
                }
                aux=aux.next;
            }
        } else {
            return null
        } 
        console.log(this.products)
        return product;
    }/*
    _add(newData,last){
        console.log(this.products)
        if (last.next==null) {
            last.next = newData;
        } else {
            this._add(newData,last.next);
        }
    }*/

    //ELIMINA PRODUCTOS POR ID
    delete(id){
        this.resetList();
        let aux = this.products;
        let deleteData = null

        if (aux.next==null) {
            if (aux.id==id) {
                deleteData=aux;
                aux=null;
                this.products=null
            }
        }else{
            while (aux!=null&&deleteData==null) {
                if (aux.id==id) {
                    deleteData=aux;
                    if (aux.previous==null) {
                        aux.next.previous=null;
                        aux=null;
                    }else if (aux.next==null) {
                        aux.previous.next=null;
                        aux=null;
                    }else{
                        aux.previous.next=aux.next;
                        aux.next.previous=aux.previous;
                        aux=null
                    }
                }else{
                    aux=aux.next;
                }
            }
        } 
        return null;
    }

    //BUSCAR PRODUCTOS POR ID
    search(id){
        this.resetList();
        let aux = this.products;
        if (this.products==null) {
            return null;
        } else {
            while (aux!=null) {
                if (aux.id==id) {
                    return aux;
                }
                aux=aux.next;
            }
            return null;
        }
    }

    //RESETEA LA LISTA DE OBJETOS
    resetList(){
        let aux=this.products;
        while (aux.next!=null) {
            aux=aux.next;
        }
        while (aux.previous!=null) {
            aux=aux.previous;
        }
        this.products=aux;
    }

    //LISTA LOS PRODUCTOS POR DEFAULT
    listDefautl(){
        this.resetList();
        let list='';
        let aux=this.products;
        while (aux.previous!=null) {
            aux=aux.previous;
        }
        while (aux!=null) {
            list += aux.infoHTML() + '';
            aux=aux.next;
        }
        return list;
    }

    //LISTA LOS PRODUCTOS AL REVES
    listReverse(){
        this.resetList();
        let list='';
        let aux=this.products;
        while (aux.next!=null) {
            aux=aux.next;
        }
        while (aux!=null) {
            list += aux.infoHTML() + '';
            aux=aux.previous;
        }
        return list;
    }
}

class Interface{
    //IMPRIME LAS TABLAS EN HTML
    showProduct(newData){
        let details=document.getElementById('details');
        details.innerHTML = `${newData}`;
    }
}
//RECOLECCION DE DATOS
let depot = new Depot();
let ui = new Interface();
//TOMA ACCION DE BOTON PARA FUNCION AGREGAR
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    //TOMA DATOS HTML
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.showProduct(depot.add(product).infoHTML());
});

//TOMA ACCION DE BOTON PARA FUNCION ELIMINAR
const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    //TOMA DATO HTML
    let id = document.getElementById('idDelete').value;
    ui.showProduct(depot.delete(id).infoHTML());
});

//TOMA ACCION DE BOTON PARA FUNCION BUSCAR
const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    //TOMA DATO HTML
    let id = document.getElementById('idSearch').value;
    if (depot.search(id)==null) {
        let msg="Sin resultados"
        ui.showProduct(msg)
    }else{
        ui.showProduct(depot.search(id).infoHTML());
    }
});

//TOMA ACCION DE BOTON PARA FUNCION LISTAR DEFAULT
const btnDefault=document.getElementById('btnListDefault');
btnDefault.addEventListener('click',()=>{
    ui.showProduct(depot.listDefautl());
});

//TOMA ACCION DE BOTON PARA FUNCION LISTAR DEFAULT
const btnReverse=document.getElementById('btnListReverse');
btnReverse.addEventListener('click',()=>{
    ui.showProduct(depot.listReverse());
});
