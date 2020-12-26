use ITI

select * from Student
select * from Instructor
select * from Stud_Course
select * from Course
select * from Topic
Select * from Department

--Part-1: Use ITI DB
-- 1. Retrieve number of students who have a value in their age. 
select count(st_Age)
from Student

-- 2. Get all instructors Names without repetition
select distinct Ins_Name
from Instructor

-- 3. Display student with the following Format (use isNull function)
-- Student ID	Student Full Name	Department name
select St_Id as 'Student ID', isNull(St_Fname,' ')+' '+isNull(St_Lname,' ') as 'Full Name',
Dept_Name as 'Department name'
from Student
inner join Department on Department.Dept_Id = Student.Dept_Id

-- 4. Display instructor Name and Department Name 
-- Note: display all the instructors if they are attached to a department or not
select Ins_Name, Dept_Name
from Instructor
left outer join Department on Department.Dept_Id = Instructor.Dept_Id

-- 5. Display student full name and the name of the course he is taking
-- For only courses which have a grade  
select  St_Fname+' '+St_Lname as 'Full Name', Crs_Name as 'Course Name'
from Student 
inner join Stud_Course on Stud_Course.St_Id = Student.St_Id
inner join Course on Course.Crs_Id = Stud_Course.Crs_Id
where Stud_Course.Grade is not null

-- 6. Display number of courses for each topic name
select count(Crs_Id) as 'number of courses', Top_Name
from Course
inner join Topic on Topic.Top_Id = Course.Top_Id
Group by Top_Name

-- 7. Display max and min salary for instructors
select max(Salary) as 'Max Salary', min(Salary) as 'Min Salary'
from Instructor

-- 8. Display instructors who have salaries less than the average salary of all instructors.
select Ins_Name as Instructor_Name, Salary
from Instructor
where Salary < (select avg(Salary) from Instructor)

-- 9. Display the Department name that contains the instructor who receives the minimum salary.
select top(1) Dept_Name
from Department inner join Instructor on Instructor.Dept_Id = Department.Dept_Id
order by Salary

-- 10. Select max two salaries in instructor table. 
select top(2) Ins_Name, Salary
from Instructor
order by Salary desc

-- 11. Select instructor name and his salary but if there is no salary 
-- display instructor bonus. “use one of coalesce Function”
select coalesce(convert(varchar(10),Salary),convert(varchar(10),'bonus')) , Ins_name
from Instructor

-- 12. Select Average Salary for instructors 
select avg(Salary) as Avg_Salary
from Instructor

-- 13. Select Student first name and the data of his supervisor
select S.St_Fname as Student_Name, Sup.*
from Student S, Student Sup
where Sup.St_Id = S.St_super

-- 14. Write a query to select the highest two salaries in Each 
-- Department for instructors who have salaries. “using one of Ranking Functions”
select * from
					(select Salary, row_number() over(partition by Dept_id  
					  order by Salary desc) as RN from Instructor) 
					  as NewTable
where RN <= 2

-- 15. Write a query to select a random student from each department.
-- “using one of Ranking Functions”
select * from (select St_Fname, Dept_id, Dense_Rank() over(partition by Dept_Id 
				order by newid()) as RN
				from Student) as newTable
where RN <= 2 

--------------------------------------------------------------------

USE AdventureWorks2012


-- 1. Display the SalesOrderID, ShipDate of the SalesOrderHearder table
-- (Sales schema) to designate SalesOrders that occurred within the period ‘7/28/2002’ 
-- and ‘7/29/2014’
select SalesOrderID, ShipDate
from Sales.SalesOrderHeader
where ShipDate between '7/28/2002' and '7/29/2014'

-- 2. Display only Products(Production schema) with a 
-- StandardCost below $110.00 (show ProductID, Name only)
select ProductID, Name
from Production.Product
where StandardCost < 110

-- 3. Display ProductID, Name if its weight is unknown
select ProductID, Name
from Production.Product
where Weight is NULL

-- 4. Display all Products with a Silver, Black, or Red Color
select *
from Production.Product
where Color in ('Silver', 'Black', 'Red')

-- 5. Display any Product with a Name starting with the letter B
select *
from Production.Product
where Name like 'B%'

-- 6. Run the following Query

-- UPDATE Production.ProductDescription
-- SET Description = 'Chromoly steel_High of defects'
-- WHERE ProductDescriptionID = 3

-- Then write a query that displays any Product description with underscore value in its 
-- description.

update Production.ProductDescription 
set Description = 'Chromoly steel_High of defects'
where ProductDescriptionID = 3

select *
from Production.ProductDescription
where Description like '%[_]%'

-- 7. Calculate sum of TotalDue for each OrderDate in Sales.SalesOrderHeader 
-- table for the period between  '7/1/2001' and '7/31/2014'
select sum(TotalDue) as Total_Due
from Sales.SalesOrderHeader
where OrderDate between '7/1/2001' and '7/31/2014'

-- 8. Display the Employees HireDate (note no repeated values are allowed)
select distinct HireDate
from HumanResources.Employee

-- 9. Calculate the average of the unique ListPrices in the Product table
select avg(distinct ListPrice)
from Production.Product

-- 10. Display the Product Name and its ListPrice within the values of 100 and 120 
-- the list should has the following format 
-- "The [product name] is only! [List price]" (the list will be sorted according to
-- its ListPrice value)
select concat('The ',Name, ' is only!', ListPrice)
from Production.Product
where ListPrice between 100 and 120
order by ListPrice 

-- 11.	
-- a) Transfer the rowguid ,Name, SalesPersonID, Demographics from Sales.Store 
-- table in a newly created table named [store_Archive]
-- Note: Check your database to see the new table and how many rows in it?
-- b) Try the previous query but without transferring the data?
select rowguid, Name, SalesPersonID, Demographics into store_Archive
from Sales.Store

select * from store_Archive

select * into store2_Archive
from Sales.Store
where 0 = 1

-- 12. Using union statement, retrieve the today’s date in different styles
select convert(varchar, getdate(), 23)
union
select convert(varchar, getdate(), 3)
union
select convert(varchar, getdate(), 13)
union
select convert(varchar, getdate(), 20)
union
select convert(varchar, getdate(), 0)
union
select convert(varchar, getdate(), 5)

---------------------------------------------------------
-- Part-3: Bouns
-- Display results of the following two statements and explain what is the meaning of @@AnyExpression
-- select @@VERSION
-- select @@SERVERNAME

select @@VERSION
select @@SERVERNAME

-- meaning of @@AnyExpression

-- Global variabel which is special type of variable 
-- the server maintains the values of these variables
-- All the global variables represent information specific to the 
-- server or a current user session. 
-- Global variable names begin with a @@ prefix.
--  You do not need to declare them, since the server constantly maintains them.
-- They are system-defined functions and you cannot declare them.
-- (
-- @@CONNECTIONS - @@MAX_CONNECTIONS - @@CPU_BUSY
-- @@ERROR  - @@IDENTITY - @@IDLE - @@IO_BUSY - @@LANGID  - @@LANGUAGE - @@MAXCHARLEN
-- @@PACK_RECEIVED - @@PACK_SENT - @@PACKET_ERRORS - @@ROWCOUNT  - @@SERVERNAME  - @@SPID - @@TEXTSIZE 
-- @@TIMETICKS - @@TOTAL_ERRORS - @@TOTAL_READ / @@TOTAL_WRITE - @@TRANCOUNT - @@VERSION  
-- )
