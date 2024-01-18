module.exports =  (sequelize,DataTypes)=>{
    availabilty = sequelize.define("availabilty",{
        date:{type: DataTypes.DATE,allowNull:false},
        slots: {type:DataTypes.INTEGER(3),allowNull:false},
        availableSlots:{type:DataTypes.INTEGER(3),allowNull:false},
        });
   return availabilty;
   }
