CREATE DATABASE pillbox_db;
USE pillbox_db;

DROP TABLE IF EXISTS patient;
DROP TABLE IF EXISTS schedule;

CREATE TABLE patient (
  uid Int(11) AUTO_INCREMENT NOT NULL,
  p_name VARCHAR(50) NOT NULL,
  pass_key VARCHAR(50) NOT NULL,
  PRIMARY KEY (uid));
  
 CREATE TABLE schedule (
  uid Int(11) NOT NULL,
  med_id VARCHAR(50) NOT NULL,
  med_name VARCHAR(80) NOT NULL,
  img_link VARCHAR(255),
  sched VARCHAR(50),
  dosage VARCHAR(255),
  notes VARCHAR(255),
  CONSTRAINT fk_patient FOREIGN KEY (uid)
  REFERENCES patient(uid)
  ON DELETE CASCADE); 

-- CREATE TABLE medicine (
--   med_id Int(11) NOT NULL,
--   description VARCHAR(255) NOT NULL,
--   img_link VARCHAR(255),
--   PRIMARY KEY (med_id));
  
--  CREATE TABLE schedule (
--   uid Int(11) NOT NULL,
--   med_id Int(11) NOT NULL,
--   sched VARCHAR(50),
--   dosage VARCHAR(255),
--   notes VARCHAR(255),
--   CONSTRAINT fk_patient FOREIGN KEY (uid)
--   REFERENCES patient(uid)
--   ON DELETE CASCADE,
--   CONSTRAINT fk_medicine FOREIGN KEY (med_id)
--   REFERENCES medicine(med_id)); 