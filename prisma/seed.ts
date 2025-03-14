import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'EDITOR', 'USER'];
  const permissions = ['ADD', 'EDIT', 'UPDATE', 'DELETE'];

  console.log('Seeding roles...');
  const roleRecords = await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: { name: role },
        update: {},
        create: {
          name: role,
          description: `${role} role`,
        },
      })
    )
  );

  console.log('Seeding permissions...');
  const permissionRecords = await Promise.all(
    permissions.map((permission) =>
      prisma.permission.upsert({
        where: { name: permission },
        update: {},
        create: {
          name: permission,
          description: `${permission} permission`,
        },
      })
    )
  );

  const adminRole = roleRecords.find((role) => role.name === 'ADMIN');

  if (adminRole) {
    console.log('Assigning all permissions to ADMIN role...');
    await Promise.all(
      permissionRecords.map((permission) =>
        prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id } },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: permission.id,
          },
        })
      )
    );
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  console.log('Seeding admin user...');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });

  if (adminRole) {
    await prisma.userInRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
