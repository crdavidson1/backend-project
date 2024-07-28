# EF Digital Software Engineer Test

## Instructions:

Hult/EF specialize in delivering immersive learning programs focused on the most critical global business skills for all levels of employees. Programs are run on a short period and new ones come and go frequently, to help with the maintenance of this, the marketing team would like an admin dashboard to manage program content. As the backend developer on this project you are expected to create an API that will faciliate CRUD requests from the new UI.

Spending no longer than 4 hours on the test, use the examples provided in the **"example-programs.json"** folder to build an API. Should look to complete me the work in the following priority order:
1. Ability to query all programs and return a list
2. Ability to add a program to the list
3. Unit tests for each API created
4. Ability to delete a program from the list
5. Ability to update a given program

On completion of the test:
- Compress code and send back to interviewer via email

### Considerations

- This new dashboard should only be visible to marketing managers and administrators

## Requirements

The only two requirements of this work is thats its written in TypeScript and comes with instructions on how to deploy locally.

## Examples

Some example stacks provided below on how to go about this test:

- Using express js (https://expressjs.com/) server with dynamodb local (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
- Using localstack and serverless framework (https://docs.localstack.cloud/user-guide/integrations/serverless-framework/)


### References
- Express JS: https://expressjs.com/
- Localstack: https://github.com/localstack/localstack
- Serverless: https://serverless.com
- Localstack Serverless Plugin: https://github.com/localstack/serverless-localstack
- AWS CLI: https://docs.aws.amazon.com/cli/latest/reference/