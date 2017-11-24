var config = {};

config.minimizedPixelSize = 16;
config.batchSize = 20;

// connection string format: "postgres://[username]:[password]@localhost/[database]"
config.connectionString = "postgres://postgres:password@localhost/postgres";
config.ssl = false;

module.exports = config;