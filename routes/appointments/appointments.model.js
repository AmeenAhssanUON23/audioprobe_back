module.exports =  (sequelize,DataTypes)=>{
    appointments = sequelize.define("appointment",{
        review:{type:DataTypes.STRING,allowNull:true},
        });
   return appointments;
   }