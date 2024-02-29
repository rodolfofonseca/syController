import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function user_login(app: FastifyInstance){
    app.post('/user_login', async function(request, reply){
        let body_user_login = z.object({email: z.string(), password: z.string()});

        let {email, password} = body_user_login.parse(request.body);

        let return_prisma = await prisma.user.findUnique(
            {
                where:{
                    email:'rodolfo',
                    password:'123'
                }
            }
        );

        return reply.status(201).send(return_prisma);
    });
}