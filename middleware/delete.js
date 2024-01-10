import { unlink, unlinkSync } from "fs";
const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/assets/audios/";
  unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/assets/audios/";
  try {
    unlinkSync(directoryPath + fileName);
    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};
export default {
  remove,
  removeSync,
};