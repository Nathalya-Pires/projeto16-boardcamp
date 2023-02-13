import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function listRentals(req, res) {
  try {
    const rentals = await db.query(
      `SELECT rentals.*, json_build_object('id', customers.id, 'name', customers.name) AS customer, json_build_object ('id', games.id, 'name', games.name ) AS GAME FROM rentals 
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
    
    if (customerOk.rowCount === 0) return res.sendStatus(400);
    
    const gameOk = await db.query(`SELECT * FROM games WHERE id = $1`, [
      gameId,
    ]);

    if (gameOk.rowCount === 0) return res.sendStatus(400);
    
    const rentedOk = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [gameId]
    );

    if (rentedOk.rowCount === gameOk.rows[0].stockTotal)
      return res.sendStatus(400);
    
    if (daysRented <= 0) return res.sendStatus(400);
    
    let rentDate = dateSave;
    let originalPrice = Number(daysRented) * gameOk.rows[0].pricePerDay;
    let returnDate = null;
    let delayFee = null;
    
    const insertGames = await db.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee" ) VALUES ($1,$2,$3,$4,$5,$6,$7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
   
    console.log(insertGames.rows);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
