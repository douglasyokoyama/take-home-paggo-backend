# Take Home Paggo
Design and implementation of a solution for extract text from image using OCR, and displaying a structured summary of the extracted data to a user.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Installation

```bash
$ pnpm install
```

## Setting up the local environment
First is needed to have docker configured and a postgres image installed, the instructions can be found [here](https://docs.docker.com/engine/install/) for docker installation, them run the following commands run the local postgres and setup your tables.

Install the project dependencies
```bash
$ pnpm install
```

Runs the postgreSQL instance on docker
```bash
$ pnpm db:dev
```

Create the tables at the running postgres
```bash
$ pnpm prisma:migrate:dev
```

Generate prisma client
```bash
$ pnpm prisma:generate
```

Executes a local webpage to visualize your db
```bash
$ pnpm prisma:studio
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Swagger API
Swagger document can be visited at http://localhost:3000/api

## Test
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

# External configurations

## Google Auth Configuration
At [Google console](https://console.cloud.google.com/apis/credentials) it's necessary to setup your project and the oauth client id.
- create a new project
- at 'Services and APIs' in the 'credentials' menu create a new oauth client id credential
  - at javascript authorized origins add your backend url, ex: http://localhost:3000
  - at Authorized redirect URIs add your provider callback endpoint, ex: http://localhost:3000/auth/google/callback
  - save and copy the client id and client secret id to .env file, see .env.example for reference
- if needed setup the consent screen

## Prisma Configuration
- npx prisma init
- npx prisma generate
- pnpm prisma:migrate:dev

https://docs.nestjs.com/recipes/prisma#install-and-generate-prisma-client

## AWS Configuration
### S3 - invoice images
- create s3 bucket 
- update permissions to access your created bucket
- interesting fact about bucket naming
  - https://cybernews.com/news/amazon-bucket-name-can-cause-massive-bill/

## Usefull links
[nestjs](https://docs.nestjs.com/)
[prisma](https://docs.nestjs.com/recipes/prisma)
[GAuth](https://developers.google.com/identity/protocols/oauth2)

## Other usefull links
https://docs.nestjs.com/techniques/file-upload#basic-example
https://docs.nestjs.com/techniques/configuration#custom-getter-functions
https://developers.google.com/identity/protocols/oauth2
https://docs.aws.amazon.com/AmazonS3/
https://docs.aws.amazon.com/textract/latest/dg/what-is.html
https://docs.aws.amazon.com/textract/latest/dg/API_AnalyzeExpense.html#Textract-AnalyzeExpense-response-ExpenseDocuments
https://docs.aws.amazon.com/textract/latest/dg/invoices-receipts.html
