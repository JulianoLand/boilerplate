// Para validarmos um CPF vamos iniciar retirando os caracteres especiais
class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            // Limpo o CPF retirando os caracteres especiais...
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    // validação para verificar se temos numeros repetidos, verificação na função de validação
    sequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    // função para remoção dos 2 ultimos digitos
    geraNovoCPF() {
        // pegamos o cpf e removemos os 2 ultimos digitos
        const cpfSemDigito = this.cpfLimpo.slice(0, -2);
        // gera o primeiro digito enviando o cpf sem digito para outra função
        const digito1 = ValidaCPF.geraDigito(cpfSemDigito);
        // para gerar o segundo digito basta enviar para mesma função acima, alem do cpf sem os dois ultimos numeros add o num gerado acima.
        const digito2 = ValidaCPF.geraDigito(cpfSemDigito + digito1)
        this.novoCPF = cpfSemDigito + digito1 + digito2;
    }

    // função para criação de digito
    static geraDigito(cpf) {
        /*
        PRIMEIRO DIGITO
        - multiplica cada digito do cpf (os 9 primeiros) com a sequencia decrescente de 10.
            Ex: para o CPF 123456789, multiplica 1*10 2*9 3*8 e assim por diante...
        - soma o resultado de cada multiplicação, podemos colocar o resultado em TOTAL, por exemplo.
        - dividimos o resultado com a qtd de numeros do CPF, ou seja, 11. Aqui o que queremos é apenas o resto da divisão então utilizaremos o % (modulo).
        - subtrairmos o resultado acima por 11 e chegamos ao primeiro digito verificador.
            Lembrando que se o resultado for maior que 9 então considerar o valor do digito como '0'.
        */

        let total = 0;
        let posicao = cpf.length + 1; // 10

        for (let numString of cpf) {
            total += posicao * Number(numString);
            posicao--;
        }

        const digito = 11 - (total % 11)

        return digito <= 9 ? String(digito) : '0';
    }

    // O coração da classe onde obtiremos o resultado de tudo
    valida() {
        // Lembrando que aqui os dados já estao sem os caracteres especiais.

        // Se não houver nenhum dado, não continue...
        if (!this.cpfLimpo) return false;
        // Se for diferente de string, como exemplo só número, não continue...
        if (typeof this.cpfLimpo !== 'string') return false;
        // Se for tamanho diferente de 11 digitos, não continue...
        if (this.cpfLimpo.length !== 11) return false;
        // Se for uma sequencia, ou seja, todos os numeros iguais, não continue...
        if (this.sequencia()) return false;

        // Vamos gerar os novos digitos para comparação com o CPF enviado
        this.geraNovoCPF();

        return this.novoCPF === this.cpfLimpo;
    }
}



let validacpf = new ValidaCPF('070.987.720-03');
// let validacpf = new ValidaCPF('000.000.000-00');

if (validacpf.valida()){
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}