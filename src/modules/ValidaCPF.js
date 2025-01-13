class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            // Limpo o CPF retirando os caracteres especiais...
            value: cpfEnviado.replace(/\D+/g,'')
        });
    }

    // validação para verificar se temos numeros repetidos
    sequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !==  11) return false;
        if(this.sequencia()) return false;


    }
}



let validacpf = new ValidaCPF('070.987.720-03');
// let validacpf = new ValidaCPF('000.000.000-00');

console.log(validacpf.sequencia());