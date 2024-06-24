import { Client, Account, Databases, Storage } from 'appwrite';

export const PROJECT_ID = '6646fd320037c447f81e'
export const DATABASE_ID = '6647001200115f436fbf'
export const COLLECTION_ID_HOST = '6647058b0035bbed8b7c'
export const COLLECTION_ID_FAVOURITES = '66734d600026a84c1d99'
export const COLLECTION_ID_PROFILE= '66470137001632d54f1d'
export const BUCKET_ID_HOST='6647076e0036bf5715f3'
export const COLLECTION_ID_BOOKINGS="6679ef82002c3ebcfb4f"

const client = new Client()
.setEndpoint(String(process.env.NEXT_PUBLIC_APPWRITE_URL))
.setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);


export default client;