module.exports = (sequelize,DataTypes)=>{
    Version = sequelize.define("version",{
        status:{type:DataTypes.STRING(15),allowNull:false},
        version:{type:DataTypes.STRING(15),allowNull:false},
        supportingVersion:{type:DataTypes.STRING(15),allowNull:false},
        supportNumber:{type:DataTypes.STRING(15),allowNull:false},
        });
   return Version;
   }