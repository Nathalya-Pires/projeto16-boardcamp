import { db } from "../database/database.js";

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
  
    try {
      const insertGames = await db.query(
        `INSERT INTO rentals ("customerId", "gameId", "daysRented") VALUES ($1, $2, $3);`,
        [customerId, gameId, daysRented ]
      );
  
      console.log(insertGames.rows);
  
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }