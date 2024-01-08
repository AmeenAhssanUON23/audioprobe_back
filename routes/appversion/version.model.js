module.exports = (sequelize,DataTypes)=>{
    Version = sequelize.define("version",{
        status:{type:DataTypes.STRING,allowNull:false},
        version:{type:DataTypes.STRING,allowNull:false},
        supportingVersion:{type:DataTypes.STRING,allowNull:false},
        supportNumber:{type:DataTypes.STRING,allowNull:false},
        });
   return Version;
   }