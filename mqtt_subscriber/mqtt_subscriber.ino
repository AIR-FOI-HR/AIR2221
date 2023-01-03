#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* mqtt_server = "test.mosquitto.org";

WiFiClient espClient22;
PubSubClient client(espClient22);

void setup()
{
  Serial.begin(115200);
  Serial.println();

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
  }
  else{
    Serial.println("Neuspješno spajanje na MQTT server");
  }
}

void loop() {

}

