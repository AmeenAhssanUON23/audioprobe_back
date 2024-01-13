module.exports =  (sequelize,DataTypes)=>{
    clients = sequelize.define("clients",{
        firstName:{type: DataTypes.STRING(45),allowNull:false},
        lastName: {type:DataTypes.STRING(45),allowNull:false},
        gender:{type:DataTypes.STRING(10),allowNull:false},   
        age:{type: DataTypes.INTEGER(3),allowNull:false},
        mobile:{type:DataTypes.STRING(15),unique:'mobile',allowNull:false},
        address:{type:DataTypes.STRING,allowNull:false}
        });
   return clients;
   }