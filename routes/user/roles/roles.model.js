module.exports =  (sequelize,DataTypes)=>{
    role = sequelize.define("role",{
        id: {type: DataTypes.INTEGER,primaryKey: true,allowNull:false},
        name:{type:DataTypes.STRING,unique:'username',allowNull:false } 
        });
   return role;
   }