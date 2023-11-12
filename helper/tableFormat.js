const { table } = require('table');

const data = [
        {
          id: 1,
          first_name: 'Matt',
          last_name: 'Damon',
          title: 'CEO',
          salary: '2000000',
          department: 'Executives',
          manager: null
        },
        {
          id: 2,
          first_name: 'Will',
          last_name: 'Smith',
          title: 'Operations Analyst',
          salary: '90000',
          department: 'Operations',
          manager: null
        },
        {
          id: 3,
          first_name: 'Johnny',
          last_name: 'Depp',
          title: 'Lead Engineer',
          salary: '130000',
          department: 'Production',
          manager: null
        },
        {
          id: 4,
          first_name: 'Dwayne',
          last_name: 'Johnson',
          title: 'Account Manager',
          salary: '110000',
          department: 'Sales',
          manager: null
        },
        {
          id: 5,
          first_name: 'Cameron',
          last_name: 'Diaz',
          title: 'Marketing Manager',
          salary: '140000',
          department: 'Marketing',
          manager: null
        },
        {
          id: 6,
          first_name: 'Kim',
          last_name: 'Kardashian',
          title: 'Head of HR',
          salary: '150000',
          department: 'HR',
          manager: 'Matt Damon'
        },
        {
          id: 7,
          first_name: 'Vin',
          last_name: 'Diesel',
          title: 'Engineer',
          salary: '120000',
          department: 'Production',
          manager: 'Will Smith'
        },
        {
          id: 8,
          first_name: 'Anne',
          last_name: 'Hathaway',
          title: 'Workforce coordinator',
          salary: '80000',
          department: 'HR',
          manager: 'Kim Kardashian'
        }
  ];
  
  const config = {
    border: {
      topBody: `─`,
      topJoin: `┬`,
      topLeft: `┌`,
      topRight: `┐`,
  
      bottomBody: `─`,
      bottomJoin: `┴`,
      bottomLeft: `└`,
      bottomRight: `┘`,
  
      bodyLeft: `│`,
      bodyRight: `│`,
      bodyJoin: `│`,
  
      joinBody: `─`,
      joinLeft: `├`,
      joinRight: `┤`,
      joinJoin: `┼`
    }
  };
  
  console.log(table(data, config));