import {
  TableServiceClient,
  TableClient,
  AzureNamedKeyCredential,
} from "@azure/data-tables";

let _tableClient;
const _storyPartitionKey = "partition1";

const initalizeAzureTableClient = async () => {
  if (_tableClient) {
    return _tableClient;
  }

  const tableName = process.env.AZURE_STORY_TABLE;
  const credential = new AzureNamedKeyCredential(
    process.env.AZURE_ACCOUNT,
    process.env.AZURE_KEY
  );

  const serviceClient = new TableServiceClient(
    `https://${process.env.AZURE_ACCOUNT}.table.core.windows.net`,
    credential
  );
  await serviceClient.createTable(tableName, {
    onResponse: (response) => {
      if (response.status === 409) {
        console.log(`Table ${tableName} already exists`);
      }
    },
  });

  _tableClient = new TableClient(
    `https://${process.env.AZURE_ACCOUNT}.table.core.windows.net`,
    tableName,
    credential
  );

  return _tableClient;
};

export const listStories = async () => {
  const tableClient = await initalizeAzureTableClient();
  let entitiesIter = tableClient.listEntities();
  let stories = [];
  for await (const entity of entitiesIter) {
    stories.push(entity);
  }
  return stories;
};

export const retrieveStory = async (rowKey) => {
  const tableClient = await initalizeAzureTableClient();

  const entity = await tableClient.getEntity(_storyPartitionKey, rowKey);
  return entity;
};

export const createStory = async (rowKey, title, story) => {
  const tableClient = await initalizeAzureTableClient();

  const entity = {
    partitionKey: _storyPartitionKey,
    rowKey: rowKey,
    title: title,
    story: story,
  };

  await tableClient.createEntity(entity);
  return entity;
};

export const updateStory = async (rowKey, title, story) => {
  const tableClient = await initalizeAzureTableClient();

  const entity = {
    partitionKey: _storyPartitionKey,
    rowKey: rowKey,
    title: title,
    story: story,
  };

  await tableClient.updateEntity(entity);
  return entity;
};

export const deleteStory = async (rowKey) => {
  const tableClient = await initalizeAzureTableClient();
  await tableClient.deleteEntity(_storyPartitionKey, rowKey);
  return true;
};
