const db = require('../../config/connection');
const version = db.version;


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

const updateversion = async (req, res) => {
    try {
        await version.update({
            status:req.body.status,
            version:req.body.version,
            supportingVersion:req.body.supportingVersion,
            supportNumber:req.body.supportNumber,
        },{
            where: {
            id: req.params.id
        }
    });
        res.send({
            response: "success"
            , message: " version data updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


module.exports = {
    getversion,updateversion
}