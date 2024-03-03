import {z} from "zod";
import {prisma} from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function search_artists(app: FastifyInstance){
    app.get('/search_artists/', async function(request, reply){
        let search_artists = await prisma.artists.findMany({take:10, orderBy:[{id_artist:'desc'}] });

        return reply.send(search_artists);
    });
}