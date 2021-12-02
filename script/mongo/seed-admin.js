const bcrypt = require('bcrypt');
const { factoryLib, optionsLib } = require('../../lib/factoryLib');
const admin = require('../../config').auth.admin;

const TABLE = 'users';

function buildAdminUser(password) {
  return {
    password,
    username: admin.username,
    email: admin.email,
    isAdmin: true,
  };
}

async function hasAdminUser(mongoDB) {
  const adminUser = await mongoDB.getAll(TABLE, {
    username: admin.username,
  });

  return adminUser && adminUser.length;
}
async function createAdmin(mongoDb) {
  const password = await bcrypt.hash(admin.password, 10);
  return await mongoDb.save(TABLE, buildAdminUser(password));
}

async function seddAdmin() {
  try {
    const store = factoryLib(optionsLib.MONGO);
    if (await hasAdminUser(store)) {
      debug('Admin user already exist');
      process.exit(1);
    }
    const userID = await createAdmin(store);
    console.log('Create new user', userID);
    process.exit(0);
  } catch (error) {
    console.log('[Error ADMIN]', error);
    process.exit(1);
  }
}

seddAdmin();
