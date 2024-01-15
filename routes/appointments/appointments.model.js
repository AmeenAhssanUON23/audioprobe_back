module.exports =  (sequelize,DataTypes)=>{
    appointments = sequelize.define("appointment",{
        review:{type:DataTypes.STRING,allowNull:true},
        bookingTime:{type:DataTypes.DATE,allowNull:true},
        });
   return appointments;
   }