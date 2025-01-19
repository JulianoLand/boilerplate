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
        const camposValidos = this.camposSaoValidos();

        if(camposValidos){
            console.log('passou nos testes....')
            this.form.submit();
        }
    }

    camposSaoValidos(){
        let valid = true;

        for(let erro of this.form.querySelectorAll('.error-text')){
            erro.remove();
        }
        
        for (let campo of this.form.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro(campo, `Campo "${label}" não pode esta em branco.`);
                valid = false;
            }

            // if(campo.classList.contains('cpf')){
            //     if(!this.validaCPF(campo)) valid = false;
            // }

            // if(campo.classList.contains('usuario')){
            //     if(!this.validaUsuario(campo)) valid = false;
            // }
        }

        return valid;
    }

    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();