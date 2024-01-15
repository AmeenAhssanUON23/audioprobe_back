// const { Sequelize } = require('../../config/connection');
// const db = require('../../config/connection');
// const pg = require('../../utils/pagination');
// const servicerequest = db.serviceRequest;
// const call_handle = db.callHandle;
// const working_status = db.status;
// const client = db.clients;
// const equipment = db.equipments;
// const User = db.user;
// const Role = db.role;
// const ROLES = db.ROLES;
// const sales = db.sales;
// const priority = db.priority;
// const WorkingCondition = db.workingcondition;
// const { Op } = require("sequelize");





// const gettechnicianList = async (req, res) => {
//     const { page, size, title } = req.query;
//     const { limit, offset } = pg.getPagination(page, size);
//     await User.findAndCountAll({
//         attributes: {}, include: [
//             {
//                 model: Role,
//                 where: {
//                     id: 3
//                 }, attributes: ['name'],
//             },
//             {
//                 model: servicerequest,
//             },
//         ], where: null, limit, offset
//     })
//         .then(data => {
//             const response = pg.getPagingData(data, page, limit);
//             res.send(response);
//         })
//         .catch(err => {
//             res.send({
//                 response: "failed"
//                 , message: err.message
//             })
//         })
// }

// const getServiceRequestsList = async (req, res) => {
//     const { page, size, sid,sort } = req.query;
//     const { id } = req.params;
//     var filterbystatus = sid ? { statusId: { [Op.eq]: sid } } : null;
//     var order = sort ? [['createdAt', sort]] : null;
//     var filterbyid = id ? { id: { [Op.eq]: id } } : null;
//     const { limit, offset } = pg.getPagination(page, size);
//     console.log(req.query.sort);
//     await servicerequest.findAndCountAll({
//         attributes:{},
//         where: filterbystatus,
//         order:order,
//           include: [
//             {
//               model: sales,
//               include: [
//                 {
//                   model: client,
//                   include: [
//                     {
//                       model: city,
//                       attributes: {
//                         exclude: ['createdAt', 'updatedAt']
//                       },
//                     },
//                   ]
//                 },
//                 {
//                   model: equipment,
//                   attributes: ['id', 'equipmentName'],
//                 }
//               ]
//             },
//             {
//               model: User,
//               attributes: ["username","id"],
//               where: filterbyid,
//             },
//             {
//               model: call_handle,
//               attributes: ['callHandle']
//             },
//             {
//               model: working_status,
//               attributes: ['workingStatus']
//             },
//             {
//               model: priority,
//               attributes: ['priority']
//             },
//             {
//               model: WorkingCondition,
//               attributes: ['workingCondition']
//             },
//           ], 
//       limit, 
//       offset
//     })
//     .then(data => {
//       const response = pg.getPagingData(data, page, limit);
//       res.send(response);
//     })
//     .catch(err => {
//       res.send({
//         response: "failed",
//         message: err.message
//       });
//     });
//   }



// const getdashboard = async (req, res) => {
//     var opencount1;
//     var inprogresscount1;
//     var closedcount1;
//     var filterbyuser = { id: req.params.id };
//     var filterbystatus2 = { statusId: 2 };
//     var filterbystatus3 = { statusId: 3 };
//     try {
//         await servicerequest.findAll({
//             where: { statusId: 1 },
//             include: [
//                 {
//                     model: User,
//                     where: filterbyuser
//                 }]
//         }).then((result) => {
//             console.log(result);
//             opencount1 = result.length
//         });
//         await servicerequest.findAll({
//             where: { statusId: 2 },
//             include: [
//                 {
//                     model: User,
//                     where: filterbyuser
//                 }]
//         }).then((result2) => {
//             inprogresscount1 = result2.length
//         });
//         await servicerequest.findAll({
//             where: { statusId: 3 },
//             include: [
//                 {
//                     model: User,
//                     where: filterbyuser
//                 }]
//         }).then((result3) => {
//             closedcount1 = result3.length
//         });
//         res.status(200).send({ opencount: opencount1, inprogresscount: inprogresscount1, closedcount: closedcount1 });
//     } catch (error) {
//         res.send({ error: error });
//     }
// }


// const getServiceCount = async (req, res) => {
//     const { page, size, title } = req.query;
//     const { limit, offset } = pg.getPagination(page, size);
//     await User.findAndCountAll({
//         attributes: ['id', 'username'],
//         include: [
//             {
//                 model: servicerequest,
//             },
//         ], where: {
//             id: req.params.id,


//         }, limit, offset
//     })
//         .then(data => {
//             const response = pg.getPagingData(data, page, limit);
//             res.send(response);
//         })
//         .catch(err => {
//             res.send({
//                 response: "failed"
//                 , message: err.message
//             })
//         })
// }


// const updateServiceReq = async (req, res) => {
//     if (req.files['document1'] != null) {
//         var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document1'][0].filename}`;
//     }
//     if (req.files['document2'] != null) {
//         var file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document2'][0].filename}`;
//     }
//     if (req.files['document3'] != null) {
//         var file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document3'][0].filename}`;
//     }
//     try {
//         await servicerequest.update({
//             saleId: req.body.saleId,
//             statusId: req.body.statusId,
//             document1: file,
//             document2: file2,
//             document3: file3,
//             attendedOn: req.body.attendedOn,
//             completedOn: req.body.completedOn
//         }, {
//             where: { id: req.params.id }
//         }
//         )
//         res.send({ response: "success", message: "Service Request has been updated.." });
//     } catch (error) {
//         console.log(error);
//         return res.send({ response: "failed", message: error.message });
//     }
// };

// module.exports = {
//     gettechnicianList,
//     getServiceRequestsList,
//     getServiceCount,
//     updateServiceReq,
//     getdashboard
// };