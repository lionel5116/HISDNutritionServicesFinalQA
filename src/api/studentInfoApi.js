import React, { Component } from 'react'
import Config from './config';
import axios from 'axios';


export class studentInfoApi {
   
    static getSampleSudentData(){
        let serviceUrl  = '';
        serviceUrl = Config.REST_URL +"api/StudentEntryData/getStudentInformationDataTop25Rows";
         console.log(serviceUrl);
        const parameters = {
            method: 'get',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
              }
        }; 

        return new Promise((resolve, reject) => {
            fetch( serviceUrl, parameters) 
            .then(function (response) {
                resolve(response.json());
            })
            .catch(function (error) {
                reject(error);
            });
        });     
    }


    
   async  getSampleSudentDataAxios(){
       var url = Config.REST_URL + '/api/StudentEntryData/getStudentInformationDataTop25Rows/'
       return await axios.get(url)
        .then(res => {
              return res.data;
        });

    }

    async  getAllSudentDataAxios(SchoolYear){
        var url = Config.REST_URL + '/api/StudentEntryData/getAllStudentInformationData/'
        url += SchoolYear;
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     async  getSchoolTrainingInformation(SchoolYear){
        var url = Config.REST_URL + '/api/StudentEntryData/getSchoolTrainingInformation/'
        url += SchoolYear;
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }


     async  getAllSudentDataTEMPIDSAxios(){
        var url = Config.REST_URL + '/api/StudentEntryData/getAllStudentInformationDataTEMPIDS/'
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     async  getAttachmentsAxios(studentID){
        var url = Config.REST_URL + '/api/UploadFiles/getAttachments/'
        url += studentID
        //console.log(url)
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     async  fetchblFoodsToBeOmmitedData(){
        var url = Config.REST_URL + '/api/Admin/fetchFoodsToBeOmmited/'
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     async  fetchSchoolListings(){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchSchoolListings/'
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     async  fetchSchoolYears(){
        var url = Config.REST_URL + '/api/Admin/fetchSchoolYears/'
        return await axios.get(url)
         .then(res => {
               return res.data;
         });
 
     }

     //
     async  fetchSearchData(_SEARCH_STRING_){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchStudentEntryDataAdminAndSearch/'
        url +=_SEARCH_STRING_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  deleteAttachment(_id){
        var url = Config.REST_URL + '/api/UploadFiles/deleteAttachment/'
        url +=_id;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue procesing delete of attachment.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchInactiveStudents(){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchInactiveStudents/'
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }


     async  fetchSearchData_LIKE_CLAUSES(_SEARCH_STRING_){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchStudentEntryDataAdminAndSearchLikeClauses/'
        url +=_SEARCH_STRING_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }


     
     async  fetchSearchData_LIKE_CLAUSES_SearchObject(_SEARCH_OBJECT_){
        var url = Config.REST_URL + '/api/StudentEntryData/studentSearchScreenLikeClausesUsingObject/'
        url += _SEARCH_OBJECT_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }
     async  fetchSearchData_LIKE_CLAUSES_SearchObjectCurrentYear(_SEARCH_OBJECT_){
        var url = Config.REST_URL + '/api/StudentEntryData/studentSearchScreenLikeClausesUsingObjectCurrentYear/'
        url += _SEARCH_OBJECT_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchStudentTempIDRecords(){
        var url = Config.REST_URL + '/api/Admin/fetchStudentTempIDRecords/'
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchSearchDDListData(_SEARCH_STRING_){
        var url = Config.REST_URL + '/api/Admin/fetchSearchDDListData/'
        url +=_SEARCH_STRING_;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  getCurrentSchoolYear(){
        var url = Config.REST_URL + '/api/Admin/getCurrentSchoolYear/'
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible bad endpoint " + err)
          return []
        }
 
     }

     async  fetchMAXSchoolYear(){
        var url = Config.REST_URL + '/api/Admin/fetchMAXSchoolYear/'
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible bad endpoint " + err)
          return []
        }
 
     }

     async  UpdateDDListItem(strFieldValues){
        var url = Config.REST_URL + '/api/Admin/UpdateDDListItem/'
        url +=strFieldValues;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  ADD_DDListItem(strFieldValues){
        var url = Config.REST_URL + '/api/Admin/ADD_DDListItem/'
        url +=strFieldValues;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  UpdateStudentTempID(strFieldValues){
        var url = Config.REST_URL + '/api/Admin/UpdateStudentTempID/'
        url +=strFieldValues;
        console.log(url)
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchForExisingStudent(studentID){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchForExisingStudent/'
        url +=studentID;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return -1
        }
 
     }

     async  DeleteDDListItem(strFieldValues){
        var url = Config.REST_URL + '/api/Admin/DeleteDDListItem/'
        url +=strFieldValues;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  DeleteStudentRecord(strSQLStatement){
        var url = Config.REST_URL + '/api/Admin/DeleteStudentRecord/'
        url +=strSQLStatement;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }


     async  archiveSchoolYear(SchoolYear){
        var url = Config.REST_URL + '/api/Admin/ArchiveSchoolYear/'
        url +=SchoolYear;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue completeting request to Archive School Year.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchLogs(){
        var url = Config.REST_URL + '/api/Admin/fetchLogs/'
        
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     //fetchUserRoleInfo
     async  fetchUserRoleInfo(adUserID){
        var url = Config.REST_URL + '/api/Admin/getUserRoleInformation/'
        url+= adUserID;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  getMenuCodeList(_menuColor){
        var url = Config.REST_URL + '/api/Admin/getMenuCodeList/'
        url+= _menuColor;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }


     async  writeTrainingRecord(trainingRecord){
      
       var url = Config.REST_URL + '/api/Communications/saveTrainingNotes/';
       
       try {
        return await axios.post(url, trainingRecord)
        .then(res => {
            return res.data;
        });
       } catch(err) {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return 0
       }
      
    }

    async  AddOrUpdateStudentRecord(studentRecord){
       var url = Config.REST_URL + '/api/StudentEntryData/AddOrUpdateStudentRecord/';
       try {
            return await axios.post(url, studentRecord)
            .then(res => {
                return res.data;
            });
       } catch(err) {
        console.log("Issue writing student record error = : " + err)
        return false;
       }
      
    }

    async  AddOrUpdateStudentRecordFromSearch(studentRecord){
        var url = Config.REST_URL + '/api/StudentEntryData/AddOrUpdateStudentRecordFromSearch/';
        try {
             return await axios.post(url, studentRecord)
             .then(res => {
                 return res.data;
             });
        } catch(err) {
         console.log("Issue writing student record error = : " + err)
         return false;
        }
       
     }

    async  insertLogData(Log){
        var url = Config.REST_URL + '/api/Admin/insertLogData/';
        try {
             return await axios.post(url, Log)
             .then(res => {
                 return res.data;
             });
        } catch(err) {
         console.log("Issue writing log record error = : " + err)
         return false;
        }
       
     }

    async  fetchSingeRecordByRecordID(id){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchSingeRecordByRecordID/'
        url +=id;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }


     async  fetchSchoolTrainingNotes(_school,_noteType,_schoolYear){
        var url = Config.REST_URL + '/api/Admin/fetchSchoolTrainingNotes/'
        url +=_school;
        url += ",";
        url += _noteType;
        url += ",";
        url += _schoolYear;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }



     async  fetchCommNotes(_studentID,_schoolYear){
        var url = Config.REST_URL + '/api/Admin/fetchCommNotes/'
        url +=_studentID;
        url += ",";
        url += "Communication";
        url += ",";
        url += _schoolYear;
        //console.log(url);
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

     async  fetchSingleStudentByStudentNaturalKey(StudentNaturalKey){
        var url = Config.REST_URL + '/api/StudentEntryData/fetchSingleStudentByStudentNaturalKey/'
        url +=StudentNaturalKey;
        try
        {
            return await axios.get(url)
            .then(res => {
                return res.data;
            });
        } catch (err)
        {
          console.log("Issue fetching data.. possible url invalid character sent: " + err)
          return []
        }
 
     }

}

export default studentInfoApi
