import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function user_login(app: FastifyInstance){
    app.post('/user_login', async function(request, reply){
        let body_user_login = z.object({email: z.string(), password: z.string()});

        let {email, password} = body_user_login.parse(request.body);

        if(email == '' || password == ''){
            return reply.status(205).send('NÃO FOI REALIZADO PESQUISA POIS DOS DADOS ESTÃO INCORRETOS');
        }
        
        let return_prisma = await prisma.user.findUnique({where:{email:email, password:password}});
        
        if(return_prisma == null){
            return reply.status(205).send('NÃO FOI REALIZADO PESQUISA POIS DOS DADOS ESTÃO INCORRETOS');
        }else{
            return reply.status(201).send(return_prisma);
        }
    });
}