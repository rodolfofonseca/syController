import fastify from 'fastify';
import cors from '@fastify/cors'

import {cadastroUsuario} from './rotas/cadastro-usuario';
import {pesquisarUsuario} from './rotas/pesquisar-usuario';

const APP = fastify();

APP.register(cors, { 
    // put your options here
})

APP.register(cadastroUsuario);
APP.register(pesquisarUsuario);

APP.listen({port: 3333}).then(function(){
    console.log('SERVIDOR HTTP ESTÁ RODANDO CORRETAMENTE.');
});