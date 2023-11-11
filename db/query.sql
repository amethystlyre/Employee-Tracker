-- View all employees

SELECT * FROM employee;

-- View employees by department

SELECT *
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department_id = 2;

-- View employees by manager

SELECT *
FROM employee AS Team_Member
LEFT JOIN employee AS Manager ON Team_Member.manager_id = Manager.id
WHERE Manager.id = 1;

-- View all departments
SELECT *
FROM department;

-- View all department budget
SELECT department.name,SUM(role.salary)
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
GROUP BY department.name;


-- View all roles

SELECT *
FROM role;

-- Add new employee

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("New", "Employee", Null, Null);

-- Add new department

INSERT INTO department (name)
VALUES ("New Department");

-- Add new roles
INSERT INTO role (title, salary,department_id )
VALUES ("New role", 140000, 1);

-- Update employee details
UPDATE employee
SET first_name = "Matt", 
    last_name = "Damon",
    role_id = "8",
    manager_id = NULL
WHERE employee.id = 1;

-- Delete employee

DELETE
FROM employee
WHERE first_name = "New";

-- Delete role

DELETE
FROM role
WHERE title = "New role";

-- Delete department

DELETE
FROM department
WHERE name = "New Department";

