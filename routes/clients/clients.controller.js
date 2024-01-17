const db = require('../../config/connection');
const clients = db.clients;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addClients = async (req, res) => {
    try {
        await clients.create({
            firstName: req.body.firstName,
            lastName: req.body.lastname,
            gender: req.body.gender,
            age: req.body.age,
            mobile: req.body.mobile,
            address: req.body.address,
            userId:req.body.userId
        });
        res.send({
            response: "success"
            , message: "client added successfully.."
        });
    } catch (error) {
        console.log(error)
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const updateClients = async (req, res) => {
    try {
        await clients.update(
            {
            firstName: req.body.firstName,
            lastName: req.body.lastname,
            gender: req.body.gender,
            age: req.body.age,
            mobile: req.body.mobile,
            address: req.body.address,
            userId:req.body.userId
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "client updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const getAllClients = async (req, res) => {
    const {page, size, name} = req.query;
    var filterbyname = name  ? { name: { [Op.like]: `%${name}%` } } : null;
    var filterbyid =  name ? { id: { [Op.eq]: name } } : null;
    var condition = name ? { [Op.or]: [
        filterbyname,filterbyid
    ]} :null;
    const { limit, offset } = pg.getPagination(page, size);
    await clients.findAndCountAll({
        where:condition,
        attributes: {
            exclude: ['createdAt']
        },
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

const deleteClient = async (req, res) => {
    try {
        const result = await clients.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "client does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "client deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}


module.exports = {
    addClients,getAllClients,updateClients,deleteClient
}
