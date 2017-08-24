INSERT INTO patient (p_name, pass_key) 
VALUES ('Tyler', 'lettylerin'), 
('Richard', 'letrichardin'), 
('Caitlin', 'letcaitlinin'), 
('Florian', 'letflorianin');

INSERT INTO schedule (uid, med_id, med_name, img_link, sched, dosage, notes)
VALUES
(1, 'TYL01', 'Tylenol', 'https://www.drugs.com/images/pills/nlm/200001336.jpg', 'AM, PM', '1 Tablet', 'Adults and teenagers who weigh at least 110 pounds should not take more than 1000 milligrams (mg) at one time, or more than 4000 mg in 24 hours.' ),
(1, 'ALE01', 'Aleve', 'https://www.drugs.com/images/pills/fio/AA054200.JPG', 'PM', '1 Tablet', 'You should not use Aleve if you have a history of allergic reaction to aspirin' ),
(2, 'ASP01', 'Aspirin', 'https://www.drugs.com/images/pills/custom/pill12891-1/aspirin-delayed-release.jpg', 'AM, PM', '1 Tablet', 'Take with food if aspirin upsets your stomach.' ),
(3, 'ASP01', 'Aspirin', 'https://www.drugs.com/images/pills/custom/pill12891-1/aspirin-delayed-release.jpg', 'Evening', '2 Tablets', 'Take with food if aspirin upsets your stomach.  Persoal Note added.' )
