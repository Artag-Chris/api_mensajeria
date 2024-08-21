import { PrismaClient } from '@prisma/client';
import { envs } from '../config/envs';

class PrismaService extends PrismaClient {
  constructor() {
    const dbHost = envs.DB_HOST;
    //const dbPort = envs.DB_PORT;
    const dbUser = envs.DB_USER;
    const dbPassword = envs.DB_PASSWORD;
    const database = envs.DATABASE;

    super({
      datasources: {
        db: {
            url: `mysql://${dbUser}:${dbPassword}@${dbHost}/${database}`,
        },
      },
    });

    this.init(); 
  }

  async init() {
    try {
      await this.$connect();
      console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  async destroy() {
    await this.$disconnect();
  }
}

const prismaService = new PrismaService();

process.on('SIGINT', async () => {
  await prismaService.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prismaService.destroy();
  process.exit(0);
});

export default prismaService;