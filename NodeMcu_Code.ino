#include <ESP8266WiFi.h>
#include<ESP8266HTTPClient.h>
char* ssid = "Galaxy A50s2D72";
char* pass = "12345678";
char ip[] = "192.168.130.68";
int httpport = 3000;
int httpport2 = 80;
String url1 = "/api/mcu?pin=";
String url2 = "/trigger/dispose_bin/with/key/c9ppcW_It1ZnYKXYw7gfS2duU0IiCf6Elp4a5_7QxVp?value1=9776&value2=Saheednagar,bhubaneshwar,Odisha";//path name
String host2 = "maker.ifttt.com";
int ir = D7;
int val;

int PIN;

HTTPClient http;
WiFiClient client;
void setup() {
  // put your setup code here, to run once:
   pinMode(ir,INPUT);
   Serial.begin(9600);
  delay(100);
    Serial.println("Connecting to WiFi");
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("WiFi Connected");
  Serial.println(WiFi.localIP());


}

void loop() {
 String s=Serial.readStringUntil('\r');
  Serial.println(s);
  delay(2000);
  if(s=="YES")
  {
    s="";
   if (client.connect(ip, 3000))
        {
           PIN=1234;
           
               Serial.println("connected to server");
              // put your main code here, to run repeatedly:
   
      Serial.println(PIN);
      String link1 = url1 + (String)PIN;
      Serial.println(link1);
      client.println("GET "+ link1 +" HTTP/1.1");
      client.println("Host: " + (String)ip);
      client.println("connection: close");
      client.println();
        while(client.available())
      {
        char c = client.read();
        Serial.print(c);
    
      }
      if(!client.connected())
      {
        Serial.println("disconnected");
        client.stop();
      }
        }
  }
    val=digitalRead(ir);
    Serial.println(val);
    delay(500);
      if(val==LOW)
  {
    if (client.connect(host2, 80))
    {
       Serial.println("connected to server2");
       delay(100);
       Serial.println(url2);
        delay(100);
        http.begin(client,host2,httpport2,url2);
        int httpcode = http.GET();
        http.end();
        Serial.println("done");
        delay(1000);
         String c=http.getString();
          Serial.println(c);
           delay(1000);
      
    }
   
  }

}
