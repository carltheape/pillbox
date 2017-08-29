module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    // Giving the Patient model a name of type STRING
    name: DataTypes.STRING
  });

  Patient.associate = function(models) {
    // Associating Patient with Schedule
    // When an Patient is deleted, also delete any associated Schedules
    Patient.hasMany(models.Schedule, {
      onDelete: "cascade"
    });
  };

  return Patient;
};
