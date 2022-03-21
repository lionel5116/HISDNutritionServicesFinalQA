import axios from "axios";
export default axios.create({
  baseURL: "'http://localhost:54751/api/UploadFiles/upload/",
  headers: {
    "Content-type": "application/json"
  }
});