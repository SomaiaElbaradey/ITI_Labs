USE [master]
GO
/****** Object:  Database [ITI]    Script Date: 21/01/09 21:13:04 ******/
CREATE DATABASE [ITI]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ITI', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ITI.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ITI_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ITI_log.ldf' , SIZE = 6912KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ITI] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ITI].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ITI] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ITI] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ITI] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ITI] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ITI] SET ARITHABORT OFF 
GO
ALTER DATABASE [ITI] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ITI] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ITI] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ITI] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ITI] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ITI] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ITI] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ITI] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ITI] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ITI] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ITI] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ITI] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ITI] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ITI] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ITI] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ITI] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ITI] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ITI] SET RECOVERY FULL 
GO
ALTER DATABASE [ITI] SET  MULTI_USER 
GO
ALTER DATABASE [ITI] SET PAGE_VERIFY NONE  
GO
ALTER DATABASE [ITI] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ITI] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ITI] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [ITI] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ITI', N'ON'
GO
ALTER DATABASE [ITI] SET QUERY_STORE = OFF
GO
USE [ITI]
GO
/****** Object:  User [koko]    Script Date: 21/01/09 21:13:04 ******/
CREATE USER [koko] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [iti]    Script Date: 21/01/09 21:13:04 ******/
CREATE USER [iti] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Schema [iti]    Script Date: 21/01/09 21:13:04 ******/
CREATE SCHEMA [iti]
GO
/****** Object:  UserDefinedFunction [dbo].[getMonth]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[getMonth](@date DATETIME)
RETURNS VARCHAR(10)
	BEGIN
		DECLARE @month VARCHAR(10) = FORMAT(@date, 'MMMM');
		RETURN @month
	END
GO
/****** Object:  UserDefinedFunction [dbo].[getSname]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[getSname](@string NVARCHAR(20))
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
GO
/****** Object:  UserDefinedFunction [dbo].[getValues]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[getValues](@X INT, @Y INT)
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
GO
/****** Object:  UserDefinedFunction [dbo].[yourMsg]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[yourMsg](@ID INT)
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
			SELECT @msg = 'First name & last name are NOT null'
			END
		RETURN @msg
	END
GO
/****** Object:  Table [dbo].[Student]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Student](
	[St_Id] [int] NOT NULL,
	[St_Fname] [nvarchar](50) NULL,
	[St_Address] [nvarchar](100) NULL,
	[St_Age] [int] NULL,
	[Dept_Id] [int] NULL,
	[St_super] [int] NULL,
	[St_Lname] [nvarchar](50) NULL,
 CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED 
(
	[St_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[Dept_Id] [int] NOT NULL,
	[Dept_Name] [nvarchar](50) NULL,
	[Dept_Desc] [nvarchar](100) NULL,
	[Dept_Location] [nvarchar](50) NULL,
	[Dept_Manager] [int] NULL,
	[Manager_hiredate] [date] NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[Dept_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  UserDefinedFunction [dbo].[getName]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[getName](@sid INT)
RETURNS TABLE
AS 
	RETURN
	( 
		SELECT concat(St_Fname,' ',St_Lname) AS FullName, Dept_Name FROM Student, Department	
		WHERE St_Id = @sid AND Student.Dept_Id = Department.Dept_Id
	)
GO
/****** Object:  UserDefinedFunction [dbo].[getDepData]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[getDepData](@format INT)
RETURNS TABLE
AS
	RETURN
	(
		SELECT Dept_Name, Dept_Manager, CONVERT(VARCHAR(50), Manager_hiredate, @format) 
		AS HIRE_DATE
		FROM Department
	)
GO
/****** Object:  Table [dbo].[Course]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Course](
	[Crs_Id] [int] NOT NULL,
	[Crs_Name] [nvarchar](50) NULL,
	[Crs_Duration] [int] NULL,
	[Top_Id] [int] NULL,
 CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
(
	[Crs_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stud_Course]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stud_Course](
	[Crs_Id] [int] NOT NULL,
	[St_Id] [int] NOT NULL,
	[Grade] [int] NULL,
 CONSTRAINT [PK_Stud_Course] PRIMARY KEY CLUSTERED 
(
	[Crs_Id] ASC,
	[St_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[display]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[display]
AS 
	SELECT CONCAT(St_Fname, ' ', St_Lname) AS fullName, Crs_Name AS courseName
	FROM Student, Course, Stud_Course
	WHERE Stud_Course.Crs_Id = Course.Crs_Id AND Student.St_Id = Stud_Course.St_Id
	AND Grade > 50
GO
/****** Object:  Table [dbo].[Topic]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Topic](
	[Top_Id] [int] NOT NULL,
	[Top_Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_Topic] PRIMARY KEY CLUSTERED 
(
	[Top_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ins_Course]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ins_Course](
	[Ins_Id] [int] NOT NULL,
	[Crs_Id] [int] NOT NULL,
	[Evaluation] [nvarchar](50) NULL,
 CONSTRAINT [PK_Ins_Course] PRIMARY KEY CLUSTERED 
(
	[Ins_Id] ASC,
	[Crs_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Instructor]    Script Date: 21/01/09 21:13:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Instructor](
	[Ins_Id] [int] NOT NULL,
	[Ins_Name] [nvarchar](50) NULL,
	[Ins_Degree] [nvarchar](50) NULL,
	[Salary] [money] NULL,
	[Dept_Id] [int] NULL,
 CONSTRAINT [PK_Instructor] PRIMARY KEY CLUSTERED 
(
	[Ins_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
