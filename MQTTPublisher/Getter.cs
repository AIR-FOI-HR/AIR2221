using System;
using MQTTnet;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

HttpClient client = new HttpClient();
//var response = client.GetAsync("docker.hub/api/getapi");

var myData = new
{
    userId = "testUserId",
    deviceId = "testDeviceId"
};
//Tranform it to Json object
string jsonData = JsonConvert.SerializeObject(myData);

Publisher publisher = new Publisher();
await publisher.publish(jsonData);
