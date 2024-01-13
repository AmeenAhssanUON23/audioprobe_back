module.exports =  (sequelize,DataTypes)=>{
    analysis = sequelize.define("analysis",{
        analysis_data:{type: DataTypes.JSON,allowNull:false},
        comments:{type: DataTypes.STRING,allowNull:false},
        });
   return analysis;
   }