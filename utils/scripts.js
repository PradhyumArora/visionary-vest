const { PrismaClient } = require('@prisma/client');
const data = require('../lib/influencers.json')

const prisma = new PrismaClient();

async function main() {
    // Loop over each influencer in the data and create a record in the database
    // for (const influencer of data) {
    //     await prisma.influencer.create({
    //         data: {
    //             name: influencer.name,
    //             age: influencer.age,
    //             image: influencer.image,
    //             content: influencer.content,
    //             last1MonthEarnings: influencer.last1MonthEarnings,
    //             last6MonthsEarnings: influencer.last6MonthsEarnings,
    //             last12MonthsEarnings: influencer.last12MonthsEarnings,
    //             currentPrice: influencer.currentPrice,
    //         },
    //     });
    // }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });