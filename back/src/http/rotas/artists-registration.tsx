import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function artists_registration(app:FastifyInstance){
    app.post('/artists_cad', async function(request,reply){
        let body_artists = z.object({name_artists: z.string(), small_description: z.string()});
        let {name_artists, small_description} = body_artists.parse(request.body);

        if(name_artists == '' || small_description == ''){
            return reply.status(205).send('FALHA AO REALIZAR O CADASTRO DADOS INCORRETOS!');
        }else{
            let return_artists = await prisma.artists.create({data:{name_artists, small_description}});

            return reply.status(201).send(return_artists);
        }
        
    });
}