module.exports =  (sequelize,DataTypes)=>{
    user = sequelize.define("user",{
        username:{type: DataTypes.STRING(30),unique:'username',allowNull:false},
        fullname: {type:DataTypes.STRING(30),allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false},   
        email:{type: DataTypes.STRING(40),unique:'email',allowNull:false},
        mobile:{type:DataTypes.STRING(12),unique:'mobile',allowNull:false},
        });
   return user;
   }