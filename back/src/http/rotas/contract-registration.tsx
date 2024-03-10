import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function contract_registration(app: FastifyInstance){
    app.post('/contract_registration', async function(request, reply){
        let body_contract_registration = z.object({id_user: z.string(), id_artist: z.string(), cache: z.number(), date: z.number(), event_address: z.string(), name_artist: z.string()});
        
        let {id_user, id_artist, cache, date, event_address, name_artist} = body_contract_registration.parse(request.body);
        let data = new Date(date);

        let return_contract_registration = await prisma.contract.create({data:{id_user, id_artist, cache, data, event_address, name_artist}});

        return reply.status(201).send(return_contract_registration);
    });
}