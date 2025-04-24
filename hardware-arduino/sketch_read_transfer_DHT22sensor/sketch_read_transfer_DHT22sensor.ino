#include <SPI.h>
#include <Adafruit_PN532.h>
#include <DHT.h>

#define DHTPIN 2        // DHT22 data pin
#define DHTTYPE DHT22   // Type of DHT sensor

#define PN532_SCK  (13)
#define PN532_MOSI (11)
#define PN532_SS   (10)
#define PN532_MISO (12)

DHT dht(DHTPIN, DHTTYPE);
Adafruit_PN532 nfc(PN532_SS);

void setup(void) {
  Serial.begin(115200);
  dht.begin();

  Serial.println("Initializing PN532 NFC module...");
  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.print("Didn't find PN532 board");
    while (1);
  }

  // Set the max packet length
  nfc.SAMConfig();
  Serial.println("PN532 Ready.");
}

void loop(void) {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    delay(2000);
    return;
  }

  // Format message
  String message = "Temp: " + String(t, 1) + "C\nHum: " + String(h, 1) + "%";
  Serial.println("Writing to NFC: " + message);

  // Clear previous tag data
  nfc.ntag2xx_WritePage(4, (uint8_t *)"\x03\x0F\xd1\x01");
  delay(100);

  // Write formatted message to NFC (as NDEF text)
  uint8_t ndefprefix[] = {
    0x03, // NDEF message
    0x0F, // Length
    0xD1, 0x01, 0x0B, 0x54, 0x02, 'e', 'n'
  }; // "en" = English language tag

  nfc.ntag2xx_WritePage(4, ndefprefix);
  nfc.ntag2xx_WritePage(5, (uint8_t *)message.substring(0, 4).c_str());
  nfc.ntag2xx_WritePage(6, (uint8_t *)message.substring(4, 8).c_str());
  nfc.ntag2xx_WritePage(7, (uint8_t *)message.substring(8, 12).c_str());

  Serial.println("Data written. Bring phone near module.");

  delay(5000); // wait 5 seconds before sending again
}
