-- 1. Create a cursor for Employee table that increases Employee salary by 10% if Salary 
-- <3000 and increases it by 20% if Salary >=3000. Use company DB
USE Company_SD 

DECLARE C1 CURSOR
FOR SELECT Salary FROM Employee
FOR UPDATE

DECLARE @Sal INT 

OPEN C1
FETCH C1 INTO @Sal
WHILE @@FETCH_STATUS = 0
BEGIN
	IF @Sal < 3000
		UPDATE Employee 
		SET Salary = @Sal*1.10
		WHERE CURRENT OF C1
	ELSE 
		UPDATE Employee 
		SET Salary = @Sal*1.20
		WHERE CURRENT OF C1
	FETCH C1 INTO @Sal
END
CLOSE C1
DEALLOCATE C1


-- 2. Display Department name with its manager name using cursor. Use ITI DB
USE ITI

DECLARE C2 CURSOR 
FOR SELECT Dept_Name, Ins_Name FROM Department, Instructor
WHERE Ins_Id = Dept_Manager
FOR READ ONLY

DECLARE @Mangar VARCHAR(20), @Name VARCHAR(20)

OPEN C2
FETCH C2 INTO @Name, @Mangar
WHILE @@FETCH_STATUS = 0
BEGIN
	SELECT @Name 'DeptName', @Mangar 'ManagerName'
	FETCH C2 INTO @Name, @Mangar
END

CLOSE C2
DEALLOCATE C2


-- 3. Try to display all students first name in one cell separated by comma. Using Cursor
USE ITI

DECLARE C3 CURSOR
FOR SELECT St_Fname FROM Student
FOR READ ONLY

DECLARE @AllS VARCHAR(299) = ' ', @Current VARCHAR(20)
 
OPEN C3
FETCH C3 INTO @Current
WHILE @@FETCH_STATUS = 0
BEGIN
	SET @AllS = @AllS + ISNULL(@Current, 'Student With NO Name') + ', '
	FETCH C3 INTO @Current
END
SELECT @AllS

CLOSE C3
DEALLOCATE C3


-- 4. Create full, differential Backup for SD30_Company DB.

USE [SD32-Company]

BACKUP DATABASE [SD32-Company]
TO DISK ='D:\BackUp1.bak'
	

BACKUP DATABASE [SD32-Company]
TO DISK ='D:\BackUp2.bak'
WITH DIFFERENTIAL 


-- 5. Use import export wizard to display students data (ITI DB) in excel sheet
-- DONE

-- 6. Try to generate script from DB ITI that describes all tables and views in this DB
-- DONE


-- 7. Create Snapshot for CompanyDB.
USE Company_SD

CREATE DATABASE SNAP
ON 
(
	NAME ='Company_SD',
	FILENAME = 'D:\Company_Snap'
)
AS SNAPSHOT OF Company_SD



-- 8. Create job for backup ITI DB every day at 12:00PM
-- DONE


-- 9. Create a sequence object that allow values from 1 to 10 without cycling in a specific 
-- column and test it (self study).

USE company

CREATE SEQUENCE seq1  
    AS INT
    START WITH 1
    INCREMENT BY 1 
    MINVALUE 1
    MAXVALUE 10 
    NO CYCLE 
    NO CACHE

DECLARE @I INT = 1
WHILE @I < 11
BEGIN
	INSERT INTO name 
	VALUES (NEXT VALUE FOR seq1, 'SOMAYA')
	SELECT @I += 1
END

SELECT * FROM name    
SELECT NEXT VALUE FOR seq1
-- The sequence object 'seq1' has reached its minimum or maximum value. Restart the sequence object to allow new values to be generated.

ALTER SEQUENCE seq1
RESTART WITH 1

SELECT NEXT VALUE FOR seq1   -- 1


-- 10. What is the difference between the following objects in SQL Server
-- 1. batch, script and transaction
-- 2. trigger and stored procedure
-- 3. stored procedure and functions
-- 4. drop, truncate and delete statement
-- 5. select and select into statement
-- 6. local and global variables
-- 7. convert and cast statements
-- 8. DDL,DML,DCL,DQL and TCL
-- 9. For xml raw and for xml auto
-- 10. Table valued and multi statemcent function
-- 11. Varchar(50) and varchar(max)
-- 12. Datetime(3), datetime2(7) and datetimeoffset(7)
-- 13. Default instance and named instance
-- 14. SQL and windows Authentication
-- 15. Clustered and non-clustered index
-- 16. Group by rollup and group by cube
-- 17. Sequence object and identity 
-- 18. Inline table function and view
-- 19. Table variable and temporary table
-- 20. Row_number() and dense_Rank() function