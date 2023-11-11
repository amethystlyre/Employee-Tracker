INSERT INTO department (name)
VALUES ("Marketing"),
       ("Operations"),
       ("Sales"),
       ("Production"),
       ("HR"),
       ("Executives");

INSERT INTO role (title, salary,department_id )
VALUES ("Marketing Manager", 140000, 1),
       ("Operations Analyst", 90000, 2),
       ("Account Manager", 110000, 3),
       ("Engineer", 120000, 4),
       ("Lead Engineer", 130000, 4),
       ("Workforce coordinator", 80000, 5),
       ("Head of HR", 150000, 5),
       ("CEO",2000000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Damon", 8,NULL),
       ("Will", "Smith", 2,NULL),
       ("Johnny", "Depp", 5,NULL),
       ("Dwayne", "Johnson", 3,NULL),
       ("Cameron", "Diaz", 1,NULL),
       ("Kim", "Kardashian", 7,1),
       ("Vin", "Diesel", 4,2),
       ("Anne", "Hathaway", 6,6);