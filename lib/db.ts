import Database from 'better-sqlite3'

const db = new Database('database.db')

db.exec(`
CREATE TABLE IF NOT EXISTS products (
id TEXT PRIMARY KEY,
name TEXT,
price INTEGER,
stock INTEGER,
img TEXT,
category TEXT,
tag TEXT,
description TEXT
)
`)

export default db