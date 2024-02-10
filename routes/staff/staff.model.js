module.exports = (sequelize,DataTypes)=>{
 Staff = sequelize.define("staff",{
    username:{type: DataTypes.STRING(50),unique:'username',allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},   
 });
return Staff;
}

