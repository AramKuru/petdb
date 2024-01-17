    // ~/strapi-aws-s3/backend/config/plugins.js
    
    module.exports = ({ env }) => ({
        upload: {
          config: {
            provider: 'aws-s3',
            providerOptions: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_ACCESS_SECRET'),
              region: env('AWS_REGION'),
              params: {
                ACL: env('AWS_ACL', 'public-read'),
                signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
                Bucket: env('AWS_BUCKET'),
              },
            },
            actionOptions: {
              upload: {},
              uploadStream: {},
              delete: {},
            },
          },
        },
        email: {
          config: {
            provider: 'gmail-api',
            providerOptions: {
              auth: {
                userId: env('EMAIL_OAUTH2_USERID'),
                clientId: env('EMAIL_OAUTH2_CLIENTID'),
                clientSecret: env('EMAIL_OAUTH2_CLIENTSECRET'),
                refreshToken: env('EMAIL_OAUTH2_REFRESHTOKEN'),
              },
            },
            settings: {
              defaultFrom: env('EMAIL_FROM'),
              defaultReplyTo: env('EMAIL_REPLYTO'),
              testAddress: env('EMAIL_TEST_ADDRESS'),
            },
          },
        },
  });