#include <ArduinoJson.h>
#include <ArduinoJson.hpp>
#include <Adafruit_NeoPixel.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#define LED_PIN 2

const char* mqtt_server = "test.mosquitto.org";

WiFiClient espClient1;
PubSubClient client(espClient1);

Adafruit_NeoPixel led(1, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup()
{
  Serial.begin(115200);
  Serial.println();

  led.begin();

  WiFi.begin("HUAWEI-2.4G-6gxh", "ck4GMZeq");

  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqtt_server, 1883); 

  if(client.connect("myClientID"))
  {
    Serial.println("Uspješno spajanje");
    client.setCallback(subscribeReceive);

  }
  else{
    Serial.println("Neuspješno spajanje na MQTT server");
  }
}

void loop() {
  client.loop();
 
  client.subscribe("foi/air2221");
}

void subscribeReceive(char* topic, byte* payload, unsigned int length)
{
  Serial.print("Topic: ");
  Serial.println(topic);
 
  Serial.print("Message: ");
  String messageTemp;
  for(int i = 0; i < length; i ++)
  {
    Serial.print(char(payload[i]));
    messageTemp += (char)payload[i];

  }

  StaticJsonDocument<128> doc;

  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  const char* status = doc["status"]; // "paid"
  const char* userId = doc["userId"]; // "testUserId"
  const char* deviceId = doc["deviceId"]; // "testDeviceId"
  
  if(String(topic)== "foi/air2221"){
    if(String(deviceId)=="testDeviceId"){
    led.setPixelColor(0, led.Color(0, 0, 255));
    led.show();
    delay(5000);

    led.setPixelColor(0, led.Color(0, 0, 0));
    led.show();
    }
  }
}
