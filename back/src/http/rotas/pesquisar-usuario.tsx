import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function pesquisarUsuario(app: FastifyInstance){
    app.get('/pesquisar_usuario/', async function (request, reply){
        let pesquisa_usuario = await prisma.usuario.findMany();

        return reply.send(pesquisa_usuario);
    });
}