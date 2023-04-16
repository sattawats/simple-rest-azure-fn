# Serverless simple REST APIs using Azure Function

## Steps

1. Clone this repo
1. Add `local.settings.json` file to your local
1. Make sure to install `vscode`, `node`, and `npm`
1. Install `Azure Functions`, `REST Client` in vscode extension

### Update local.settings.json

```
{
 "IsEncrypted": false,
 "Values": {
   "AzureWebJobsStorage": "",
   "FUNCTIONS_WORKER_RUNTIME": "node",
   "AZURE_ACCOUNT":"<YOUR_ACCOUNT>",
   "AZURE_KEY":"<YOUR_KEY>",
   "AZURE_STORY_TABLE":"<YOUR_TABLE_NAME>"
 }
}
```
