import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseUrl = process.env.DataDATABASE_URL

const sessionConfig = {
    maxAge : 60 * 60*24*360,
    secret : process.env.COOKIE_SECRET,
}

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials : true
        }
    },
    lists: createSchema({}),
    db: {
        adapter : 'mongoose',
        url : databaseUrl
        //data seeding there
    },
    ui : {
        // change this for roles
        isAccessAllowed : () => true
    }
})