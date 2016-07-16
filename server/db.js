const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')
const pg = require('pg')
const uuid = require('node-uuid')

const config = {
  user: 'postgres',
  database: 'pokeguide',
  password: 'postgres',
  port: 5432,
  max: 50,
  idleTimeoutMillis: 30000,
}

const pool = new pg.Pool(config)

function findMarks({x0, x1, y0, y1}) {
  return pool.query('select * from marks where box(point($1,$2), point($3,$4)) @> marks.location',
          [x0, y0, x1, y1])
}

function createMark({id, x, y}) {
  return pool.query('insert into marks (id, account, time, location) values ($1, $2, $3, point($4,$5))',
          [id, 1, Date.now(), x, y])

}

module.exports = {
  findMarks,
  createMark,
}

