import {CognitoCallback, CognitoUtil, RegistrationUser} from "./cognito.service";
import {Injectable} from "@angular/core";

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class UserRegistrationService {
    constructor(public cUtil: CognitoUtil) {
    }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log("user: " + user);

        let attributeList = [];
       
        let lName = {
            Name: 'family_name',
            Value: user.lName
        };

        let dataEmail = {
            Name: 'email',
            Value: user.email
        };
        let dataCompanyName = {
            Name: 'custom:company_name',
            Value: user.companyName
        };
        let dataUserName = {
            Name: 'given_name',
            Value: user.name
        };
        let spireUserNameData = {
            Name: 'custom:spire_username',
            Value: user.spireUserName
        };
        // let dataUserLName = {
        //     Name: 'custom:name',
        //     Value: user.name
        // };
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataUserName));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(lName));
        
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
       attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(spireUserNameData));
        
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataCompanyName));
      

        this.cUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } 
            else
            {
                console.log("registered user: " + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) 
            {
                callback.cognitoCallback(err.message, null);
            }
            else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        let userData = {
            Username: username,
            Pool: this.cUtil.getUserPool()
        };

        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } 
            else 
            {
                callback.cognitoCallback(null, result);
            }
        });
    }

}