use [SD32-Company]

select * from Works_on

-- Create a new user data type named loc with the following Criteria:
-- nchar(2)
-- default:NY 
-- create a rule for this Datatype :values in (NY,DS,KW)) and associate it to the location column  

create rule r1 as @x in ('NY', 'DS', 'KW')
create default default1 as 'NY'
sp_addtype loc, 'nchar(2)'
sp_bindrule r1, loc
sp_bindefault default1, loc

create table Department
(
 DeptNo varchar(2) primary key,
 DeptName varchar(20),
 Location loc,
)
insert into Department values('d1', 'Research', 'NY')
insert into Department values('d2', 'Accounting', 'DS')
insert into Department values('d3', 'Markiting', 'KW')

-- PK constraint on EmpNo
-- FK constraint on DeptNo
-- Unique constraint on Salary
-- EmpFname, EmpLname don’t accept null values
-- Create a rule on Salary column to ensure that it is less than 6000 

create table Employee
(
 EmpNo int primary key,
 EmpFname varchar(20) Not NULL,
 EmpLname varchar(20) Not NULL,
 DeptNo varchar(2),
 Salary int,
 constraint c1 foreign key(DeptNo) references Department(DeptNo) 
		on delete set null 	on update cascade,
 constraint c2 unique(Salary),
)
create rule r2 as @x<6000
sp_bindrule r2, 'Employee.Salary'

insert into Employee values('25348', 'Mathew', 'Smith', 'd3', '2500')
insert into Employee values('10102', 'Ann', 'Jones', 'd3', '3000')
insert into Employee values('18316', 'John', 'Barrimore', 'd1', '2400')
insert into Employee values('29346', 'James', 'James', 'd2', '2800')
insert into Employee values('9031', 'Lisa', 'Bertoni', 'd2', '4000')
insert into Employee values('2581', 'Elisa', 'Hansel', 'd2', '3600')
insert into Employee values('28559', 'Sybl', 'Moser', 'd1', '2900')

------------------------------------------------------------------------------------------
-- 1. Add new employee with EmpNo =11111 In the works_on table [what will happen]
-- 2. Change the employee number 10102  to 11111  in the works on table [what will happen]
-- 3. Modify the employee number 10102 in the employee table to 22222. [what will happen]
-- 4. Delete the employee with id 10102

-- no matching employee in the parent table (employee) '1111' so the server refuses
insert into Works_on values('11111', 'p1', NULL)

-- no matching employee in the parent table (employee) '1111' so the server refuses
-- The UPDATE statement conflicted with the FOREIGN KEY constraint "FK_Works_on_Employee". The conflict occurred in database "SD32-Company", table "dbo.Employee", column 'EmpNo'.
update Works_on 
set EmpNo = '11111' where EmpNo = '10102'

-- The UPDATE statement conflicted with the REFERENCE constraint "FK_Works_on_Employee". 
-- The values in the referencing table are unchanged. Therefore, the system rejects the modification of the row with the employee number 10102 in the employee table. 
update Employee 
set EmpNo = '22222' where EmpNo = '10102'

-- The DELETE statement conflicted with the REFERENCE constraint "FK_Works_on_Employee". 
delete from Employee where EmpNo = '10102'

--------------------------------------------------------------------------
-- 1. Add  TelephoneNumber column to the employee table[programmatically]
-- 2. drop this column[programmatically]
-- 3. Bulid A diagram to show Relations between tables

alter table Employee
add TelephoneNumber int 

alter table Employee
drop column TelephoneNumber

----------------------------------------------------------------------------
-- 2. Create the following schema and transfer the following tables to it 
--	a. Company Schema 
--		i. Department table (Programmatically)
--		ii. Project table (visually)
--	b. Human Resource Schema
--		i. Employee table (Programmatically)

create schema Company
alter schema Company transfer Department

create schema Human_Resource
alter schema Human_Resource transfer Employee

---------------------------------------------------------------------------
-- 3. Write query to display the constraints for the Employee table.

sp_help 'Human_Resource.Employee'

select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS
where TABLE_NAME = 'Employee'

----------------------------------------------------------------------------
-- 4. Create Synonym for table Employee as Emp and then run the following queries and describe the results
--	a. Select * from Employee
--	b. Select * from [Human Resource].Employee
--	c. Select * from Emp
--	d. Select * from [Human Resource].Emp

select * from Human_Resource.Employee
create synonym Emp for Human_Resource.Employee;

select * from Human_Resource.Employee
select * from Emp

select * from Employee							 -- Invalid object name 'Employee'.
select * from Human_Resource.Emp			     -- Invalid object name 'Employee'.

-----------------------------------------------------------------------------------
-- 5. Increase the budget of the project where the manager number is 10102 by 10%.

update Company.Project
set Budget *= 1.1 
where Budget in 
(select Budget from Company.Project C 
inner join Works_on W on C.ProjectNo  = W.ProjectNo
where W.EmpNo  = '10102' and W.Job  ='Manager') 

-------------------------------------------------------------------------------------
-- 6. Change the name of the department for which the employee named James works.The 
-- new department name is Sales.

update Company.Department
set DeptName = 'Sales'
from Company.Department C 
inner join EMP as E
on C.DeptNo  = E.DeptNo
where E.EmpFname= 'James';

--------------------------------------------------------------------------------------
-- 7. Change the enter date for the projects for those employees who work in project 
-- p1 and belong to department ‘Sales’. The new date is 12.12.2007.

select * from Works_on
update Works_on
set Enter_Date = '12/12/2007'
from EMP as E 
inner join Works_on as W on E.EmpNo = W.EmpNo 
inner join Company.Department C on C.DeptNo  = E.DeptNo
where W.ProjectNo= '1' and C.DeptName='Sales';

--------------------------------------------------------------------------------------
-- 8. Delete the information in the works_on table for all employees who work for 
-- the department located in KW.

delete from Works_on where EmpNo in 
(select W.EmpNo from Works_on W
inner join Emp E on E.EmpNo = Works_on.EmpNo
inner join Company.Department D on E.DeptNo = D.DeptNo
where D.Location = 'KW')
