USE AdventureWorks2012

-- 1. Display all the data from the Employee table (HumanResources Schema) 
-- As an XML document “Use XML Raw”. “Use Adventure works DB” 
-- A) Elements
-- B) Attributes
SELECT * FROM HumanResources.Employee
FOR XML RAW ('Employee'), ELEMENTS XSINIL, ROOT('All_Employees')

SELECT * FROM HumanResources.Employee
FOR XML RAW ('Employee')


-- 2. Display Each Department Name with its instructors. “Use ITI DB”
-- A) Use XML Auto
-- B) Use XML Path
USE ITI

SELECT Dept_Name, Ins_Name FROM Department
INNER JOIN Instructor ON Instructor.Dept_Id = Department.Dept_Id
FOR XML AUTO, ELEMENTS, ROOT('Dept_Ins')

SELECT Dept_Name '@Dept_Name', Ins_Name 'Instructor' FROM Department, Instructor
WHERE Department.Dept_Id = Instructor.Dept_Id
FOR XML PATH('Dept_Ins')


-- 3. Use the following variable to create a new table “customers” inside the company DB.
-- Use OpenXML
USE company

DECLARE @DOCS XML =	'<customers>
					  <customer FirstName="Bob" Zipcode="91126">
							 <order ID="12221">Laptop</order>
					  </customer>
					  <customer FirstName="Judy" Zipcode="23235">
							 <order ID="12221">Workstation</order>
					  </customer>
					  <customer FirstName="Howard" Zipcode="20009">
							 <order ID="3331122">Laptop</order>
					  </customer>
					  <customer FirstName="Mary" Zipcode="12345">
							 <order ID="555555">Server</order>
					  </customer>
					</customers>'

DECLARE @HDOCS INT
EXEC SP_XML_PREPAREDOCUMENT @HDOCS OUTPUT, @DOCS

CREATE TABLE Customers
(Zipcode INT, FirstName VARCHAR(50), orderName VARCHAR(50), orderId INT)

INSERT INTO Customers
SELECT * FROM OPENXML (@HDOCS, '//customer') 
WITH (Zipcode INT '@Zipcode',
	  FirstName VARCHAR(50) '@FirstName',
	  orderName VARCHAR(50) 'order',
	  orderId INT 'order/@ID' 
	  )

EXEC SP_XML_REMOVEDOCUMENT @HDOCS

SELECT * FROM Customers


-- 4. Create a stored procedure to show the number of students per department.[use ITI DB]
USE ITI

CREATE PROCEDURE Stud_no
AS 
	SELECT Dept_Name, COUNT(St_Id) FROM Student, Department
	WHERE Student.Dept_Id = Department.Dept_Id
	GROUP BY Dept_Name

Stud_no


-- 5. Create a stored procedure that will check for the # of employees in the project p1 if 
-- they are more than 3 print message to the user “'The number of employees in the project 
-- p1 is 3 or more'” if they are less display a message to the user “'The following employees
-- work for the project p1'” in addition to the first name and last name of each one. [Company DB] 
USE Company_SD

ALTER PROCEDURE Check_p1no_ @Count INT OUTPUT
AS
SELECT @Count = EmployeeNumber FROM
		(SELECT Dnum, COUNT(SSN) AS EmployeeNumber FROM Employee, Departments
		WHERE Dno = Dnum AND Dname = 'DP1'
		GROUP BY Dnum) AS NEW
		IF @Count >= 3
			SELECT 'The number of employees in the project p1 is 3 or more' AS MSG
		ELSE
			SELECT 'The following employees work for the project p1' AS MSG,
			CONCAT(Fname, ' ', Lname) AS Full_Name
			FROM Employee, Departments
			WHERE Dno = Dnum AND Dname = 'DP1'

DECLARE @X INT
EXECUTE Check_p1no_ @X OUTPUT


-- 6. Create a stored procedure that will be used in case there is an old employee has left
-- the project and a new one become instead of him. The procedure should take 3 parameters
-- (old Emp. number, new Emp. number and the project number) and it will be used to update
-- works_on table. [Company DB]
USE Company_SD

Alter PROCEDURE EmpOutProject @oldEmp INT, @newEmp INT , @pNo INT
AS 
UPDATE Works_for
	SET ESSn = @newEmp
	WHERE ESSn = @oldEmp AND Pno = @pNo

SELECT * FROM  Works_for
SELECT * FROM  Employee

EmpOutProject 102672, 968578, 100


-- 7. Create an Audit table with the following structure 
-- ProjectNo 	UserName 	ModifiedDate 	Budget_Old 	Budget_New 
-- p2 	Dbo 	2008-01-31	95000 	200000 

-- This table will be used to audit the update trials on the Budget column (Project table, Company DB)
-- Example:
-- If a user updated the budget column then the project number, user name that made that 
-- update, the date of the modification and the value of the old and the new budget will be 
-- inserted into the Audit table
-- Note: This process will take place only if the user updated the budget column
USE [SD32-Company]

CREATE TABLE #AuditTable
(
ProjectNo NCHAR(10),
UserName VARCHAR(20),
ModifiedDate DATE,
Budget_Old INT,
Budget_New INT 
)

CREATE TRIGGER T
ON Company.Project
AFTER UPDATE
AS 			
IF UPDATE(Budget)
BEGIN
	DECLARE @pNo NCHAR(10), @newBudget INT, @oldBudget INT
	SELECT @newBudget = Budget, @pNo = ProjectNo FROM INSERTED
	SELECT @oldBudget = Budget FROM DELETED
	INSERT INTO #AuditTable
	VALUES(@pNo, CONVERT(VARCHAR(20),suser_name()), GETDATE(), @oldBudget, @newBudget)
END

--DROP TRIGGER COMPANY.T
SELECT * FROM #AuditTable

UPDATE Company.Project SET Budget = 109
WHERE ProjectNo = 'p2'


-- 8. Create a trigger to prevent anyone from inserting a new record in the Department table [ITI DB]
-- “Print a message for user to tell him that he can’t insert a new record in that table”
USE ITI 

CREATE TRIGGER T1 
ON Department
INSTEAD OF INSERT
AS
	SELECT 'can’t insert a new record in that table'

INSERT INTO Department 
VALUES (20, 'Prog', 'JAVA', 'Cairo', 25214, '2021/01/01')


-- 9. Create a trigger that prevents the insertion Process for Employee table in March [Company DB].
USE Company_SD

ALTER TRIGGER T2
ON Employee 
INSTEAD OF INSERT 
AS
IF FORMAT(GETDATE(),'DDDD') = 'MARCH'
	SELECT 'CAN NOT INSERT DATA'
ELSE
	SELECT 'DATA INSERTED'
	INSERT INTO Employee
	SELECT * FROM INSERTED

INSERT INTO Employee (Lname,Fname,SSN) 
VALUES ('Anas', 'Mohamed', 968578)


-- 10. Create a trigger on student table after insert to add Row in Student Audit table 
-- (Server User Name , Date, Note) where note will be “[username] Insert New Row with 
-- Key=[Key Value] in table [table name]”  Server User Name		Date 
USE ITI

CREATE TABLE #sAudit
(
serverUserName VARCHAR(20),
currentDate DATE,
Note VARCHAR(299)
)

CREATE TRIGGER T3
ON Student 
AFTER INSERT 
AS 
	DECLARE @KEY INT
	SELECT @KEY = St_Id FROM INSERTED
	INSERT INTO #sAudit
	VALUES(
	CONVERT(VARCHAR(20), SUSER_NAME()),
	GETDATE(), 
	CONVERT(VARCHAR(20), SUSER_NAME()) + ' Insert New Row with KEY= ' +
	ISNULL(CONVERT(VARCHAR(20), @KEY), ' ') + 'in Student table'
	)

INSERT INTO Student
VALUES(29, 'SARAH', 'TANTA', 23, 10, 3, 'MOH')

SELECT * FROM #sAudit


-- 11. Create a trigger on student table instead of delete to add Row in Student Audit table
-- (Server User Name, Date, Note) where note will be“ try to delete Row with Key=[Key Value]”
USE ITI

CREATE TRIGGER T4 
ON Student
INSTEAD OF DELETE
AS
	DECLARE @KEY INT
	SELECT @KEY = St_Id FROM INSERTED
	INSERT INTO #sAudit
	VALUES(
	CONVERT(VARCHAR(20), SUSER_NAME()),
	GETDATE(), 
	CONVERT(VARCHAR(20), SUSER_NAME()) + ' Try to delete Row with KEY= ' +
	ISNULL(CONVERT(VARCHAR(20), @KEY), ' ') + 'in Student table'
	)

DELETE FROM Student
WHERE St_Id = 2

SELECT * FROM #sAudit


-------------------------------- Bonus --------------------------------------------------------
-- 1. Transform all functions in lab 7 to be stored procedures

-- Create a scalar function that takes date and returns Month name of that date.
USE ITI

CREATE PROCEDURE returnMonth @theDAate DATETIME
AS
BEGIN
	DECLARE @theMonth VARCHAR(10)
	SELECT @theMonth = DATENAME(MM, @theDAate)
	SELECT @theMonth
END

returnMonth '2021/2/10'

-- Create a multi-statements table-valued function that takes 2 integers and returns the 
-- values between them.

CREATE PROCEDURE betweenNo @no1 INT, @no2 INT
AS
BEGIN
	DECLARE @table TABLE (valuesBween INT)
	IF @no1 > @no2
		BEGIN
			SELECT @no2 += 1
			WHILE @no1 > @no2
			BEGIN
				SELECT @no1-=1
				INSERT INTO @table SELECT @no1
			END
		END
	ELSE
		BEGIN
		SELECT @no2 -= 1
			WHILE @no1 < @no2
			BEGIN
				SELECT @no1+=1
				INSERT INTO @table SELECT @no1
			END
		END
	SELECT * FROM @table
END

betweenNo 10, 20

-- Create a tabled valued function that takes Student No and returns Department Name 
-- with Student full name.

CREATE PROCEDURE getStudentName (@sid INT)
AS 
	SELECT CONCAT(St_Fname,' ',St_Lname) AS FullName, Dept_Name FROM Student, Department	
	WHERE St_Id = @sid AND Student.Dept_Id = Department.Dept_Id

getStudentName 5 

-- Create a scalar function that takes Student ID and returns a message to user 
	-- a.If first name and Last name are null then display 'First name & last name are null'
	--b.If First name is null then display 'first name is null'
	--c.If Last name is null then display 'last name is null'
	--d.Else display 'First name & last name are not null'

ALTER PROCEDURE yourOwnMsg (@ID INT)
AS
	BEGIN
		DECLARE @msg VARCHAR(20)
		DECLARE @Fname VARCHAR(20)
		DECLARE @Lname VARCHAR(20)
		SELECT @Fname = St_Fname, @Lname = St_Lname from Student where st_id = @ID

		IF @Lname IS NULL AND @Fname IS NULL 
			BEGIN
			SELECT @msg = 'first AND last name ARE null'
			END
		ELSE IF @Lname IS NULL
			BEGIN
			SELECT @msg = 'last name is null'
			END
		ELSE IF @Fname IS NULL
			BEGIN
			SELECT @msg = 'first name is null'
			END
		ELSE
			BEGIN
			SELECT @msg = 'First & last name are NOT null'
			END
		SELECT @msg
	END

yourOwnMsg 16


-- Create a function that takes integer which represents the format of the 
-- Manager hiring date and displays department name, Manager Name and hiring date 
-- with this format.

CREATE PROCEDURE getTheDepData(@format INT)
AS
	SELECT Dept_Name, Dept_Manager, CONVERT(VARCHAR(50), Manager_hiredate, @format) 
	AS HIRE_DATE
	FROM Department

getTheDepData 100

-- Create multi-statements table-valued function that takes a string
-- If string='first name' returns student first name
-- If string='last name' returns student last name 
-- If string='full name' returns Full Name from student table 
-- Note: Use “ISNULL” function

CREATE PROCEDURE getTheName (@string NVARCHAR(20))
AS
	DECLARE @table TABLE (studentName NVARCHAR(20))
		BEGIN
			IF @string = 'first name'
				BEGIN
					INSERT INTO @table
					SELECT ISNULL(St_Fname,'no first name') FROM Student
				END
			ELSE IF @string = 'last name'
				BEGIN
					INSERT INTO @table
					SELECT ISNULL(St_Lname,'no last name') FROM Student
				END
			ELSE IF @string = 'full name'
				BEGIN
					INSERT INTO @table
					SELECT ISNULL(St_Fname,'')+' '+ISnull(St_Lname,'') FROM Student
				END
			SELECT * FROM @table
		END 

getTheName 'last name'
getTheName 'first name'


-- Write a query that returns the Student No and Student first name without the last char
CREATE PROCEDURE returnSno 
AS
SELECT St_Id, SUBSTRING(St_Fname, 0, LEN(St_Fname)) AS studentName FROM Student

returnSno

-- Write a query that takes the columns list and table name into variables and then 
-- return the result of this query “Use exec command”
CREATE PROCEDURE intoVar
AS
BEGIN
	DECLARE @name NVARCHAR(20) = 'St_Fname'
	DECLARE @id NVARCHAR(20) = 'St_Id'
	DECLARE @tableName NVARCHAR(20) = 'Student' 
	EXECUTE ('SELECT ' + @name + ' , ' + @id + ' FROM ' + @tableName)
END

intoVar

-- Create function that takes project number and display all employees in this project
USE Company_SD

CREATE PROCEDURE EmpData (@num INT)
AS
	SELECT * FROM Employee, Works_for
	WHERE SSN = ESSn AND Pno = @num

EmpData 100



-- 2. Get All Student as an XML Document and display Student Id as attribute and the other 
-- columns as Elements -- Use XML Explicit

USE ITI

SELECT 1 AS tag, NULL AS parent,
	Student.ST_Id AS [Student!1!ST_Id],
	NULL AS [Name!2!ST_Fname],
	NULL AS [Name!2!ST_Lname],
	Student.St_Address AS [Student!1!St_Address],
	Student.St_Age [Student!1!St_Age],
	Student.Dept_Id [Student!1!Dept_Id],       
	Student.St_Super [Student!1!St_Super]
FROM Student
UNION ALL
SELECT 2 AS tag, 1 AS parent,
	Student.ST_Id,
	Student.ST_Fname,
	Student.ST_Lname,
	Student.St_Address,
	Student.St_Age,
	Student.Dept_Id,       
	Student.St_Super 
FROM Student
ORDER BY [Student!1!ST_Id], [Name!2!ST_Fname]
FOR XML EXPLICIT