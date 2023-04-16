import { createStory } from "../services/azure-service.js";

export default async function (context, req) {
  context.log(`Post story request`);

  if (req.params) {
    const title = req.body.title ?? "";
    const story = req.body.story ?? "";
    const id = `${(Math.random() * 100000000000).toFixed()}`;
    const entity = await createStory(id, title, story);
    context.res = {
      status: 201,
      body: entity,
    };
  } else {
    context.res = {
      status: 400,
      body: "Invalid parameters",
    };
  }
}
