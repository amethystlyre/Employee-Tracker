INSERT INTO department (name)
VALUES ("Marketing"),
       ("Operations"),
       ("Sales"),
       ("Production"),
       ("HR"),
       ("Executives");

INSERT INTO role (title, salary,department_id )
VALUES ("Marketing Manager", 140000, 1),
       ("Data Analyst", 90000, 1),
       ("Operations Analyst", 90000, 2),
       ("Operations Manager", 130000, 2),
       ("Account Manager", 110000, 3),
       ("Sales Director", 180000, 3),
       ("Engineer", 120000, 4),
       ("Engineer Team Lead", 130000, 4),
       ("Workforce coordinator", 80000, 5),
       ("Head of HR", 150000, 5),
       ("CEO",2000000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Damon", 11,NULL),
       ("Cameron", "Diaz", 1,1),
       ("Will", "Smith", 2,2),
       ("Johnny", "Depp", 8,1),
       ("Dwayne", "Johnson", 3,1),
       ("Kim", "Kardashian", 6,1),
       ("Vin", "Diesel", 7,4),
       ("Brad", "Pitt", 7,4),
       ("Anne", "Hathaway", 5,5);