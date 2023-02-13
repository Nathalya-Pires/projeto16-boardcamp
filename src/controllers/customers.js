import { db } from "../database/database.js";

export async function listCustomers(req, res) {
  try {
    const customers = await db.query(`SELECT * FROM customers;`);

    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function listCustomersId(req, res) {
    const {id} = req.params;
   

    try {
      
      const customersId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
      
      res.send(customersId.rows[0]);
    } catch (error) {
      
      res.status(500).send(error.message);
    }
  }

export async function addCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const insertCustomer = await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    console.log(insertCustomer);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCustomer(req, res) {
    const {id} = req.params;
    const { name, phone, cpf, birthday } = req.body;
  
    try {
      const updateCustomer = await db.query(
        `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`,[name, phone, cpf, birthday, id]
        
      );
  
      console.log(updateCustomer);
  
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
