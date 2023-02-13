import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function listRentals(req, res) {
  try {
    const rentals = await db.query(
      /*  `SELECT rentals.* 'customer', json_build_object('id', customers.id, 'name', customers.name) 'game' json_build_object ('id', games.id, 'name', games.name ) FROM rentals 
      JOIN customers
      ON "customerId" = customers.id
      JOIN games
      ON "gameId" = games.id;` */

      `SELECT json_build_object(rentals.*, 'customer', json_build_object( 'id', customers.id, 'name', customers.name, 'game', json_build_object('id', games.id, 'name', games.name))) FROM rentals 
      JOIN customers
      ON "customerId" = customers.id
      JOIN games
      ON "gameId" = games.id;`
    );

    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  let dateSave = dayjs().format("YYYY-MM-DD");

  try {
    const customerOk = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      customerId,
    ]);

    if (!customerOk) return res.sendStatus(400);

    const gameOk = await db.query(`SELECT * FROM games WHERE id = $1`, [
      gameId,
    ]);

    if (!gameOk) return res.sendStatus(400);

    let rentDate = dateSave;
    let originalPrice = Number(daysRented) * gameOk.rows[0].pricePerDay;

    const insertGames = await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1,$2,$3,$4,$5,$6,$7);`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null ]
    );

    console.log(insertGames.rows);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
