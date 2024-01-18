const db = require('../../config/connection');
const appointments = db.appointments;
const dbavailability = db.availabilty;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addAppointments = async (req, res) => {
    try {
        const existingAppointment = await appointments.findOne({
            where: {
                clientId: req.body.clientId,
                bookingTime: {
                    [Op.between]: [
                        new Date(req.body.bookingTime),
                        new Date(req.body.bookingTime).setHours(23, 59, 59, 999), // Set end of the day
                    ],
                },
            },
        });

        if (existingAppointment) {
            res.send({
                response: "failed",
                message: "Client already has an appointment on this day.",
            });
            return;
        }
        const availability = await dbavailability.findOne({
            where: {
                userId: req.body.userId,
                date: new Date(req.body.bookingTime).toDateString(),
            },
        });

        if (!availability || availability.availableSlots <= 0) {
            res.send({
                response: "failed",
                message: "No available slots for the specified day.",
            });
            return;
        }

        await dbavailability.update({
            availableSlots: availability.availableSlots - 1,
        });

        // Create a new appointment
        await appointments.create({
            review: req.body.review,
            clientId: req.body.clientId,
            userId: req.body.userId,
            bookingTime: req.body.bookingTime,
        });

        res.send({
            response: "success",
            message: "Appointment added successfully.",
        });
    } catch (error) {
        console.log(error);
        res.send({
            response: "failed",
            message: error.message,
        });
    }
};




const updateAppointments = async (req, res) => {
    try {
        await appointments.update(
            {
                review: req.body.review,
                clientId: req.body.clientId,
                userId: req.body.userId,
                bookingTime: req.body.bookingTime
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "Appointments updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const getAllAppointments = async (req, res) => {
    const { page, size, startdte, enddte, month, year } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    var filterbydate;
    if (month && year) {
        filterbydate = {
            bookingTime: {
                [Op.between]: [firstDayOfMonth, lastDayOfMonth],
            },
        };
    } else if (startdte && enddte) {
        filterbydate = {
            bookingTime: {
                [Op.between]: [startdte, enddte],
            },
        };
    } else {
        filterbydate = null;
    }
    await appointments.findAndCountAll({
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

const deleteAppointments = async (req, res) => {
    try {
        const result = await appointments.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "Appointments does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "Appointments deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}


const getdashboard = async (req, res) => {
    var datenow = new Date();
    datenow.setHours(0, 0, 0, 0);
    try {
        await appointments.findAll({
            where: {   bookingTime: {
                [Op.between]: [datenow,new Date(datenow.getTime() + 24 * 60 * 60 * 1000)],
            }}
        }).then((result) => {
            res.status(200).send({
                response: "success",
                appointments_today: result.length });
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}

module.exports = {
    addAppointments, getAllAppointments, updateAppointments, deleteAppointments,getdashboard
}
