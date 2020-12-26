use master
use Company_SD

select * from Employee
select * from Departments
select * from Project
select * from Dependent
select * from Works_for

-- 1. Display (Using Union Function)
-- a. The name and the gender of the dependence that's gender is Female and depending 
--	  on Female Employee.
-- b. And the male dependence that depends on Male Employee.
select D.Dependent_name, D.Sex as Dependent_Gender, E.Sex as Employee_Gender, E.Fname as Employee_name
from Dependent D
inner join Employee E on D.ESSN = E.SSN and E.Sex = 'F' and D.Sex = 'F'
union 
select D.Dependent_name, D.Sex as Dependent_Gender, E.Sex as Employee_Gender, E.Fname as Employee_name
from Dependent D
inner join Employee E on D.ESSN = E.SSN and E.Sex = 'M' and D.Sex = 'M'

--2. For each project, list the project name and the total hours per week 
-- (for all employees) spent on that project.
select P.Pname , W.Hours/4 as Week_hours , E.Fname
from Project P
inner join Works_for W on W.Pno = P.Pnumber
inner join Employee E on E.SSN = W.ESSn

--3. Display the data of the department which has the smallest employee 
-- ID over all employees' ID.
select D.* , E.SSN , E.Fname
from Employee E inner join Departments D
	on E.Dno = D.Dnum
where E.SSN IN
(select min(SSN) from Employee) 

-- 4. For each department, retrieve the department name and the maximum, 
-- minimum and average salary of its employees.
 select D.Dname, max(e.Salary) as Max_, MIN(E.Salary) as Min_, AVG(E.Salary) as Avg_
 from Departments D
 inner join Employee E
 on D.Dnum = E.Dno
 group by D.Dname

 -- 5. List the last name of all managers who have no dependents.
 select Fname, Lname
 from Employee 
 inner join Departments on SSN = MGRSSN
 where MGRSSN not in (select ESSN from Dependent)

 -- 6. For each department-- if its average salary is less than the average 
 -- salary of all employees-- display its number, name and number of its employees.
 select  D.Dname, D.Dnum, E.Fname as Employee_Name
 from Departments D 
 cross join Employee E 
 where E.Dno = D.Dnum 
 group by D.Dname , D.Dnum, E.Fname
 having avg(isnull(E.Salary,0)) < (select avg(Salary) from Employee)

 -- 7. Retrieve a list of employees and the projects they are working on ordered by 
 -- department and within each department, ordered alphabetically by last name, first name.
select distinct E.* , P.Pname
from Employee E inner join Works_for W
on E.SSN = W.ESSn
inner join Project P 
on W.Pno = P.Pnumber
order by E.Dno , E.Fname , E.Lname 

-- 8. Try to get the max 2 salaries using subquery
select max(Salary) from Employee
union 
select max(Salary) from Employee
where Salary not in (select max(Salary) from Employee)

-- 9. Get the full name of employees that is similar to any dependent name
select concat(Fname , ' ' , Lname) as Full_name
from Employee where  Fname in 
(select substring(Dependent_name , 1 , charindex(' ', Dependent_name)) from Dependent)

-- 10. Try to update all salaries of employees who work in Project ‘Al Rabwah’ by 30%
update Employee
set Salary = Salary*1.30
where Salary in (select Salary from Employee
			     inner join Works_for on SSN = ESSN
				 inner join Project on Pno = Pnumber
				 where Pname = 'Al Rabwah'
				 )

-- 11. Display the employee number and name if at least one of them have dependents 
-- (use exists keyword)
select SSN, Fname from Employee
where exists (select ESSN from Dependent where SSN = ESSN)


-- Part2
-- 1. In the department table insert new department called "DEPT IT" , with id 100, 
-- employee with SSN = 112233 as a manager for this department. The start date for
-- this manager is '1-11-2006'
insert into Departments
values('DEPT IT', 100, 112233, '1-11-2006')

-- 2. Do what is required if you know that : Mrs.Noha Mohamed(SSN=968574)  
-- moved to be the manager of the new department (id = 100), 
-- and they give you(your SSN =102672) her position (Dept. 20 manager) 
-- a. First try to update her record in the department table
-- b. Update your record to be department 20 manager.
-- c. Update the data of employee number=102660 to be in your teamwork 
-- (he will be supervised by you) (your SSN =102672)
update Departments 
set MGRSSN = 968574 
where Dnum = 100
update Departments 
set MGRSSN = 102672
where Dnum = 20
update Employee 
set Dno = 20, Superssn = 102672
where SSN = 102660


-- 3. Unfortunately the company ended the contract with Mr. Kamel Mohamed (SSN=223344) 
-- so try to delete his data from your database in case you know that you will be 
-- temporarily in his position.
-- Hint: (Check if Mr. Kamel has dependents, works as a department manager, supervises any employees or works in any projects and handle these cases).
delete from dependent 
where ESSN = 223344

update Departments
set MGRSSN = 102672
where MGRSSN = 223344

update Employee
set Superssn = 102672
where Superssn = 223344
select * from Employee
where Superssn = 102672

update Works_for
set ESSn = 102672
where ESSn = 223344
select * from Works_for
where ESSn = 223344