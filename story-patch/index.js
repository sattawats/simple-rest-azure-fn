import { updateStory } from "../services/azure-service.js";

export default async function (context, req) {
  context.log(`Patch story request with id = ${req.params.id}`);

  if (req.params) {
    const title = req.body.title ?? "";
    const story = req.body.story ?? "";
    const id = req.params.id;
    const responseMessage = await updateStory(id, title, story);
    context.res = {
      status: 200,
      body: responseMessage,
    };
  } else {
    context.res = {
      status: 400,
      body: "Invalid parameters",
    };
  }
}
