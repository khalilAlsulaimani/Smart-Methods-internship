int val =0;
int preVale=0;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  

}

void loop() {
  // put your main code here, to run repeatedly:

  if(val != preVale){
    Serial.println(val);
    preVale = val;
  }

  delay(100);

}
