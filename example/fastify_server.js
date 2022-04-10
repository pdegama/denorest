import Fastify from 'fastify'
const fastify = Fastify({
    logger: false
})

fastify.get('/', async (request, reply) => {
    //reply.type('application/json').code(200)
    reply.send("Hello, Fastify!")
})

fastify.listen({ port: 8004 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})