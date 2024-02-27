import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function cadastroUsuario(app: FastifyInstance){
    app.post('/usuario', async function(request, reply){
        let criar_corpo_usuario = z.object({name: z.string(), password: z.string(), email:z.string()});

        let {name, password, email} = criar_corpo_usuario.parse(request.body);

        let retorno_usuario = await prisma.usuario.create({data:{name, password, email}});

        return reply.status(201).send(retorno_usuario);
    });
}