import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function user_registration(app: FastifyInstance){
    app.post('/user_cad', async function(request, reply){
        let body_user = z.object({name_user: z.string(), password: z.string(), email:z.string()});

        let {name_user, password, email} = body_user.parse(request.body);

        let user_return = await prisma.user.create({data:{name_user, password, email}});

        return reply.status(201).send(user_return);
    });
}