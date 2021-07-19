const express = require('express');
const router = express.Router();
const { secret } = require('./jwt_secret.json');
const jwt = require('jsonwebtoken');
const { UserList, cabs, locationLookup } = require('./models');
const {
  QueryTypes
} = require('sequelize');
const db = require('./models');

module.exports = router;

/**
 * @swagger
 * /login:
 *  post:
 *    description: Use to login
 *    parameters:
 *      - name: username
 *        in: body
 *        description: Name of our customer
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: Password
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', async (req, res, next) => {
  try {
    const users = await UserList.findOne({
      attributes: ['userId'],
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    if (users) {
      const token = jwt.sign({ sub: users.userId }, secret);
      res.send({ 'token': token });
    } else { throw 'Invalid login' }
  }
  catch (e) {
    next(e)
  }
});

/**
 * @swagger
 * /request_booking:
 *  post:
 *    description: Use to request a new ride
 *    parameters:
 *      - name: source
 *        in: body
 *        description: From where the journey starts
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: destination
 *        in: body
 *        description: where the journey ends
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/request_booking', async function (req, res, next) {
  try {
    const { source, destination } = req.body
    const getCabs = await cabs.findAll({
      attributes: ['manufacturer', 'model'],
      where: {
        currentAreaCode: source,
        onDuty: true
      }
    })
    if (getCabs) {
      res.send(getCabs)
    } else throw 'No cab is available'
  }
  catch (e) {
    next(e)
  }
});

/**
 * @swagger
 * /get_nearby_cabs:
 *  post:
 *    description: Use to get all nearby cabs. Pagination enabled. 
 *    parameters:
 *      - name: limit
 *        in: param
 *        description: How many cabs per page
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: page
 *        in: param
 *        description: which page
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/get_nearby_cabs', async function (req, res, next) {
  try {
    const { sub: userId } = req.user
    const userList = await UserList.findOne({
      attributes: ['currentAreaCode'],
      where: {
        userId: userId
      }
    })
    if (userList) {

      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)

      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      const {rows, count} = await cabs.findAndCountAll({
        attributes: ['manufacturer', 'model'],
        where: {
          currentAreaCode: userList.currentAreaCode,
          onDuty: true
        },
        offset: page,
        limit: limit
      })

      if (endIndex < count) {
        rows.next = {
          page: page + 1,
          limit: limit
        }
      }

      if (startIndex > 0) {
        rows.previous = {
          page: page - 1,
          limit: limit
        }
      }

      paginatedResults = rows
      res.send(paginatedResults)
    } else throw 'No bookings available'
  }
  catch (e) {
    next(e)
  }
});


/**
 * @swagger
 * /view_prev_booking:
 *  post:
 *    description: Use to view all previous bookings. 
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/view_prev_booking', async function (req, res, next) {
  try {
    const { sub: userId } = req.user
    const query = `SELECT bookings.userId, b.location as destination, c.location as source FROM bookings 
    LEFT JOIN locationlookups b ON bookings.destinationAreaCode = b.areaCode
    LEFT JOIN locationlookups c ON bookings.sourceAreaCode = c.areaCode
    WHERE userId = ${userId}`
    const bookings = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    res.send(bookings)
  }
  catch (e) {
    next(e)
  }
});