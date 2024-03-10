import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function search_artists_id(app: FastifyInstance){
    app.get("/search_artist_id/:id_artist?", async function(request, reply){

            let artist_object = z.object({id_artist: z.string()});
            let {id_artist} = artist_object.parse(request.params);

            if(id_artist != ''){
                let return_prisma = await prisma.artists.findUnique({where:{id_artist:id_artist}});
                return reply.status(200).send(return_prisma);
            }else{
                return reply.status(500).send({"message":"É NECESSÁRIO UM IDENTIFICADOR DE ARTISTA PARA PROCEGUIR"});
            }
    });
}