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

    async  getAllSudentDataAxios(){
        var url = Config.REST_URL + '/api/StudentEntryData/getAllStudentInformationData/'
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

     async  getAttachmentsAxios(){
        var url = Config.REST_URL + '/api/StudentEntryData/getAttachments/'
        console.log(url)
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

     async  writeTrainingRecord(trainingRecord){
        console.log(url)
       var url = Config.REST_URL + '/api/Communications/saveTrainingNotes/';

       try {
        return await axios.post(url, trainingRecord)
        .then(res => console.log(res.data));
       } catch(err) {
        console.log("Issue fetching data.. possible url invalid character sent: " + err)
       }
      
    }

}

export default studentInfoApi
