import mongoose from 'mongoose'

/**
 * Connects to the MongoDB database.
 * 
 * @param user - The username for the database connection. Defaults to 'developer'.
 * @param password - The password for the database connection. Defaults to 'test123'.
 * @param host - The host for the database connection. Defaults to 'localhost'.
 * @param port - The port for the database connection. Defaults to '27017'.
 * @param database - The name of the database to connect to. Defaults to 'todomvc'.
 */
export async function connectDb(
    user: string = process.env.DB_USER ?? 'developer',
    password: string = process.env.DB_PASSWORD ?? 'test123',
    host: string = process.env.DB_HOST ?? '127.0.0.1',
    port: string = process.env.DB_PORT ?? '27017',
    database: string = 'todomvc'
): Promise<void> {
    try {
        const dbUrl = `mongodb://${user}:${password}@${host}:${port}/${database}`;
        console.log('Connecting to dbUrl ---', dbUrl)
        await mongoose.connect(dbUrl);
    } catch (error) {
        console.error('Error connecting to mongoDb', error);
    }
    
}

export async function disconnect(): Promise<void> {
    await mongoose.disconnect();
}