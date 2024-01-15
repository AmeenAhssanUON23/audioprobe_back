module.exports =  (sequelize,DataTypes)=>{
    availabilty = sequelize.define("availabilty",{
        day_of_week:{type: DataTypes.STRING(45),allowNull:false},
        start_time: {type:DataTypes.DATE,allowNull:false},
        end_time:{type:DataTypes.DATE,allowNull:false},  
        });
   return availabilty;
   }
