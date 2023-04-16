import { deleteStory } from "../services/azure-service.js";

export default async function (context, req) {
  context.log(`Delete story request with ${req.params.id}`);

  if (req.params && req.params.id) {
    const id = req.params.id;
    const isDeleted = await deleteStory(id);

    if (isDeleted) {
      context.res = {
        status: 200,
        body: `${id} deleted`,
      };
    } else {
      context.res = {
        status: 401,
        body: "Unauthorized",
      };
    }
  } else {
    context.res = {
      status: 400,
      body: "Invalid parameters",
    };
  }
}
