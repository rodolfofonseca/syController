import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function user_registration(app: FastifyInstance) {
    app.post('/user_cad', async function (request, reply) {
        let body_user = z.object({ name_user: z.string(), password: z.string(), email: z.string() });

        let { name_user, password, email } = body_user.parse(request.body);

        if(name_user == '' || password == '' || email == ''){
            return reply.status(205).send("NÃO É POSSÍVEL REALIZAR O CADASTRO COM DADOS VAZIOS");
        }

        let return_email = await prisma.user.findUnique({ where: { email: email } });

        if (return_email == null) {
            let user_return = await prisma.user.create({ data: { name_user, password, email } });
            return reply.status(201).send(user_return);
        } else {
            return reply.status(205).send(return_email);
        }
    });
}