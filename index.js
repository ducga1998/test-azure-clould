const { BlobServiceClient } = require('@azure/storage-blob');
const uuidv1 = require('uuid/v1');
const  CONNECT_STR="DefaultEndpointsProtocol=https;AccountName=imagemedium;AccountKey=63+PFznL7GRvmgVSiRAQHTJmDJCtxAce2MwoENbTGWO9lxWSQJxKGaDu3hf/oN7v+AKjGZJv2RL+jfGK2veGWg==;EndpointSuffix=core.windows.net"
const fs = require('fs')

// Create a unique name for the container
const containerName = 'duc'

console.log('\nCreating container...');
console.log('\t', containerName);

// Get a reference to a container
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.pipe(fs.createWriteStream('duc.jpg'));
    });
  }
async function main() {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECT_STR);
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
    // Quick start code goes here
    const containerClient = await blobServiceClient.getContainerClient(containerName);

// Create the container
// const createContainerResponse = await containerClient.create();
// console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
console.log('\nListing blobs...');
uploadImage()

// List the blob(s) in the container.
for await (const blob of containerClient.listBlobsFlat()) {
    console.log('blob name', blob.name);
    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
const downloadBlockBlobResponse = await blockBlobClient.download(0);
console.log('\nDownloaded blob content...');
console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
}

}
const uploadImage  =async ()  => {
const blobName = 'duc'
const blobServiceClient = await BlobServiceClient.fromConnectionString(CONNECT_STR);
const containerClient = await blobServiceClient.getContainerClient(containerName);
const file = await fs.readFileSync('duc.jpg')
        const blockBlobClient = containerClient.getBlockBlobClient('xasnxjkasxaskjxas.jpg');

        const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
}
main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));