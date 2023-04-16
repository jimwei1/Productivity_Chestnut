const { Sequelize, QueryTypes } = require('sequelize')
require('dotenv').config();


const sequelize = new Sequelize(process.env.POSTGRESQL_DB, 
    process.env.POSTGRESQL_DB_USER,
    process.env.POSTGRESQL_DB_PASSWORD, {
    host: process.env.POSTGRESQL_DB_HOST,
    dialect: "postgres",
    // declaring pool is optional
    // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle
  // }
  });

  const connectToDatabase = async () => {
    try {
      await sequelize.authenticate()
      console.log('connected to the database')
    } catch (err) {
      console.log('failed to connect to the database')
      return process.exit(1)
    }
  
    return null
  }
  
  module.exports = { connectToDatabase, sequelize }
  