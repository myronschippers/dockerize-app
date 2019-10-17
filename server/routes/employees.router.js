const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "employees";`;

    pool.query(queryText)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            res.status(500);
            res.send({ error_message: err });
        });
});

/**
 * Adding a new employee to the employees table.
 * 
 * expecting object to be sent on the body:
 * {
 *     name: string,
 *     employee_number: string, // not required, will be generated on the back-end
 *     annual_salary: number,
 *     review_rating: number, // not required, default of 0
 * }
 */
router.post('/', (req, res) => {
    const newEmployee = req.body;
    const queryText = `INSERT INTO "employees" ("name", "employee_number", "annual_salary", "review_rating")
                        VALUES ($1, $2, $3, $4)
                        RETURNING id;`;
    const newEmpName = newEmployee.name;
    const newEmpNumber = newEmployee.employee_number;
    const newEmpSalary = newEmployee.annual_salary;
    const newEmpRating = newEmployee.review_rating;

    pool.query(queryText, [newEmpName, newEmpNumber, newEmpSalary, newEmpRating])
        .then((successResp) => {
            // with RETURNING id the created item is returned on the rows property
            // as a single item in an array with the id property in the object
            console.log('successResp: ', successResp);
            const postedEmployee = successResp.rows[0]; 
            const employeeId = postedEmployee.id;
            res.status(201);
            res.send({
                id: null,
                name: newEmpName,
                employee_number: newEmpNumber,
                annual_salary: newEmpSalary,
                review_rating: newEmpRating,
            });
        })
        .catch((failResp) => {
            console.log('failResp: ', failResp);
            res.status(500);
            res.send({
                errorMessage: 'An error has occurred',
                failure: failResp,
            })
        });
});

router.put('/edit/:id', (req, res) => {
    const employeeId = req.params.id;
    const employeeData = req.body;
    const {
        name,
        employee_number,
        annual_salary,
        review_rating,
    } = employeeData;
    const queryText = `UPDATE "employees" SET name = $1,
                        employee_number = $2,
                        annual_salary = $3,
                        review_rating = $4
                        WHERE id = $5;`;

    pool.query(queryText, [ name, employee_number, annual_salary, review_rating, employeeId])
        .then((successResp) => {
            console.log(successResp);
            res.sendStatus(200);
        })
        .catch((failResponse) => {
            res.status(500);
            res.send({
                errorMessage: `An error occurred while updating the employee information for ${name}`,
                error: failResponse.error,
                resp: failResponse,
            });
        });
});

module.exports = router;
