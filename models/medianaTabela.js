module.exports = (sequelize, DataTypes) => {
    const Tabela = sequelize.define('mediana_tabela', {
      CREATED_AT: {
        type: DataTypes.DATE,
        allowNull: false
      },
      MEDIANA: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      AVERAGE: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Tabela;
  };