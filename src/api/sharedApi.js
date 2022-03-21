import Config from './config';


function getRoles(allRoles){
    let isAdmin = false;
    let isPrincipal = false;
    let isCampus = false;

    let roles = [];
    allRoles.forEach(function(item) {
        if(item == 'DAEP_ADMIN')
            isAdmin = true;
        else if(item == 'DAEP_SC')
            isCampus = true;
        else if(item == 'Principal')
            isPrincipal = true;
     
    });
    if(isAdmin === true) roles.push('Admin');
    if(isPrincipal === true) roles.push('Principal');
    if(isCampus === true) roles.push('Campus');
   
    return roles;
}

//changes was made

export class SharedApi {
    static getUserProperties() {
        return new Promise((resolve, reject) => {
        let userProps = {};
        let user = {firstName: '', lastName: '', fullName: '', employeeID: '', role: '', roles: [], campusID: '', campusName: ''};
        let currentLoginPromise = this.getCurrentUserLogin();
        currentLoginPromise.then(
            function (currentUserLogin) {
                user.loginId = currentUserLogin.loginName.replace('AD\\', '');
                user.fullName = currentUserLogin.name;
                user.roles = getRoles(currentUserLogin.roles);
                user.role = user.roles[0];
                userProps.user = user;
                resolve(userProps);
            });
        });      
    }

    static getCurrentUserLogin() {
        let serviceUrl = serviceUrl = Config.REST_URL_AD_AUTH;
        const parameters = {
            method: 'get',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
              'AppID': 'DAEP'
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
}

export default SharedApi
