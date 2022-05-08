import {
    Bson,
    MongoClient,
    ObjectId,
} from "https://deno.land/x/mongo@v0.29.4/mod.ts";
const client = new MongoClient();
await client.connect("mongodb://localhost:27017");
const db = client.database("denorest");

export default db;