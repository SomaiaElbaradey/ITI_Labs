USE ITI
SELECT * FROM Student
SELECT * FROM Stud_Course
SELECT * FROM Department

-- 1. Create a view that displays student full name, course name if the student has a 
-- grade more than 50. 
CREATE VIEW dbo.display
AS 
	SELECT CONCAT(St_Fname, ' ', St_Lname) AS fullName, Crs_Name AS courseName
	FROM Student, Course, Stud_Course
	WHERE Stud_Course.Crs_Id = Course.Crs_Id AND Student.St_Id = Stud_Course.St_Id
	AND Grade > 50

SELECT * FROM dbo.display


-- 2. Create an Encrypted view that displays manager names and the topics they teach. 

ALTER VIEW dbo.mangerName 
WITH ENCRYPTION
AS
	SELECT Top_Name, Dept_Manager FROM Department, Instructor, Ins_Course, Topic
	INNER JOIN Course ON Course.Top_Id = Topic.Top_Id
	WHERE Instructor.Ins_Id = Department.Dept_Manager
	AND Instructor.Ins_Id = Ins_Course.Ins_Id
	AND Course.Crs_Id = Ins_Course.Crs_Id

SELECT * FROM dbo.mangerName
SP_HELPTEXT 'mangerName'


-- 3. Create a view that will display Instructor Name, Department Name for the ‘SD’ or
-- ‘Java’ Department “use Schema binding” and describe what is the meaning of Schema Binding

-- SCHEMABINDING prevent tables used in the views to make any such modifications that can 
-- affect the view’s definition.
-- When this keyword is used in the view it binds the view to the schema of the underlying tables. 
-- If you want to modify the table definition which may affect the view, you may have to drop
-- the view first and then change the table definition.

CREATE VIEW dbo.displayDept
WITH SCHEMABINDING
AS 
	SELECT Ins_Name, Dept_Name FROM dbo.Instructor, dbo.Department
	WHERE Instructor.Dept_Id = Department.Dept_Id
	AND Dept_Name IN ('Java','SD')

SELECT * FROM dbo.displayDept


-- 4. Create a view “V1” that displays student data for student who lives in Alex or Cairo. 
-- Note: Prevent the users to run the following query 
-- Update V1 set st_address=’tanta’
-- Where st_address=’alex’;

CREATE VIEW dbo.V1 
AS
	SELECT * FROM Student
	WHERE St_Address IN('Alex', 'Cairo')
	WITH CHECK OPTION

Update dbo.V1 SET st_address = 'tanta'
Where st_address = 'alex'


-- 5. Create index on column (Hiredate) that allow u to cluster the data in table Department.
-- What will happen?

CREATE CLUSTERED INDEX Index1
ON Department(Manager_hiredate)
-- Cannot create more than one clustered index on table 'Department'. Drop the existing 
-- clustered index 'PK_Department' before creating another.

-- But you can create non clustered index
CREATE NONCLUSTERED INDEX myIndex
ON Department(Manager_hiredate)


-- 6. Create index that allow u to enter unique ages in student table. What will happen?

CREATE UNIQUE INDEX ageIndex
ON Student(St_Age)
-- The CREATE UNIQUE INDEX statement terminated because a duplicate key was found for the 
-- object name 'dbo.Student' and the index name 'ageIndex'. The duplicate key value is 
-- (<NULL>).


-- 7. Create temporary table [Session based] on Company DB to save employee name and his today task.
USE Company_SD

CREATE TABLE #temp
	(
		empName VARCHAR(50),
		dailyTask VARCHAR(20)
	)
SELECT * FROM #temp


-- 8. Create a view that will display the project name and the number of employees work on it. “Use Company DB”
CREATE VIEW displayProj
AS 
	SELECT Pno, COUNT(ESSn) AS employeeNumber, Pname AS projectName 
	FROM  dbo.Works_for
	INNER JOIN Project ON Pno = Pnumber
	GROUP BY Pno, Pname

SELECT * FROM displayProj

-- SELECT * FROM Works_for 
-- PIVOT (COUNT(Pno) FOR Pno IN ([100],[200],[300],[400],[500],[600],[700])) as PVT


-- 9. Using Merge statement between the following two tables [User ID, Transaction Amount]
USE company

CREATE TABLE DailyTrans
	(
		id INT,
		moneyTranseted INT 
	)
CREATE TABLE LastTrans
	(
		id INT,
		moneyTranseted INT
	)

INSERT INTO DailyTrans
VALUES (1,1000), (2,2000), (3,1000)

INSERT INTO LastTrans
VALUES (1,4000), (4,2000), (2,10000)

MERGE INTO LastTrans AS L
USING DailyTrans AS D
ON L.id = D.id
WHEN MATCHED THEN
	UPDATE
	SET L.moneyTranseted = D.moneyTranseted
WHEN NOT MATCHED THEN
	INSERT 
	VALUES(D.id, D.moneyTranseted);

SELECT * FROM LastTrans
SELECT * FROM DailyTrans


-------------------------Part 2: use CompanySD32_DB---------------------------------------
-- 1. Create view named   “v_clerk” that will display employee#,project#, the date of hiring
-- of all the jobs of the type 'Clerk'.

USE [SD32-Company]

CREATE VIEW V_clerk
AS
	SELECT E.EmpNo, P.ProjectNo, Enter_Date FROM Company.Project P, Human_Resource.Employee E
	INNER JOIN dbo.Works_on ON Works_on.EmpNo = E.EmpNo
	WHERE Job = 'Clerk' AND Works_on.ProjectNo = P.ProjectNo

SELECT * FROM V_clerk


-- 2. Create view named  “v_without_budget” that will display all the projects data 
-- without budget
ALTER VIEW v_without_budget
AS 
	SELECT ProjectNo, ProjectName FROM Company.Project
	WHERE Budget IS NULL

SELECT * FROM v_without_budget


-- 3. Create view named  “v_count “ that will display the project name and the # of jobs in it
CREATE VIEW v_count
AS
	SELECT ProjectName, COUNT(Job) AS no_Of_Jobs FROM Company.Project P
	INNER JOIN Works_on W ON W.ProjectNo = P.ProjectNo
	GROUP BY ProjectName

SELECT * FROM v_count


-- 4. Create view named ” v_project_p2” that will display the emp# s for the project# ‘p2’
-- use the previously created view  “v_clerk”
CREATE VIEW v_project_p2 
AS
	SELECT E.EmpNo FROM Human_Resource.Employee E
	INNER JOIN V_clerk V ON V.EmpNo = E.EmpNo
	WHERE V.ProjectNo = 'p2'

SELECT * FROM v_project_p2


-- 5. modifey the view named  “v_without_budget”  to display all DATA in project p1 and p2 
ALTER VIEW v_without_budget
AS 
	SELECT * FROM Company.Project
	WHERE ProjectNo IN('p1', 'p2')

SELECT * FROM v_without_budget


-- 6. Delete the views  “v_ clerk” and “v_count”
DROP VIEW v_clerk
DROP VIEW v_count


-- 7. Create view that will display the emp# and emp lastname who works on dept# is ‘d2’
CREATE VIEW emp_in_d2
AS
	SELECT EmpNo, EmpLname FROM Human_Resource.Employee E
	INNER JOIN Company.Department D ON E.DeptNo = D.DeptNo
	WHERE D.DeptNo = 'd2'

SELECT * FROM emp_in_d2


-- 8. Display the employee  lastname that contains letter “J”
-- Use the previous view created in Q#7
CREATE VIEW emp_with_j
AS
	SELECT E.EmpLname FROM Human_Resource.Employee E
	INNER JOIN emp_in_d2 E2 ON E.EmpNo = E2.EmpNo
	WHERE E.EmpLname LIKE '%j%'

SELECT * FROM emp_in_d2


-- 9. Create view named “v_dept” that will display the department# and department name
CREATE VIEW v_dept
AS
	SELECT DeptNo, DeptName FROM Company.Department

SELECT * FROM v_dept


-- 10. using the previous view try enter new department data where dept# is ’d4’ and dept
-- name is ‘Development’
INSERT INTO v_dept
VALUES ('d4', 'Development')

SELECT * FROM Company.Department


-- 11. Create view name “v_2006_check” that will display employee#, the project #where he 
-- works and the date of joining the project which must be from the first of January and the
-- last of December 2006.this view will be used to insert data so make sure that the coming 
-- new data must match the condition
CREATE VIEW v_2006_check 
AS 
	SELECT E.EmpNo, ProjectNo, Enter_Date FROM Human_Resource.Employee E
	INNER JOIN Works_on W ON E.EmpNo = W.EmpNo 
	WHERE Enter_Date BETWEEN '2006-01-01' AND '2006-12-31'
	WITH CHECK OPTION

SELECT * FROM v_2006_check
INSERT INTO v_2006_check
VALUES (12,'p2')