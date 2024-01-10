const db = require('../../config/connection');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const cache = require('../../utils/cache');
// const jwtConfig = require('../../config/jwt');
const jwt = require('../../utils/jwt');
// const User = db.user;
const pg = require('../../utils/pagination');
const { exec } = require('child_process');
const { extname } = require('path');


const testAudio = async (req, res) => {
    const praatScriptPath = __basedir + "/praat_scripts/pitch_average.praat";
    const audioFilePath = `${req.protocol}://${req.get('host')}/uploads/assets/audios/${req.file.filename}`;
    const textGridFilePath = "";
    const outputFilePath = "";
    try {
    console.log(`${audioFilePath}`);
    const command = `praat --run ${praatScriptPath} ${audioFilePath} ${textGridFilePath} ${outputFilePath}`; 
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
}
 }


module.exports = {
    testAudio
}