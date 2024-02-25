import { Sequelize } from "sequelize"

const { PSQL_DB, PSQL_USERNAME, PSQL_PASSWORD, PSQL_HOST } = process.env
const PSQL_DIALECT = "postgres"

const sequelize = new Sequelize(PSQL_DB, PSQL_USERNAME, PSQL_PASSWORD, {
  host: PSQL_HOST,
  dialect: PSQL_DIALECT,
})

export default sequelize
