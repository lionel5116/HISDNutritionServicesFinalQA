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
}

export default studentInfoApi
