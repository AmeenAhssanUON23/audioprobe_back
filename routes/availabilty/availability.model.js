module.exports =  (sequelize,DataTypes)=>{
    availabilty = sequelize.define("availabilty",{
        date:{type: DataTypes.DATE,allowNull:false},
        slots: {type:DataTypes.STRING(45),allowNull:false},
        });
   return availabilty;
   }
