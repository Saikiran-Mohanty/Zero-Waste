#include<Servo.h>
//#include <ESP8266WiFi.h>
//#include<ESP8266HTTPClient.h>
//char* ssid = "Galaxy A6+995F";
//char* pass = "ebpu0101";
//char ip[] = "192.168.43.30";
//int httpport = 3000;
//String url1 = "/api/mcu?pin=";//path name
//
//WiFiClient client;
Servo myservo;
int servopin = 9;

int echopin = 4;
int trigpin= 5;
float duration;
float distance;
int pos=90;
int PIN;

// extra ---
int cur_angle = 90;
int isOpened = 0; // false 
// extra ---

//void servo()
//{
//  for(pos=90;pos<=180;pos++)
//  {
//    myservo.write(pos);
//    delay(15);
//   
//  }
//myservo.write(180);
//int c =0
//}

void setup() {
  pinMode(servopin,OUTPUT);
  pinMode(echopin, INPUT);
  pinMode(trigpin,OUTPUT);
//  pinMode(buzzer,OUTPUT);
//  pinMode(led,OUTPUT);
//  digitalWrite(led,HIGH);
myservo.attach(servopin);
  Serial.begin(9600);
  delay(100);
//  Serial.println("Connecting to WiFi");
//  WiFi.begin(ssid, pass);
//  while (WiFi.status() != WL_CONNECTED) {
//    Serial.print(".");
//    delay(500);
//  }
//  Serial.println("WiFi Connected");
//  Serial.println(WiFi.localIP());

  

}

void loop() {
  
  digitalWrite(trigpin,LOW);
  delayMicroseconds(10);
   digitalWrite(trigpin,HIGH);
  delayMicroseconds(10);
   digitalWrite(trigpin,LOW);
  delayMicroseconds(10);
  duration = pulseIn(echopin,HIGH);
 // Serial.println(duration);
  distance= ((34400*duration)/(2*1000000));
  
  if(distance<=30)
  {
      while(cur_angle < 180)
      {
          cur_angle += 1;
          myservo.write(cur_angle);
          delay(15);
      }
      if(isOpened == 0)
      {
          //Serial.println(PIN);
          // GET request
//          if (client.connect(ip, 3000))
//        {
//           PIN=5970;
//               Serial.println("connected to server");
//              // put your main code here, to run repeatedly:
//   
//
//      String link1 = url1 + (String)PIN;
//      client.println("GET "+ link1 +" HTTP/1.1");
//      client.println("Host: " + (String)ip);
//      client.println("connection: close");
//      client.println();
//        while(client.available())
//      {
//        char c = client.read();
//        Serial.print(c);
//    
//      }
//      if(!client.connected())
//      {
//        Serial.println("disconnected");
//        client.stop();
//      }
    Serial.println("YES");
      
      
      
        
          isOpened = 1;
      }
      delay(5000);
  }
 else {
     while(cur_angle > 90){
        cur_angle -= 1;
        myservo.write(cur_angle);
        delay(15);
     }
     isOpened = 0;
 }
