module.exports = function(sequelize, DataTypes) {
  var Schedule = sequelize.define("Schedule", {
    img_link: {
      type: DataTypes.STRING
    },
    med_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }      
    },
    sched: {
      type: DataTypes.STRING
    },
    dosage: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    } //or can be set to text (for unlimited character length)
  });
  Schedule.associate = function(models) {
    // We're saying that a Schedule should belong to an Patient
    // A Schedule can't be created without an Patient due to the foreign key constraint
    Schedule.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Schedule;
};
