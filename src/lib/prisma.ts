import { PrismaClient } from "@prisma/client/extension";

declare global {
  var prisma: PrismaClient | undefined;
}

console.log('Initializing prisma client');
const prisma = global.prisma || new PrismaClient();

console.log('Global prisma:', global.prisma);
console.log('Local prisma:', prisma);

if (process.env.NODE_ENV == 'development') {
  console.log('Setting global prisma in development environment');
  global.prisma = prisma;
}

console.log('Exporting prisma client');
export default prisma;
