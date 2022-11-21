import express from 'express';
const {ApolloServer,gql}=require('apollo-server-express');

export const authors = [
    { id: 1, firstName: "Tom", lastName: "Coleman" },
    { id: 2, firstName: "Sashko", lastName: "Stubailo" },
    {id: 3, firstName: "Khusrik", lastName: "Kalashnikov"},
    { id: 3, firstName: "Mikhail", lastName: "Novikov" }
  ]
  

export const gApi=async()=>{

    type Author={
        id: number,
        firstName: string,
        lastName: string
    }

    const app: express.Application = express();

    const port:number=4000

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
        type Author {
            id: Int,
            firstName: String,
            lastName: String
        }
        type Query {
            author: [Author]
            firstauthorbyid (id: Int!): Author
            allauthorbyid (id:Int!): [Author]
        }
        input AuthorInput{
            id: Int,
            firstName: String,
            lastName: String
        }
        type Mutation{
            createAuthor(input: AuthorInput): Author
            updateAuthor(id: Int!, input:AuthorInput): Author
            deleteAuthor(id:Int!): Author
        }
    `;

    // Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
            author: () => authors,
            firstauthorbyid: (root:{_:Author},args:{ id:number }) => authors.find(a => a.id === args.id),
            allauthorbyid: (root:{_:Author},args:{ id:number }) => authors.filter(a => a.id === args.id),
            },
        Mutation: {
            createAuthor:(root:{_:Author},args:{input:Author})=>{
                authors.push(args.input)
            },
            updateAuthor:(root:{_:Author},args:{id:number,input:Author})=>{
                authors[args.id]=args.input
            },
            deleteAuthor: (root:{_:Author},args:{id:number})=>{
                authors.filter(a=>a.id!=args.id)
            }
        }
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}
gApi()
