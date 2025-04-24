// #include <SPI.h>
// #include <Adafruit_PN532.h>
// #include <DHT.h>

// #define DHTPIN 2        // DHT22 data pin
// #define DHTTYPE DHT22   // Type of DHT sensor

// #define PN532_SCK  (13)
// #define PN532_MOSI (11)
// #define PN532_SS   (10)
// #define PN532_MISO (12)

// DHT dht(DHTPIN, DHTTYPE);
// Adafruit_PN532 nfc(PN532_SS);

// void setup(void) {
//   Serial.begin(115200);
//   dht.begin();

//   Serial.println("Initializing PN532 NFC module...");
//   nfc.begin();

//   uint32_t versiondata = nfc.getFirmwareVersion();
//   if (!versiondata) {
//     Serial.print("Didn't find PN532 board");
//     while (1);
//   }

//   // Set the max packet length
//   nfc.SAMConfig();
//   Serial.println("PN532 Ready.");
// }

// void loop(void) {
//   float h = dht.readHumidity();
//   float t = dht.readTemperature();

//   if (isnan(h) || isnan(t)) {
//     Serial.println("Failed to read from DHT sensor!");
//     delay(2000);
//     return;
//   }

//   // Format message
//   String message = "Temp: " + String(t, 1) + "C\nHum: " + String(h, 1) + "%";
//   Serial.println("Writing to NFC: " + message);

//   // Clear previous tag data
//   nfc.ntag2xx_WritePage(4, (uint8_t *)"\x03\x0F\xd1\x01");
//   delay(100);

//   // Write formatted message to NFC (as NDEF text)
//   uint8_t ndefprefix[] = {
//     0x03, // NDEF message
//     0x0F, // Length
//     0xD1, 0x01, 0x0B, 0x54, 0x02, 'e', 'n'
//   }; // "en" = English language tag

//   nfc.ntag2xx_WritePage(4, ndefprefix);
//   nfc.ntag2xx_WritePage(5, (uint8_t *)message.substring(0, 4).c_str());
//   nfc.ntag2xx_WritePage(6, (uint8_t *)message.substring(4, 8).c_str());
//   nfc.ntag2xx_WritePage(7, (uint8_t *)message.substring(8, 12).c_str());

//   Serial.println("Data written. Bring phone near module.");

//   delay(5000); // wait 5 seconds before sending again
// }
// #include <SPI.h>
// #include <Adafruit_PN532.h>
// #include <Adafruit_Sensor.h>
// #include <DHT.h>

// #define DHTPIN 2       // DHT22 data pin
// #define DHTTYPE DHT22
// DHT dht(DHTPIN, DHTTYPE);

// // PN532 SPI pins for Arduino Uno
// #define PN532_SCK  (13)
// #define PN532_MOSI (11)
// #define PN532_SS   (10)
// #define PN532_MISO (12)
// Adafruit_PN532 nfc(PN532_SS);

// void setup() {
//   Serial.begin(115200);
//   dht.begin();

//   nfc.begin();
//   uint32_t versiondata = nfc.getFirmwareVersion();
//   if (!versiondata) {
//     Serial.println("Didn't find PN532 board");
//     while (1);
//   }

//   nfc.SAMConfig();
//   Serial.println("PN532 NFC ready. Writing DHT22 data to NFC...");
// }

// void loop() {
//   float h = dht.readHumidity();
//   float t = dht.readTemperature();

//   if (isnan(h) || isnan(t)) {
//     Serial.println("Failed to read from DHT sensor!");
//     delay(2000);
//     return;
//   }

//   // Format message
//   String message = "T:" + String(t, 1) + ",H:" + String(h, 1);
//   Serial.print("Writing to NFC: ");
//   Serial.println(message);

//   // Convert to char buffer
//   char dataBuffer[32];
//   message.toCharArray(dataBuffer, 32);

//   // Write to tag using NTAG pages (each page is 4 bytes)
//   for (int i = 0; i < 8; i++) {
//     uint8_t pageData[4] = {0, 0, 0, 0};
//     for (int j = 0; j < 4; j++) {
//       int index = i * 4 + j;
//       if (index < strlen(dataBuffer)) {
//         pageData[j] = dataBuffer[index];
//       }
//     }
//     if (!nfc.ntag2xx_WritePage(4 + i, pageData)) {
//       Serial.print("Failed to write page "); Serial.println(4 + i);
//     }
//   }

//   Serial.println("Data written to NFC moduleS!");
//   delay(5000); // Write every 5 seconds
// }
// Version below is for testing with iphone -> need to write data in specific format
// #include <SPI.h>
// #include <Adafruit_PN532.h>
// #include <DHT.h>

// #define DHTPIN 2        // DHT22 data pin
// #define DHTTYPE DHT22   // Type of DHT sensor

// #define PN532_SCK  (13)
// #define PN532_MOSI (11)
// #define PN532_SS   (10)
// #define PN532_MISO (12)

// DHT dht(DHTPIN, DHTTYPE);
// Adafruit_PN532 nfc(PN532_SS);

// void setup(void) {
//   Serial.begin(115200);
//   dht.begin();

//   Serial.println("Initializing PN532 NFC module...");
//   nfc.begin();

//   uint32_t versiondata = nfc.getFirmwareVersion();
//   if (!versiondata) {
//     Serial.print("Didn't find PN532 board");
//     while (1);
//   }

//   // Set the max packet length
//   nfc.SAMConfig();
//   Serial.println("PN532 Ready.");
  
//   // Set the module to peer-to-peer mode (for phone detection)
//   nfc.SAMConfig();
//   Serial.println("Module is in P2P mode, waiting for phone...");
// }

// void loop(void) {
//   uint8_t success;
//   uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 }; // UID of the NFC tag or phone
  
//   success = nfc.inListPassiveTarget(); // Try to detect the phone
//   if (success) {
//     Serial.println("Phone detected!");
    
//     // Read temperature and humidity from DHT sensor
//     float h = dht.readHumidity();
//     float t = dht.readTemperature();

//     if (isnan(h) || isnan(t)) {
//       Serial.println("Failed to read from DHT sensor!");
//       delay(2000);
//       return;
//     }

//     // Format message
//     String message = "Temp: " + String(t, 1) + "C\nHum: " + String(h, 1) + "%";
//     Serial.println("Sending data to phone: " + message);
    
//     // Emulate an NFC tag and send data
//     nfc.ntag2xx_WritePage(4, (uint8_t *)"\x03\x0F\xd1\x01");  // Prefix data for NFC tag
//     nfc.ntag2xx_WritePage(5, (uint8_t *)message.substring(0, 4).c_str());  // Send data part 1
//     nfc.ntag2xx_WritePage(6, (uint8_t *)message.substring(4, 8).c_str());  // Send data part 2
//     nfc.ntag2xx_WritePage(7, (uint8_t *)message.substring(8, 12).c_str());  // Send data part 3

//     Serial.println("Data written to NFC. Bring phone near module.");
//   }

//   delay(5000); // wait 5 seconds before scanning again
// }
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

  // Set the PN532 to NFC tag emulation mode (Type 2 Tag)
  nfc.SAMConfig();
  Serial.println("PN532 Ready. Emulating NFC Type 2 Tag.");
}

void loop(void) {
  // Wait for an NFC reader (phone) to come near
  uint8_t success;
  uint8_t uid[] = { 0xDE, 0xAD, 0xBE, 0xEF };  // UID for the tag (any unique UID)
  
  success = nfc.inListPassiveTarget();
  if (success) {
    Serial.println("NFC reader detected the tag!");

    // Get temperature and humidity from DHT sensor
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Prepare the response message (Temperature and Humidity)
    String message = "Temp: " + String(t, 1) + "C\nHum: " + String(h, 1) + "%";
    
    // Emulate an NFC Type 2 tag and write the message to it
    // Emulate an NDEF message format for a simple text
    uint8_t ndefMessage[] = {
      0xD1, 0x01, 0x0B, 0x54, 0x02, 'e', 'n', // NDEF Header with "en" for language code
      0x00, // Payload length (to be filled later)
      0x00, // Payload: placeholder for actual data
      0x00, // Placeholder byte to be replaced with actual data length
    };
    
    // Copy the message data into the NDEF message
    int messageLength = message.length();
    ndefMessage[8] = messageLength;  // Set the length byte
    for (int i = 0; i < messageLength; i++) {
      ndefMessage[9 + i] = message[i]; // Copy the message data
    }

    // Write the NDEF message to the tag
    nfc.ntag2xx_WritePage(4, ndefMessage);
    Serial.println("Sent sensor data back to the reader (iPhone).");

    delay(1000);
  }
  delay(100);  // Wait a bit before checking again
}





