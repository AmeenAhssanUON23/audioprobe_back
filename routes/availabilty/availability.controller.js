const db = require('../../config/connection');
const availability = db.availabilty;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addAvailability = async (req, res) => {
    try {
        const existingAvailability = await availability.findOne({
            where: {
                userId: req.body.userId,
                start_time: {
                    [Op.between]: [
                        new Date(req.body.starttime),
                        new Date(req.body.endtime).setHours(23, 59, 59, 999), // Set end of the day
                    ],
                },
            },
        });

        if (existingAvailability) {
            res.send({
                response: "failed",
                message: "Availability already added on this day.",
            });
            return;
        }
        await availability.create({
            day_of_week: req.body.day,
            start_time: req.body.starttime,
            end_time: req.body.endtime,
            userId: req.body.userId
        });
        res.send({
            response: "success",
            message: "Availability added successfully.",
        });
    } catch (error) {
        console.log(error);
        res.send({
            response: "failed",
            message: error.message,
        });
    }
};



const updateAvailability = async (req, res) => {
    try {
        await availability.update(
            {
                day_of_week: req.body.day,
                start_time: req.body.starttime,
                end_time: req.body.endtime,
                userId: req.body.userId
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "Availability updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const getAllAvailability = async (req, res) => {
    const { page, size, startdte, enddte, month, year } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    var filterbydate;
    if (month && year) {
        filterbydate = {
            start_time: {
                [Op.between]: [firstDayOfMonth, lastDayOfMonth],
            },
        };
    } else if (startdte && enddte) {
        filterbydate = {
            start_time: {
                [Op.between]: [startdte, enddte],
            },
        };
    } else {
        filterbydate = null;
    }
    await availability.findAndCountAll({
        where: filterbydate,
        limit,
        offset,
    }).then(data => {
        const response = pg.getPagingData(data, page, limit);
        res.send(response);
    })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        })
}

const deleteAvailability = async (req, res) => {
    try {
        const result = await availability.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "Availability does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "Availability deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}

module.exports = {
    addAvailability, updateAvailability, getAllAvailability, deleteAvailability
}