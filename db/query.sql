-- View all employees

SELECT * FROM employee;


SELECT Team_Member.id,Team_Member.first_name, Team_Member.last_name, 
role.title, role.salary, 
department.name AS department, 
concat(Manager.first_name,' ', Manager.last_name) AS manager 
FROM employee AS Team_Member 
LEFT JOIN role ON Team_Member.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee AS Manager ON Team_Member.manager_id = Manager.id;

-- View employees by department

SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name AS department
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department_id = 2;

-- View employees by manager

SELECT Team_Member.first_name,Team_Member.last_name, concat(Manager.first_name,' ', Manager.last_name) AS Manager
FROM employee AS Team_Member
LEFT JOIN employee AS Manager ON Team_Member.manager_id = Manager.id
WHERE Team_Member.manager_id = 1;

-- View all departments
SELECT *
FROM department;

-- View all department budget
SELECT department.name As Department,SUM(role.salary) AS 'Budget utilized'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department.id = 3;


-- View all roles

SELECT role.title, department.name, role.salary
FROM role
LEFT JOIN department ON role.department_id = department.id;

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
WHERE employee.id = ;

-- Delete role

DELETE
FROM role
WHERE role.id = ;

-- Delete department

DELETE
FROM department
WHERE department.id = ;


