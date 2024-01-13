const db = require('../../config/connection');
const appointments = db.appointments;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addAppointments = async (req, res) => {
    try {
        await appointments.create({
            review: req.body.review,
            clientId: req.body.clientId,
            userId: req.body.userId,
        });
        res.send({
            response: "success"
            , message: "Appointments added successfully.."
        });
    } catch (error) {
        console.log(error)
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const updateAppointments = async (req, res) => {
    try {
        await appointments.update(
            {
                review: req.body.review,
                clientId: req.body.clientId,
                userId: req.body.userId,
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
    const { page, size, startdte, enddte } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    var filterbydate = startdte ? { createdAt: { [Op.between]: [startdte, enddte] } } : null;
    await appointments.findAndCountAll({
        where: filterbydate,
        limit, offset
    })
        .then(data => {
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


module.exports = {
    addAppointments, getAllAppointments, updateAppointments, deleteAppointments
}
