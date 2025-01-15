import './assets/css/style.css';

class ValidaFormulario {
    constructor(){
        this.form = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.form.addEventListener('submit', (e)=>{
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('form prevent')
    }
}

const valida = new ValidaFormulario();