USE ITI
SELECT * FROM Student
SELECT * FROM Department
----------------------PART1------------------------------------------------------
-- Create a scalar function that takes date and returns Month name of that date.
CREATE FUNCTION getMonth(@date DATETIME)
RETURNS VARCHAR(10)
	BEGIN
		DECLARE @month VARCHAR(10) = FORMAT(@date, 'MMMM');
		RETURN @month
	END

SELECT dbo.getMonth('2012/03/05')
SELECT dbo.getMonth(GETDATE())


-- Create a multi-statements table-valued function that takes 2 integers and returns 
-- the values between them.
CREATE FUNCTION getValues(@X INT, @Y INT)
	RETURNS @table TABLE (valuesBween INT)
	AS
		BEGIN
			IF @X > @Y
				BEGIN
					SELECT @Y += 1
					WHILE @x > @Y
					BEGIN
						SELECT @x-=1
						INSERT INTO @table SELECT @x
					END
				END
			ELSE
				BEGIN
				SELECT @Y -= 1
					WHILE @X < @Y
					BEGIN
						SELECT @X+=1
						INSERT INTO @table SELECT @x
					END
				END
			RETURN
		END 
SELECT * FROM getValues(20, 10)


-- Create a tabled valued function that takes Student No and returns Department Name 
-- with Student full name.
CREATE FUNCTION getName(@sid INT)
RETURNS TABLE
AS 
	RETURN
	( 
		SELECT CONCAT(St_Fname,' ',St_Lname) AS FullName, Dept_Name FROM Student, Department	
		WHERE St_Id = @sid AND Student.Dept_Id = Department.Dept_Id
	)

SELECT * FROM getName(5)


-- Create a scalar function that takes Student ID and returns a message to user 
	-- a.If first name and Last name are null then display 'First name & last name are null'
	--b.If First name is null then display 'first name is null'
	--c.If Last name is null then display 'last name is null'
	--d.Else display 'First name & last name are not null'
CREATE FUNCTION yourMsg(@ID INT)
RETURNS VARCHAR(20)
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
		RETURN @msg
	END

SELECT dbo.yourMsg(16)


-- Create a function that takes integer which represents the format of the 
-- Manager hiring date and displays department name, Manager Name and hiring date 
-- with this format.
CREATE FUNCTION getDepData(@format INT)
RETURNS TABLE
AS
	RETURN
	(
		SELECT Dept_Name, Dept_Manager, CONVERT(VARCHAR(50), Manager_hiredate, @format) 
		AS HIRE_DATE
		FROM Department
	)

SELECT * FROM getDepData(100)
SELECT * FROM getDepData(25)

-- Create multi-statements table-valued function that takes a string
-- If string='first name' returns student first name
-- If string='last name' returns student last name 
-- If string='full name' returns Full Name from student table 
-- Note: Use “ISNULL” function

CREATE FUNCTION getSname(@string NVARCHAR(20))
	RETURNS @table TABLE (studentName NVARCHAR(20))
	AS
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
			RETURN
		END 

SELECT * FROM getSname('last name')


-- Write a query that returns the Student No and Student first name without the last char
SELECT St_Id, SUBSTRING(St_Fname, 0, LEN(St_Fname)) AS studentName FROM Student


-- Write a query that takes the columns list and table name into variables and then 
-- return the result of this query “Use exec command”
DECLARE @name NVARCHAR(20) = 'St_Fname'
DECLARE @id NVARCHAR(20) = 'St_Id'
DECLARE @tableName NVARCHAR(20) = 'Student' 

EXECUTE ('SELECT ' + @name + ' , ' + @id + ' FROM ' + @tableName)


--------------------------------PART2--------------------------------------------------
-- Create function that takes project number and display all employees in this project
USE Company_SD

CREATE FUNCTION getEmp(@num INT)
RETURNS TABLE
AS
	RETURN
	(
		SELECT * FROM Employee, Works_for
		WHERE SSN = ESSn AND Pno = @num
	)

SELECT * FROM getEmp(100)

--------------------------------PART3--------------------------------------------------
-- Create a batch that inserts 3000 rows in the employee table. The values of the emp_no 
-- column should be unique and between 1 and 3000. All values of the columns emp_lname, 
-- emp_fname, and dept_no should be set to 'Jane', ' Smith', and ' d1', respectively.”USE 
-- CompnayDB”
USE company

SELECT * FROM emp
GO
DECLARE @emp_no INT = 1
DECLARE @emp_fname NVARCHAR(50) = 'Jane' 
DECLARE @emp_lname NVARCHAR(50) = 'Smith'
DECLARE @dept_no VARCHAR(10) = 'd1'

WHILE @emp_no < 3001
	BEGIN
	INSERT INTO emp
	VALUES (@emp_no, @emp_fname, @emp_lname, @dept_no)
	SET @emp_no +=1
	END
SELECT * FROM emp
GO
SELECT COUNT(*) FROM emp

-- Give an example for Hierarch id Data type
SRC: https://www.mssqltips.com/sqlservertip/6048/sql-server-hierarchyid-data-type-overview-and-examples/