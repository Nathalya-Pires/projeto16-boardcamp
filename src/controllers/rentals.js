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

export async function rentReturn(req, res) {
  const { id } = req.params;
  let updateDate = dayjs().format("YYYY-MM-DD");

  try {
    const devolution = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      id,
    ]);

    if (devolution.rows[0].returnDate !== null) return res.sendStatus(400);

    let cost = devolution.rows[0].originalPrice / devolution.rows[0].daysRented;
    let returnDate = updateDate;
    let difference = dayjs(returnDate).diff(
      devolution.rows[0].rentDate,
      "days"
    );
    let delayFee =
      difference <= devolution.rows[0].daysRented
        ? 0
        : (difference - devolution.rows[0].daysRented) * cost;

    const consultId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      id,
    ]);

    if (consultId.rowCount === 0) return res.sendStatus(404);

    await db.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const rentalId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [
      id,
    ]);

    if (rentalId.rowCount === 0) return res.sendStatus(404);

    if (rentalId.rows[0].returnDate === null) return res.sendStatus(400);

    await db.query(`DELETE FROM rentals WHERE id = $1`, [id]);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
