import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Neo4jAdapter } from '@next-auth/neo4j-adapter';
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URL as string,
  neo4j.auth.basic(process.env.NEO4J_USERNAME as string, process.env.NEO4J_PASSWORD as string)
);

const neo4jSession = driver.session();

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  adapter: Neo4jAdapter(neo4jSession)
};

export default NextAuth(authOptions);
