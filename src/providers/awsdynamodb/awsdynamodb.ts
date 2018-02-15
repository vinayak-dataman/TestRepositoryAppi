
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the AwsdynamodbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let AWS = require("aws-sdk");

@Injectable()

export class AwsdynamodbProvider {

  AWS = require("aws-sdk");
  tableName:any;
  numberOfItems: any;
  constructor(public http: Http) 
  {
    console.log('Hello AwsdynamodbProvider Provider');
    this.tableName = "appiforspire-mobilehub-420648748-appi4spire_users";
        this.numberOfItems = 10;

        const awsDefaultRegion =  "us-east-1";

        let dynamoDbParams = {
          accessKeyId: "AKIAIYCAKTRXKBLUMG6Q",
          secretAccessKey: "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",
            region: awsDefaultRegion
        };

        AWS.config.update(dynamoDbParams);
  }


  // Get All Record from Dynamo DB user table ... 
  getAll(){
    return new Promise((resolve, reject)=>{
        let dynamoClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
        const params1 = { 
            TableName: this.tableName, 
          
        };
      
        dynamoClient.scan(params1, (err, data) => {
            if (err){
                reject(err);
            }
            else{
                resolve(data.Items);
            }
        });
    });
}

}
