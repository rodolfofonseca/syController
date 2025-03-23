var system = (function (window) {
    ;
    var system = {
        topo: (function () {
            var el_frame = null;
            if (window.frames['FrameCorpo']) {
                el_frame = window;
            }
            else if (window.parent.frames['FrameCorpo']) {
                el_frame = window.parent;
            }
            else if (window.parent.parent.frames['FrameCorpo']) {
                el_frame = window.parent.parent;
            }
            else if (window.parent.parent.parent.frames['FrameCorpo']) {
                el_frame = window.parent.parent.parent;
            }
            else if (window.parent.parent.parent.parent.frames['FrameCorpo']) {
                el_frame = window.parent.parent.parent.parent;
            }
            return el_frame;
        }),
        is_string: (function (elemento) {
            return (typeof elemento === "string");
        }),
        is_integer: (function (elemento) {
            return ((+elemento === elemento) && (isFinite(elemento) == true));
        }),
        is_float: (function (elemento) {
            return (+elemento === elemento) && ((isFinite(elemento) == false) || !!(elemento % 1));
        }),
        is_array: (function (element) {
            return element.constructor === Array;
        }),
        is_object: (function (element) {
            return element.constructor === Object;
        }),
        integer: (function (elemento) {
            var temporaria;
            if ((elemento === true) || (elemento === false)) {
                return +elemento;
            }
            else if (system.is_string(elemento) === true) {
                temporaria = parseInt(elemento, 10);
                return ((isNaN(temporaria) == true) || (isFinite(temporaria) == false)) ? 0 : temporaria;
            }
            else if ((system.is_integer(elemento) == true) || (system.is_float(elemento) == true)) {
                return parseInt(elemento, 10);
            }
            else {
                return 0;
            }
        }),
        float: (function (elemento) {
            elemento = system.string(elemento);
            if ((elemento.indexOf('.') >= 0) && (elemento.indexOf(',') >= 0)) {
                elemento = system.replace('.', '', elemento);
            }
            elemento = elemento.replace(',', '.');
            return (parseFloat(elemento) || 0);
        }),
        percentage: (function (elemento) {
            elemento = system.float(elemento);
            if (elemento > 0) {
                return elemento / 100;
            }
            return 0;
        }),
        string: (function (elemento) {
            if (typeof elemento == 'boolean') {
                if (elemento === true) {
                    return 'true';
                }
            }
            else if (typeof elemento == 'object') {
                return 'Objeto';
            }
            else if (elemento != null) {
                return String(elemento);
            }
            else {
                return '';
            }
        }),
        digit: (function (element) {
            return element.replace(/[^0-9]/g, '');
        }),
        date: (function (format) {
            var data = new Date();
            var textoData = '';
            textoData = system.replace('d', system.left(String(data.getDate()), 2, '0'), format);
            textoData = system.replace('m', system.left(String(data.getMonth() + 1), 2, '0'), textoData);
            textoData = system.replace('Y', String(data.getFullYear()), textoData);
            textoData = system.replace('H', system.left(String(data.getHours()), 2, '0'), textoData);
            textoData = system.replace('i', system.left(String(data.getMinutes()), 2, '0'), textoData);
            textoData = system.replace('s', system.left(String(data.getSeconds()), 2, '0'), textoData);
            textoData = system.replace('u', system.left(String(data.getMilliseconds()), 3, '0'), textoData);
            return textoData;
        }),
        date_create: (function (data) {
            var campos_data = data.split('/');
            var date = null;
            if (campos_data.length != 3) {
                return false;
            }
            campos_data = campos_data.map(function (item) {
                return system.integer(item);
            });
            date = new Date(campos_data[2], campos_data[1] - 1, campos_data[0], 0, 0, 0, 0);
            return date;
        }),
        replace: (function (search, replace, data, sensivel) {
            if (sensivel === void 0) { sensivel = false; }
            var searchList = [system.string(search)];
            var replaceList = [system.string(replace)];
            var text = system.string(data);
            if (sensivel === true) {
                for (var i = 0; i < searchList.length; i++) {
                    text = text.split(searchList[i]).join(replaceList[i]);
                }
            }
            else {
                var escapeRegex = function (str) {
                    return str.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
                };
                while (searchList.length > replaceList.length) {
                    replaceList[replaceList.length] = '';
                }
                for (var i = 0; i < searchList.length; i++) {
                    text = text.replace(new RegExp(escapeRegex(searchList[i]), 'gi'), replaceList[i]);
                }
            }
            return text;
        }),
        repeat: (function (preencher, len) {
            return new Array(len + 1).join(preencher);
        }),
        left: (function (value, quantidade, preenchimento) {
            return String(value).padStart(quantidade, preenchimento);
        }),
        right: (function (value, quantidade, preenchimento) {
            return String(value).padEnd(quantidade, preenchimento);
        }),
        number_format: (function (numero, decimais, decimal, milhar) {
            if (decimais === void 0) { decimais = 2; }
            if (decimal === void 0) { decimal = ','; }
            if (milhar === void 0) { milhar = ''; }
            var arr = [];
            
            let aux = '';
            numero = system.float(numero); // converte o numero para float para realizar os calculos
            numero = system.arredondar(numero,'',0,decimais);
            numero = numero.toString(); // retorna para string para trabalhar com os decimais e etc.
            

            // verifica se o número contém o "." ou se é um número inteiro que não possuirá
            if (!String(numero).includes('.')){
                aux = '0';
            }
            arr = numero.split('.');    // separa a partir do ponto, para tratar a pontuação
            
            if (arr[0] > 3) {
                var resultado = [];
                var num = arr[0].split('').reverse();
                for (var i = 0; i < num.length; i++) {
                    if ((i % 3 == 0) && (i >= 3)) {
                        resultado.push(milhar);
                    }
                    resultado.push(num[i]);
                }
                arr[0] = resultado.reverse().join('');
            
                if (numero < 0) {
                    arr[0] = '-' + arr[0];
                }
            }
            // verifica se possui decimais, para retornar com eles
            if (decimais > 0) {
                // verifica se o "auxiliar" recebeu algum conteúdo para poder adicionar os "0" em um inteiro
                if (aux != ''){
                    arr.push(aux);
                }
                // preenche todas as casas de acordo com os decimais informados
                arr[1] = arr[1].padEnd(decimais,'0');
                return arr[0] + decimal + (arr[1] + '').substr(0, decimais);
            }
            
            return arr[0];
        }),
        arredondar: (function(valor, operacao = '', quantidade = null, casas_decimais = 2){
            if (valor == undefined || valor == null){
                valor = 0;
            }

            // transforma a quantidade para float verificando se é maior que 0 para realizar calculos
            valor = parseFloat(valor);
            if (quantidade != null && operacao != '') {
                quantidade = parseFloat(quantidade);
                // a partir da operação passada pelo usuário é realizado o cálculo
                if (operacao == '*') {
                    valor = valor * quantidade;
                } else if (operacao == '+') {
                    valor = valor + quantidade;
                } else if (operacao == '-') {
                    valor = valor - quantidade;
                } else if (operacao == '/') {
                    valor = valor / quantidade;
                }
            }
            if (valor != 0 && valor != undefined){
                // após os calculos (opcionais) é iniciado a rotina de arredondamento
                let auxiliar_precisao = 2;
                let auxiliar_comparacao = 5 * Math.pow(10, auxiliar_precisao-1);
                
                // recupera o valor em string
                let numero_string = valor.toFixed((casas_decimais+auxiliar_precisao));
                let numero_inteiro = parseInt(numero_string.replace('.',''));
    
                let sobra = parseInt((numero_inteiro + "").substr(-auxiliar_precisao));
                let numero = parseInt((numero_inteiro + "").substr(0, ((numero_inteiro+"").length - auxiliar_precisao) ));

                if(isNaN(numero)){
                    return 0;
                }
                
                if(numero % 2 == 0){
                    if(sobra > auxiliar_comparacao){numero++;}
                } else {
                    if(sobra >= auxiliar_comparacao){numero++;}
                }
                
                numero = (numero / Math.pow(10, casas_decimais)).toFixed(casas_decimais);
                return parseFloat(numero);
            }
            return 0;
        }),
        cpf_cnpj : (function(cpf_cnpj) {
            let isCPF = (cpf_cnpj).length == 11 ? true : false;

            if (cpf_cnpj.length == 11) {
                cpf_cnpj=cpf_cnpj.replace(/\D/g,"")
                cpf_cnpj=cpf_cnpj.replace(/(\d{3})(\d)/,"$1.$2")
                cpf_cnpj=cpf_cnpj.replace(/(\d{3})(\d)/,"$1.$2")
                cpf_cnpj=cpf_cnpj.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
                return cpf_cnpj
            } else if (cpf_cnpj.length == 14) {
                cpf_cnpj=cpf_cnpj.replace(/\D/g,"")
                cpf_cnpj=cpf_cnpj.replace(/^(\d{2})(\d)/,"$1.$2")
                cpf_cnpj=cpf_cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
                cpf_cnpj=cpf_cnpj.replace(/\.(\d{3})(\d)/,".$1/$2")
                cpf_cnpj=cpf_cnpj.replace(/(\d{4})(\d)/,"$1-$2")
                return cpf_cnpj
            } else return cpf_cnpj
        }),
        telefone: function (telefone) {
            setTimeout(function() {
                var r = telefone.value.replace(/\D/g, "");
                r = r.replace(/^0/, "");
                if (r.length > 10) {
                    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
                } else if (r.length > 5) {
                    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
                } else if (r.length > 2) {
                    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
                } else {
                    r = r.replace(/^(\d*)/, "($1");
                }

                if (r != telefone.value) {
                    telefone.value = r;
                }
            }, 1)
        },
        strip_accents: (function (texto) {
            var com_acento = ['à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý'];
            var sem_acento = ['a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'N', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y'];
            system.each(com_acento, function (chave, letra) {
                texto = system.replace(letra, sem_acento[chave], texto);
            });
            return texto;
        }),
        each: (function (lista, funcao) {
            var tamanho = 0;
            var usar_chave = false;
            var i = 0;
            var item = null;
            if ('length' in lista) {
                tamanho = lista.length;
            }
            if (funcao.length == 2) {
                usar_chave = true;
            }
            if (tamanho > 0) {
                for (i = 0; i < tamanho; i++) {
                    if (usar_chave == true) {
                        funcao(i, lista[i]);
                    }
                    else {
                        funcao(lista[i]);
                    }
                }
            }
            else {
                if (usar_chave == true) {
                    for (item in lista) {
                        funcao(item, lista[item]);
                    }
                }
                else {
                    for (item in lista) {
                        funcao(lista[item]);
                    }
                }
            }
        }),
        listeners: {
            codigo: function (e) {
                var sltd = window.getSelection().toString();
                var max = system.integer(this.getAttribute('maxlength'));
                if (max == 0) {
                    max = 50;
                }
                if ((sltd == this.value) && ['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key) === false) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                if (value.length > max) {
                    value = value.substr(0, max);
                }
                this.value = value;
                if (['Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key) === false) {
                    e.preventDefault();
                }
            },
            texto: function (e) {
                var value = this.value.replace(/[^A-z0-9ÀÁÂÃÄÅàáâãäÒÓÔÕÕÖòóôõöÈÉÊèéêÇçÌÍìíÙÚÜùúü\s].:,;/g, '');
                var max = system.integer(this.getAttribute('maxlength'));
                if (max == 0) {
                    max = 255;
                }
                if (value.length > max) {
                    value = value.substr(0, max);
                }
                this.value = value;
            },
            data: function (e) {
                var sltd = window.getSelection().toString();
                if ((sltd == this.value) && ((e.key != 'Tab') && (e.key != 'Enter'))) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                if (value.length >= 2) {
                    value = value.substr(0, 2) + '/' + value.substr(2);
                }
                if (value.length >= 5) {
                    value = value.substr(0, 5) + '/' + value.substr(5);
                }
                if (e.key == '/') {
                    return false;
                }
                if (value.length > 10) {
                    value = value.substr(0, 10);
                }
                this.value = value;
                if ((e.key != 'Tab') && (e.key != 'Enter')) {
                    e.preventDefault();
                }
            },
            hora: function (e) {
                var sltd = window.getSelection().toString();
                if ((sltd == this.value) && ((e.key != 'Tab') && (e.key != 'Enter'))) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                if (value.length >= 2) {
                    value = value.substr(0, 2) + ':' + value.substr(2);
                }
                if (value.length >= 5) {
                    value = value.substr(0, 5) + ':' + value.substr(5);
                }
                if (e.key == ':') {
                    return false;
                }
                if (value.length > 8) {
                    value = value.substr(0, 8);
                }
                this.value = value;
                if ((e.key != 'Tab') && (e.key != 'Enter')) {
                    e.preventDefault();
                }
            },
            moeda: function (e) {
                var max = system.integer(this.getAttribute('maxlength'));
                if (max == 0) {
                    max = 11;
                }
                var sltd = window.getSelection().toString();
                if ((sltd == this.value) && ((e.key != 'Tab') && (e.key != 'Enter'))) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9\,]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                var integer = value.split(',')[0];
                var decimal = value.split(',')[1];
                if (decimal != null) {
                    decimal = decimal + '';
                    if (decimal.length > 2) {
                        decimal = decimal.substr(0, 2);
                    }
                    value = integer + ',' + decimal;
                }
                else {
                    value = integer;
                    if (e.key == ',') {
                        value = value + ',';
                    }
                }
                if (value.length > max) {
                    value = value.substr(0, max);
                }
                this.value = value;
                if ((e.key != 'Tab') && (e.key != 'Enter')) {
                    e.preventDefault();
                }
            },
            peso: function (e) {
                var max = system.integer(this.getAttribute('maxlength'));
                if (max == 0) {
                    max = 11;
                }
                var sltd = window.getSelection().toString();
                if ((sltd == this.value) && ((e.key != 'Tab') && (e.key != 'Enter'))) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9\,]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                var integer = value.split(',')[0];
                var decimal = value.split(',')[1];
                if (decimal != null) {
                    decimal = decimal + '';
                    if (decimal.length > 3) {
                        decimal = decimal.substr(0, 4);
                    }
                    value = integer + ',' + decimal;
                }
                else {
                    value = integer;
                    if (e.key == ',') {
                        value = value + ',';
                    }
                }
                if (value.length > max) {
                    value = value.substr(0, max);
                }
                this.value = value;
                if ((e.key != 'Tab') && (e.key != 'Enter')) {
                    e.preventDefault();
                }
            },
            cpf_cnpj: function (e) {
                var sltd = window.getSelection().toString();
                var max = system.integer(this.getAttribute('maxlength'));
                if (max == 0) {
                    max = 18;
                }
                if ((sltd == this.value) && ((e.key != 'Tab') && (e.key != 'Enter'))) {
                    this.value = '';
                }
                var value = (this.value + e.key).replace(/[^0-9]/g, '');
                if (e.key == 'Backspace') {
                    value = value.slice(0, -1);
                }
                if (e.key == 'Delete') {
                    value = value.slice(0, -1);
                }
                if (value.length > max) {
                    value = value.substr(0, max);
                }
                this.value = value;
                if ((e.key != 'Tab') && (e.key != 'Enter')) {
                    e.preventDefault();
                }
            },
            help: function (e) {
                var codigo = e.target.getAttribute('system-help');
                e.preventDefault();
                system.topo().system.modal.open({
                    content: "<div style='display:block; padding: 0px; margin:0px; background-color:transparent; width:800px; height:400px; overflow-y: auto'><img src='Imagens/manual/" + codigo + ".png'></div>"
                });
            },
            picker: function (e) {
                var campo = e.target.getAttribute('system-date-picker');
                e.preventDefault();
                system.topo().system.modal.open({
                    url: system.url('/', {
                        'exibir_calendario': 'S',
                        'id_campo': campo,
                        'formato': 'd/m/Y',
                        'id_frame': (window.frameElement) ? window.frameElement.id : ''
                    }),
                    width: 600,
                    height: 320
                });
            },
            confirm: function (e) {
                if (e.key == 'Enter') {
                    eval(e.target.getAttribute('system-confirm'));
                }
            }
        },
        validation: {
            texto: function (e) {
                var value = this.value.replace(/[^A-z0-9ÀÁÂÃÄÅàáâãäÒÓÔÕÕÖòóôõöÈÉÊèéêÇçÌÍìíÙÚÜùúü\s].:,;/g, '');
            },
            data: function (e) {
                var value = this.value.replace(/[^0-9]/g, '');
                var day = system.integer(value.substr(0, 2));
                var month = system.integer(value.substr(2, 2));
                var year = system.integer(value.substr(4));
                if ((value.length === 8) && (day > 0) && (day <= 31) && (month > 0) && (month <= 12)) {
                    if (month !== 2) {
                        return true;
                    }
                    if ((year % 4) === 0) {
                        if (day <= 29) {
                            return true;
                        }
                    }
                    else if (day <= 28) {
                        return true;
                    }
                }
                this.value = '';
                return false;
            },
            hora: function (e) {
                var value = system.right(this.value.replace(/[^0-9]/g, ''), 8, '0');
                var hour = system.integer(value.substr(0, 2));
                var minute = system.integer(value.substr(2, 2));
                var seconds = system.integer(value.substr(4));
                if ((this.value.length) >= 1 &&
                    (hour >= 0) && (hour <= 23) &&
                    (minute >= 0) && (minute <= 59) &&
                    (seconds >= 0) && (seconds <= 59)) {
                    this.value = [
                        system.left(String(hour), 2, '0'),
                        system.left(String(minute), 2, '0'),
                        system.left(String(seconds), 2, '0')
                    ].join(':');
                    return true;
                }
                this.value = '';
                return false;
            },
            moeda: function (e) {
                var value = this.value.replace(/[^0-9\,]/g, '');
                if (value.length > 0) {
                    var integer = system.integer(value.split(',')[0]);
                    var decimal = system.right(value.split(',')[1] || 0, 2, '0').substr(0, 2);
                    this.value = integer + ',' + decimal;
                    return true;
                }
                this.value = '';
                return false;
            },
            peso: function (e) {
                var value = this.value.replace(/[^0-9\,]/g, '');
                if (value.length > 0) {
                    var integer = system.integer(value.split(',')[0]);
                    var decimal = value.split(',')[1];
                    this.value = [integer, system.right(decimal, 4, '0')].join(',');
                    return true;
                }
                this.value = '';
                return false;
            },
            cpf_cnpj: function (e) {
                var cpf_cnpj = system.replace([' ', '.', '-', '/'], '', this.value);
                var tamanho = cpf_cnpj.length;
                var soma = 0;
                var resto = 0;
                if (tamanho > 0) {
                    if ((tamanho === 11) && (cpf_cnpj !== '00000000000')) {
                        for (var i = 1; i <= 9; i = i + 1) {
                            soma = soma + parseInt(cpf_cnpj.substring(i - 1, i)) * (11 - i);
                        }
                        resto = system.integer((soma * 10) % 11);
                        if ((resto === 10) || (resto === 11)) {
                            resto = 0;
                        }
                        if (resto === system.integer(cpf_cnpj.substr(9, 1))) {
                            soma = 0;
                            for (var i = 1; i <= 10; i = i + 1) {
                                soma = soma + system.integer(cpf_cnpj.substring(i - 1, i)) * (12 - i);
                            }
                            resto = system.integer((soma * 10) % 11);
                            if ((resto === 10) || (resto === 11)) {
                                resto = 0;
                            }
                            if (resto === system.integer(cpf_cnpj.substr(10, 1))) {
                                this.value = cpf_cnpj.substr(0, 3) + '.' + cpf_cnpj.substr(3, 3) + '.' + cpf_cnpj.substr(6, 3) + '-' + cpf_cnpj.substr(9);
                                return true;
                            }
                        }
                    }
                    else if (tamanho === 14) {
                        tamanho = tamanho - 2;
                        var numeros = cpf_cnpj.substring(0, tamanho);
                        var digitos = cpf_cnpj.substring(tamanho);
                        var pos = tamanho - 7;
                        for (var i = tamanho; i >= 1; i = i - 1) {
                            soma = soma + (system.integer(numeros.charAt(tamanho - i)) * pos--);
                            if (pos < 2) {
                                pos = 9;
                            }
                        }
                        var resultado = ((soma % 11) < 2) ? 0 : (11 - soma % 11);
                        if (resultado == system.integer(digitos.charAt(0))) {
                            tamanho = tamanho + 1;
                            numeros = cpf_cnpj.substring(0, tamanho);
                            pos = tamanho - 7;
                            soma = 0;
                            for (var i = tamanho; i >= 1; i = i - 1) {
                                soma = soma + system.integer(numeros.charAt(tamanho - i)) * pos--;
                                if (pos < 2) {
                                    pos = 9;
                                }
                            }
                            resultado = ((soma % 11) < 2) ? 0 : (11 - soma % 11);
                            if (resultado == system.integer(digitos.charAt(1))) {
                                this.value = cpf_cnpj.substr(0, 2) + '.' + cpf_cnpj.substr(2, 3) + '.' + cpf_cnpj.substr(5, 3) + '/' + cpf_cnpj.substr(8, 4) + '-' + cpf_cnpj.substr(12);
                                return true;
                            }
                        }
                    }
                    this.value = '';
                    return false;
                }
                return true;
            },
            telefone: function (e) {
                var telefone = this.value.match(/[0-9]/g) || [];
                var mascara = '';
                if (telefone.length === 10) {
                    mascara = '(##) ####-####';
                } else if (telefone.length === 11) {
                    mascara = '(##) #####-####';
                }
                this.value = mascara.replace(/\#/g, function () {
                    return telefone.shift() || '';
                });
            }
        },
        mask: (function () {
            window.document.addEventListener('focus', function (event) {
                var element = event.target;
                if (element.getAttribute == null) {
                    return false;
                }
                if (element.getAttribute('system-mask') == 'codigo') {
                    element.removeEventListener('keydown', system.listeners.codigo, true);
                    element.addEventListener('keydown', system.listeners.codigo, true);
                }
                else if (element.getAttribute('system-mask') == 'texto') {
                    element.removeEventListener('keydown', system.listeners.texto, true);
                    element.addEventListener('keydown', system.listeners.texto, true);
                    element.removeEventListener('keyup', system.validation.texto, true);
                    element.addEventListener('keyup', system.validation.texto, true);
                }
                else if (element.getAttribute('system-mask') == 'data') {
                    element.removeEventListener('keydown', system.listeners.data, true);
                    element.addEventListener('keydown', system.listeners.data, true);
                    element.removeEventListener('blur', system.validation.data, true);
                    element.addEventListener('blur', system.validation.data, true);
                }
                else if (element.getAttribute('system-mask') == 'hora') {
                    element.removeEventListener('keydown', system.listeners.hora, true);
                    element.addEventListener('keydown', system.listeners.hora, true);
                    element.removeEventListener('blur', system.validation.hora, true);
                    element.addEventListener('blur', system.validation.hora, true);
                }
                else if (element.getAttribute('system-mask') == 'moeda') {
                    element.removeEventListener('keydown', system.listeners.moeda, true);
                    element.addEventListener('keydown', system.listeners.moeda, true);
                    element.removeEventListener('blur', system.validation.moeda, true);
                    element.addEventListener('blur', system.validation.moeda, true);
                }
                else if (element.getAttribute('system-mask') == 'peso') {
                    element.removeEventListener('keydown', system.listeners.peso, true);
                    element.addEventListener('keydown', system.listeners.peso, true);
                    element.removeEventListener('blur', system.validation.peso, true);
                    element.addEventListener('blur', system.validation.peso, true);
                }
                else if (element.getAttribute('system-mask') == 'cpf-cnpj') {
                    element.removeEventListener('keydown', system.listeners.cpf_cnpj, true);
                    element.addEventListener('keydown', system.listeners.cpf_cnpj, true);
                    element.removeEventListener('blur', system.validation.cpf_cnpj, true);
                    element.addEventListener('blur', system.validation.cpf_cnpj, true);
                }
                else if (element.getAttribute('system-mask') == 'telefone') {
                    element.removeEventListener('blur', system.validation.telefone, true);
                    element.addEventListener('blur', system.validation.telefone, true);
                }
                if (element.getAttribute('system-confirm') != null) {
                    element.removeEventListener('keydown', system.listeners.confirm, true);
                    element.addEventListener('keydown', system.listeners.confirm, true);
                }
                if (element.getAttribute('system-help') != null) {
                    element.removeEventListener('click', system.listeners.help, true);
                    element.addEventListener('click', system.listeners.help, true);
                }
                if (element.getAttribute('system-date-picker') != null) {
                    element.removeEventListener('click', system.listeners.picker, true);
                    element.addEventListener('click', system.listeners.picker, true);
                }
                return true;
            }, true);
            window.document.addEventListener('mouseover', function (event) {
                var element = event.target;
                if (element.getAttribute == null) {
                    return false;
                }
                if (element.getAttribute('system-help') != null) {
                    element.removeEventListener('click', system.listeners.help, true);
                    element.addEventListener('click', system.listeners.help, true);
                }
                if (element.getAttribute('system-date-picker') != null) {
                    element.removeEventListener('click', system.listeners.picker, true);
                    element.addEventListener('click', system.listeners.picker, true);
                }
            }, true);
        }),
        modal: {
            open: (function (parameters) {
                var idModal = 'id-' + system.date('YmdHisu');
                var modalOverlay = document.createElement('div');
                var modalContainer = document.createElement('div');
                var modalHeader = document.createElement('div');
                var modalContent = document.createElement('div');
                var modalClose = document.createElement('div');
                var settings = {
                    draggable: true,
                    width: 860,
                    height: 500,
                    content: '',
                    element: null,
                    url: '',
                    openCallback: false,
                    closeCallback: false
                };
                if (parameters.draggable) {
                    settings.draggable = parameters.draggable;
                }
                if (typeof parameters.closeCallback === 'function') {
                    settings.closeCallback = parameters.closeCallback;
                }
                if (parameters.openCallback) {
                    settings.openCallback = parameters.openCallback;
                }
                if (parameters.width) {
                    settings.width = parameters.width;
                }
                if (parameters.height) {
                    settings.height = parameters.height;
                }
                if (parameters.content) {
                    modalContent.innerHTML = parameters.content;
                }
                if (parameters.element) {
                    modalContent.appendChild(parameters.element);
                    modalContainer.style.width = (parameters.width !== undefined ? (settings.width + 'px') : "980px");
                }
                modalClose.onclick = function () {
                    system.modal.close(idModal);
                };
                modalOverlay.onclick = function () {
                    system.modal.close(idModal);
                };
                if (settings.draggable) {
                    modalHeader.style.cursor = 'move';
                    modalHeader.onmousedown = function (e) {
                        var xPosition = e.clientX, yPosition = e.clientY, differenceX = xPosition - modalContainer.offsetLeft, differenceY = yPosition - modalContainer.offsetTop;
                        document.onmousemove = function (e) {
                            xPosition = e.clientX;
                            yPosition = e.clientY;
                            modalContainer.style.left = ((xPosition - differenceX) > 0) ? (xPosition - differenceX) + 'px' : '0px';
                            modalContainer.style.top = ((yPosition - differenceY) > 0) ? (yPosition - differenceY) + 'px' : '0px';
                            document.onmouseup = function () {
                                window.document.onmousemove = null;
                            };
                        };
                    };
                }
                modalOverlay.setAttribute('id', 'modal-overlay-' + idModal);
                modalContainer.setAttribute('id', 'modal-container-' + idModal);
                modalHeader.setAttribute('id', 'modal-header-' + idModal);
                modalContent.setAttribute('id', 'modal-content-' + idModal);
                modalClose.setAttribute('id', 'modal-close-' + idModal);
                modalOverlay.setAttribute('class', 'modal-overlay');
                modalContainer.setAttribute('class', 'modal-container');
                modalHeader.setAttribute('class', 'modal-header');
                modalContent.setAttribute('class', 'modal-content');
                modalClose.setAttribute('class', 'modal-close');
                modalHeader.appendChild(modalClose);
                modalContainer.appendChild(modalHeader);
                modalContainer.appendChild(modalContent);
                document.body.appendChild(modalOverlay);
                document.body.appendChild(modalContainer);
                if (parameters.url) {
                    var url = parameters.url + '&id-modal=' + idModal + '&id_modal=' + idModal;
                    modalContent.innerHTML = "\n            <iframe\n              name=\"frame-modal-" + idModal + "\"\n              id=\"frame-modal-" + idModal + "\"\n              src='" + url + "'\n              style=\"padding:0px; margin:0px; background-color:transparent; width: " + settings.width + "px; height: " + settings.height + "px; overflow-y:scroll; border-top:0px; border-left:0px; border-style:none\"\n              border=\"0\"\n            ></iframe>\n          ";
                }
                var documentHeight = Math.max(document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0), modalWidth = settings.width, modalHeight = settings.height, browserWidth = window.screen.availWidth, browserHeight = window.screen.availHeight, amountScrolledX = 0, amountScrolledY = 0;
                var topContainer = 200;
                var leftContainer = 400;
                amountScrolledY = Math.max(window.pageYOffset || 0, document.body.scrollTop || 0, document.documentElement.scrollTop || 0);
                amountScrolledX = Math.max(window.pageXOffset || 0, document.body.scrollLeft || 0, document.documentElement.scrollLeft || 0);
                topContainer = amountScrolledY + ((browserHeight - modalHeight - 90) / 2);
                leftContainer = amountScrolledX + ((browserWidth - modalWidth - 60) / 2);
                modalContainer.style.top = topContainer + 'px';
                modalContainer.style.left = leftContainer + 'px';
                modalOverlay.style.height = documentHeight + 'px';
                modalOverlay.style.width = '100%';
                return idModal;
            }),
            close: (function (modal) {
                if (modal != null) {
                    system.remove('#modal-overlay-' + modal);
                    system.remove('#modal-container-' + modal);
                }
                else {
                    system.remove('.modal-overlay');
                    system.remove('.modal-container');
                }
            })
        },
        element: (function (selector) {
            return window.document.querySelector(selector);
        }),
        elements: (function (selector) {
            return window.document.querySelectorAll(selector);
        }),
        remove: (function (element) {
            if (system.is_string(element) == true) {
                element = system.element(String(element));
            }
            try {
                var parent_element = element.parentNode;
                parent_element.removeChild(element);
            }
            catch (e) { }
        }),
        url: (function (endereco, params) {
            var url = system.replace('\\', '/', window.location.href);
            var opt = [];
            url = (url.indexOf('?') > 0) ? url.substr(0, url.indexOf('?') + 1) : url;
            for (var key in params) {
                opt.push(key + '=' + params[key]);
            }
            url = url.substr(0, url.lastIndexOf('/')) + endereco;
            if (opt.length > 0) {
                url = url + '?' + opt.join('&');
            }
            return url;
        }),
        loader: (function (show) {
            if (show == true) {
                var base = document.createElement('div');
                var loader = document.createElement('div');
                var img = document.createElement('img');
                var p = document.createElement('p');
                p.innerHTML = 'Aguarde, carregando...';
                img.classList.add('loader-img');
                img.setAttribute('src', system.url('/Imagens/carregando.gif'));
                loader.classList.add('loader-msg');
                loader.appendChild(img);
                loader.appendChild(p);
                base.classList.add('loader');
                base.appendChild(loader);
                document.body.appendChild(base);
            }
            else {
                system.remove('.loader');
            }
        }),
        request: {
            send: (function (opt) {
                var method = opt.method;
                var url = opt.url;
                var data = opt.data;
                var complete = opt.complete;
                var loader = opt.loader;
                var parse = opt.parse || true;
                var fr = document.createElement('iframe');
                /*if (loader) {
                    system.loader(true);
                }*/
                fr.setAttribute('id', 'fake-ajax-iframe-' + system.date('u'));
                fr.setAttribute('src', '#');
                fr.setAttribute('style', 'display: none');
                system.element('body').appendChild(fr);
                var doc = fr.contentDocument || fr.contentWindow.document;
                var doc_body = doc.body;
                var fm = doc.createElement('form');
                fm.setAttribute('id', 'fake-ajax-form-' + system.date('u'));
                fm.setAttribute('method', method);
                fm.setAttribute('action', url);
                for (var key in data) {
                    var field = document.createElement('textarea');
                    if ((system.is_array(data[key]) == true) || (system.is_object(data[key]) == true)) {
                        data[key] = JSON.stringify(data[key]);
                    }
                    field.setAttribute('name', key);
                    field.innerHTML = data[key];
                    fm.appendChild(field);
                }
                doc_body.appendChild(fm);
                if(fm.id== HTMLTextAreaElement) console.log(" É um objeto text: " + fm.id);
                doc_body.querySelector('#' + fm.id).submit();
                fr.onload = (function () {
                    var doc = (fr.contentDocument || fr.contentWindow.document);
                    if (parse) {
                        try {
                            complete(JSON.parse(doc.body.innerHTML));
                        }
                        catch (e) {
                            console.log('ERRO AO INTERPRETAR RESPOSTA', e, '\n', doc.body.innerHTML);
                        }
                    }
                    else {
                        complete(doc.body.innerHTML);
                    }
                    /*if (loader) {
                        system.loader(false);
                    }*/
                    system.remove(fr);
                });
            }),
            post: (function (url, data, complete, loader) {
                if (loader === void 0) { loader = true; }
                system.request.send({
                    method: 'post',
                    url: system.url(url),
                    data: data,
                    complete: complete,
                    loader: loader
                });
            }),
            get: (function (url, data, complete, loader) {
                if (loader === void 0) { loader = true; }
                system.request.send({
                    method: 'get',
                    url: system.url(url),
                    data: data,
                    complete: complete,
                    loader: loader
                });
            })
        },
        download: (function (endereco, params, tempo_remover) {
            if (tempo_remover === void 0) { tempo_remover = 5000; }
            var fr = document.createElement('iframe');
            fr.setAttribute('id', 'download-iframe-' + system.date('u'));
            fr.setAttribute('style', 'display: none');
            fr.setAttribute('src', system.url(endereco, params));
            system.element('body').appendChild(fr);
            window.setTimeout(function () {
                system.remove(fr);
            }, tempo_remover);
        }),
        paginate: (function (lista, numero_pagina, quantidade_por_pagina) {
            if (quantidade_por_pagina === void 0) { quantidade_por_pagina = 50; }
            var inicio = 0;
            var fim = 0;
            var pagina = [];
            var total = 0;
            inicio = (numero_pagina - 1) * quantidade_por_pagina;
            fim = inicio + quantidade_por_pagina;
            system.each(lista, function (item) {
                if ((total >= inicio) && (total < fim)) {
                    pagina.push(item);
                }
                total = total + 1;
            });
            if (total > 0) {
                total = Math.ceil(total / quantidade_por_pagina);
            }
            if (total == 0) {
                total = 1;
            }
            return {
                pagina: pagina,
                total: total
            };
        }),
        tab: (function() {
            window.document.addEventListener('click', function (event) {
              var element = event.target;
              if (element.getAttribute == null) {
                return false;
              }
              if (element.getAttribute("system-tab")) {
              let listaInput = window.document.body.getElementsByTagName("input");
                for(var input of listaInput) 
                  input.classList.remove("ativo")

                element.classList.add("ativo")
                ativarDivTab()
              }
            });

            function ativarDivTab() {
              if (!window.document.body) return;
              let listaInput = window.document.body.getElementsByTagName("input");
              
              for(var div of window.document.documentElement.querySelectorAll(".tab")) {
                div.style.display = "none"
              }
              
              for(var input of listaInput) {
                  if (input.getAttribute("system-tab") == null) return false
                  
                input.classList.add("btn", "btn-desativado")
                if (input.classList.contains("ativo")) {
                  let id = "#tab-" + input.getAttribute("system-tab");
                  document.querySelector(id).style.display = "block"
                }
              }
          }
          ativarDivTab()
        }),
        initialize: (function (fn) {
            if (typeof fn === 'function') {
                window.addEventListener('load', fn, true);
            }
        })
    };
    window.document.addEventListener('DOMContentLoaded', function () {
        try {
            system.topo().EscondeDivTempo();
            if (window.addEventListener) window.addEventListener('keydown', function (e) {
                if (e.key == 'Escape') system.topo().system.modal.close();
            }, false);
            else if (document.attachEvent) document.attachEvent('onkeydown', function (e) {
                if (e.key == 'Escape') system.topo().system.modal.close();
            });
        }
        catch (e) { }
        system.mask();
        system.tab();
    }, true);
    return system;
})(window);


cookies_filtro = () => {
    var pathname = (window.location.pathname).replace("/", "");
    pathname = "_" + pathname.substr(0, pathname.search("/"))
    return pathname
}
  