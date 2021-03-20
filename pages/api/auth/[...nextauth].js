import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  // pages: {
  //   signIn: '/join-us',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: "/onboarding",
  // },
  
  providers: [
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Username",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials) {
    //     const user = (credentials) => {
    //       // You need to provide your own logic here that takes the credentials
    //       // submitted and returns either a object representing a user or value
    //       // that is false/null if the credentials are invalid.
    //       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //       return null;
    //     };
    //     if (user) {
    //       // Any user object returned here will be saved in the JSON Web Token
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),

    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    Providers.LinkedIn({
        clientId: process.env.LINKEDIN_PROVIDER_ID,
        clientSecret: process.env.LINKEDIN_PROVIDER_SECRET
      }),

    Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),

    Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),

    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),

    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
});
