import fastify from 'fastify';
import cors from '@fastify/cors'

import {user_registration} from './rotas/user-registration';
import {search_user} from './rotas/search-user';
import {user_login} from './rotas/user-login'

const APP = fastify();

APP.register(cors, { })

APP.register(user_registration);
APP.register(search_user);
APP.register(user_login)

APP.listen({port: 3333}).then(function(){
    console.log('SERVIDOR HTTP ESTÁ RODANDO CORRETAMENTE.');
});