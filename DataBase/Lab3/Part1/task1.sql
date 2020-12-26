use master
use Company_SD

select * from Employee
select * from Departments
select * from Project
select * from Dependent
select * from Works_for

-- 1. Display the Department id, name and id and the name of its manager.
select Dnum, Dname, SSN, concat(Fname ,' ' , Lname) as ManagerName 
from Departments D
inner join Employee E on D.MGRSSN = E.SSN 

-- 2. Display the name of the departments and the name of the projects under its control.
select  Dname, Pname
from Departments D
inner join Project P on D.Dnum = P.Dnum

-- 3. Display the full data about all the dependence associated with the name of 
-- the employee they depend on him/her.
select  D.*, E.Fname as Employee_Name
from Employee E
right outer join Dependent D on D.ESSN = E.SSN

-- 4. Display the Id, name and location of the projects in Cairo or Alex city.
select Pnumber, Pname, Plocation
from Project where City in('Alex' , 'Cairo') 

-- 5. Display the Projects full data of the projects with a name starts with "a" letter.
select *
from Project 
where Pname like 'a%'

-- 6. Display all the employees in department 30 whose salary from 1000 to 2000 LE monthly
select *
from Employee 
where Salary between 1000 and 2000 and Dno = 30

-- 7. Retrieve the names of all employees in department 10 who works more than or 
-- equal10 hours per week on "AL Rabwah" project.
Select concat(Fname ,' ' , Lname) as Employee_Name  
from Employee 
inner join Departments D on Dno = Dnum
inner join Project P on P.Dnum = Dno
where P.Pname = 'AL Rabwah' and D.Dnum = 10

-- 8. Find the names of the employees who directly supervised with Kamel Mohamed.
Select concat(E.Fname ,' ' , E.Lname) as Employee_Name 
from Employee E, Employee M 
where E.Superssn = M.SSN and M.Fname = 'Kamel' and M.Lname = 'Mohamed'

-- 9. Retrieve the names of all employees and the names of the projects they are
-- working on, sorted by the project name.
Select concat(Fname ,' ' , Lname) as Employee_Name, Pname
from Employee
inner join Works_for on ESSN = SSN
inner join Project on Pnumber = Pno
order by Pname

-- 10. For each project located in Cairo City , find the project number, the 
-- controlling department name ,the department manager last name ,address and birthdate.
Select Pnumber, Pname, Dname, Lname, MGRSSN, City, Bdate, Address
from Employee, Project P
inner join Departments D on D.Dnum = P.Dnum
where P.City = 'Cairo' and Employee.SSN = D.MGRSSN

-- 11. Display All Data of the mangers
Select * 
from Employee 
inner join Departments on MGRSSN = SSN 

--12. Display All Employees data and the data of their dependents even if they have 
-- no dependents
select *
from Employee
left outer join Dependent on SSN = ESSN

-- DML
-- 1. Insert your personal data to the employee table as a new employee in 
-- department number 30, SSN = 102672, Superssn = 112233, salary=3000.
insert into Employee (Fname, Lname, Dno, SSN, Superssn, Salary)
values ('Somaya' , 'Elbaradey' , 30 , 102672 , 112233 , 3000)

-- 2. Insert another employee with personal data your friend as new employee in 
-- department number 30, SSN = 102660, but don’t enter any value for salary or 
-- manager number to him.
insert into Employee (Fname, Lname, Dno, SSN)
values ('Sarah' , 'Elbaradey' , 30 , 102660)

-- 3. Upgrade your salary by 20 % of its last value.
update Employee SET Salary += (Salary*0.2)
where Fname = 'Somaya' and Lname = 'Elbaradey'
