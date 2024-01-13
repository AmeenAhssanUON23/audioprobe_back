const db = require('../../config/connection');
const analysis = db.analysis;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addAnalysis = async (req, res) => {
    try {
        await analysis.create({
            analysis_data: req.body.analysis_data,
            comments:req.body.comments,
            clientId: req.body.clientId
        });
        res.send({
            response: "success"
            , message: "Analysis Report added successfully.."
        });
    } catch (error) {
        console.log(error)
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const updateAnalysis = async (req, res) => {
    try {
        await analysis.update(
            {
                comments:req.body.comments,
                clientId: req.body.clientId,
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "Analysis updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}
const getAllanalysis = async (req, res) => {
    const {page, size, name} = req.query;
    var filterbyname = name  ? { name: { [Op.like]: `%${name}%` } } : null;
    var filterbyid =  name ? { id: { [Op.eq]: name } } : null;
    var condition = name ? { [Op.or]: [
        filterbyname,filterbyid
    ]} :null;
    const { limit, offset } = pg.getPagination(page, size);
    await analysis.findAndCountAll({
        where:condition,
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

const deleteAnalysis = async (req, res) => {
    try {
        const result = await analysis.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "analysis does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "analysis deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}



const testAudio = async (req, res) => {
    const praatScriptPath = __basedir + "/praat_scripts/test9.praat";
    // const audioFilePath = `${req.protocol}://${req.get('host')}/uploads/assets/audios/${req.file.filename}`;
    const audioFilePath = __basedir + `/uploads/assets/audios/`;
    // const textGridFilePath = "";
    // const outputFilePath = "";
    try {
    console.log(`${audioFilePath}`);
    // const command = `praat --run ${praatScriptPath} ${audioFilePath} ${textGridFilePath} ${outputFilePath}`; 
    const command = `praat --run ${praatScriptPath} ${audioFilePath}`; 

    if (req.file == undefined) {
        return res.send({ response: "failed", message: "You must select an Audio file" });
      }else{
        console.log("Audio executing---");
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Praat command: ${error.message}`);
            res.status(500).send({ response: "failed", message:'Error executing Praat command'});
            return;
        }
        if (stderr) {
            console.error(`Praat command stderr: ${stderr}`);
            res.status(500).send({ response: "failed", message:'Praat command encountered an error'});
            return;
        }
        const parsedOutput = JSON.parse(stdout);
        res.send({ response: "Success",data:parsedOutput});
    });
}
} catch (error) {
        console.log(error);
}}

module.exports = {
    addAnalysis,getAllanalysis,updateAnalysis,deleteAnalysis,testAudio
}
