using System;
using MQTTnet;
using MQTTnet.Client;
using System.Threading;
using System.Threading.Tasks;

class Publisher
{
     static MqttFactory mqttFactory = new MqttFactory();
     static IMqttClient client = mqttFactory.CreateMqttClient();
     static MqttClientOptions options = new MqttClientOptionsBuilder()
                   .WithClientId(Guid.NewGuid().ToString())
                   .WithTcpServer("test.mosquitto.org", 1883)
                   .WithCleanSession()
                   .Build();

    public async Task publish(string payload)
    {

        await client.ConnectAsync(options);
        Console.WriteLine("Client connected: " + client.IsConnected );

        var applicationMessage = new MqttApplicationMessageBuilder()
                            .WithTopic("foi/air2221")
                            .WithPayload(payload)
                            .Build();
       await client.PublishAsync(applicationMessage);
    }
}
