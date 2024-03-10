import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function search_contract(app: FastifyInstance){
    app.get('/search_contract/:id_user?', async function(request, reply){
        let contract_object = z.object({id_user: z.string()});
        let {id_user} = contract_object.parse(request.params);

        if(id_user != ''){
            let return_prisma = await prisma.contract.findMany({where:{id_user:id_user}, orderBy:{data:'desc'}, select:{id_contract:true, id_artist:true, cache:true, data:true, event_address:true, name_artist:true}});
            return reply.status(200).send(return_prisma);
        }else{
            return reply.status(500).send({"message":"É NECESSÁRIO O ID DE USUÁRIO PARA CONTINUAR A PESQUISA"});
        }

    });
}