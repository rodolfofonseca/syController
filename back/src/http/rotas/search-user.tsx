import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function search_user(app: FastifyInstance){
    app.get('/search_user/', async function (request, reply){
        let user_search = await prisma.user.findMany();

        return reply.send(user_search);
    });
}