import { retrieveStory } from "../services/azure-service.js";

export default async function (context, req) {
  context.log(`Get story request with id = ${req.params.id}`);

  if (req.params && req.params.id) {
    const responseMessage = await retrieveStory(req.params.id);
    context.res = {
      body: responseMessage,
    };
  } else {
    context.res = {
      status: 400,
      body: "Invalid parameters",
    };
  }
}
