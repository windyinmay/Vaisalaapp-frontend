/* How to use the DHT-22 sensor with Arduino uno
   Temperature and humidity sensor
   More info: https://github.com/adafruit/DHT-sensor-library

*/

#include <DHT.h>

#define DHTPIN 2       // Pin connected to the DHT sensor
#define DHTTYPE DHT22  // DHT 22 (AM2302)

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Serial.begin(9600);
    dht.begin();
}


void loop() {
    float hum = dht.readHumidity();
    float temp = dht.readTemperature(); // Default is Celsius

    // Check if any reads failed and exit early (to try again).
    if (isnan(hum) || isnan(temp)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    Serial.print("Humidity: ");
    Serial.print(hum);
    Serial.print(" %, Temp: ");
    Serial.print(temp);
    Serial.println(" °C");

    delay(2000); // Wait a few seconds between measurements.
}
