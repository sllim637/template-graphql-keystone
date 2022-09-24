import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User'
import { Product } from './schemas/Product';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import { ProductImage } from './schemas/ProductImage';
const databaseUrl = process.env.DataDATABASE_URL

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
}
const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //add roles here
    }
})
export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    lists: createSchema({
        User,
        Product,
        ProductImage
    }),
    db: {
        adapter: 'mongoose',
        url: databaseUrl
        //data seeding there
    },
    ui: {
        // change this for roles
        isAccessAllowed: ({ session }) => {
            console.log(session);

            return !!session?.data;
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id name email`
    })
})) 