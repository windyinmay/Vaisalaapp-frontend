#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include <NfcAdapter.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT_Unified dht(DHTPIN, DHTTYPE);
PN532_I2C pn532_i2c(Wire);
NfcAdapter nfc(pn532_i2c);

void setup() {
  Serial.begin(9600);
  dht.begin();
  nfc.begin();
}

void loop() {
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  float temperature = event.temperature;
  dht.humidity().getEvent(&event);
  float humidity = event.relative_humidity;

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  String payload = "Temperature: " + String(temperature) + "°C\nHumidity: " + String(humidity) + "%";
  Serial.println(payload);

  if (nfc.tagPresent()) {
    NdefMessage message = NdefMessage();
    message.addTextRecord(payload);
    bool success = nfc.write(message);
    if (success) {
      Serial.println("NFC tag written successfully.");
    } else {
      Serial.println("Failed to write to NFC tag.");
    }
  }

  delay(2000);
}
