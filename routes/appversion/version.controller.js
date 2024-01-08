const db = require('../../config/connection');
const version = db.version;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");


const getversion = async (req, res) => {
    await version.findAll({
        attributes: {
        },
    }).then(data => {
            res.send(data[0]);
        })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        })
}

const addversion = async (req, res) => {
    try {
        await version.create({
            status:req.body.status,
        version:req.body.version,
        supportingVersion:req.body.supportingVersion,
        supportNumber:req.body.supportNumber,
        });
        res.send({
            response: "success"
            , message: " version added successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}
const updateversion = async (req, res) => {
    try {
        await version.update({
            status:req.body.status,
            version:req.body.version,
            supportingVersion:req.body.supportingVersion,
            supportNumber:req.body.supportNumber,
        },{where: {
            id: req.params.id
        }});
        res.send({
            response: "success"
            , message: " version updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}

const deleteversion = async (req, res) => {
    try {
        await version.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: "version deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}

module.exports = {
    getversion,updateversion,
    addversion,
    deleteversion,
}