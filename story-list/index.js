import { listStories } from "../services/azure-service.js";

export default async function (context, req) {
  context.log(`List stories request`);

  const responseMessage = await listStories();
  context.res = {
    body: responseMessage,
  };
}
