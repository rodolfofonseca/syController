import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function search_artist_name(app: FastifyInstance){
    app.get('/search_artist_name/:name_artists?', async function(request, reply){
        
        let artist_object = z.object({name_artists: z.string()});
        let {name_artists} = artist_object.parse(request.params);

        let return_prisma = await prisma.artists.findMany({where: {name_artists: {contains:name_artists}}});

        return reply.status(200).send(return_prisma);
    });
}