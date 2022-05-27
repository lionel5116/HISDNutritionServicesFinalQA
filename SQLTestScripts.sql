/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Year]
  FROM [HISDNutritionalServices].[dbo].[SchoolYears]
  order by Year desc

  DELETE 
  SchoolYears
  WHERE 
  Year = '2022-2023'


  
INSERT INTO SchoolYears (Year) VALUES ('2020-2021')

SELECT  max(a.[Year]) as Year
FROM SchoolYears a


/*
SELECT TOP (1000) [LastName]
      ,[FirstName]
	  ,School
	  ,SchoolYear
      ,[Archive]
      ,[ArchiveDate]
      ,[Menu_Code_Custom]
      ,[FTBO_Custom]
  FROM [HISDNutritionalServices].[dbo].[StudentEntryData]
*/


/*UPDATE StudentEntryData
SET
Archive = NULL,
ArchiveDate = NULL
*/
