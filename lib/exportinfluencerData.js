const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function exportModelData() {
  // Fetch all records of the model
  const data = await prisma.influencer.findMany();

  // Stringify the data
  const dataString = JSON.stringify(data, null, 2);

  // Write the data to a JS file
  fs.writeFileSync('modelData.js', `module.exports = ${dataString};`);
}

exportModelData()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });