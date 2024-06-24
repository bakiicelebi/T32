
![Logo](path/to/sales-report.png)

    
# T32 GROCERY 
## MOBILE CASH REGISTER APPLICATION

- [About the Project](#about-the-project)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Libraries and Plugins Used](#libraries-and-plugins-used)
- [Usage](#usage)
- [Mock API with Mockoon](#mock-api-with-mockoon)
- [API Using](#api-using)
- [Screenshots](#screenshots)
- [Contributing](#contributing)


## About the Project
T32 GROCERY is a mobile Cash Register application designed for grocery stores. The app allows users to efficiently manage saling, and generate sales reports with ease.


## Features
- Handle saling
- Mock Grocery Data
- View sales reports
- User-friendly interface
- Displaying Graphs

## Requirements
- Node.js
- React Native CLI
- Android Studio or Xcode (for iOS)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bakiicelebi/T32-GROCERY.git
    ```
2. Navigate to the project directory:
    ```bash
    cd T32-GROCERY
    ```
3. Install the necessary packages:
    ```bash
    npm install
    ```

## Libraries and Plugins Used

- [React Native](https://reactnative.dev/) (`react-native`: ^0.73.7)
- [React Navigation](https://reactnavigation.org/)
  - `@react-navigation/native`: ^6.1.17
  - `@react-navigation/stack`: ^6.3.29
  - `@react-navigation/bottom-tabs`: ^6.5.20
  - `@react-navigation/material-bottom-tabs`: ^6.2.28
  - `@react-navigation/native-stack`: ^6.9.26
- [Axios](https://axios-http.com/): ^1.7.2
- [React Native Paper](https://callstack.github.io/react-native-paper/): ^5.12.3
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons): ^10.1.0
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage): ^1.23.1
- [@react-native-community/blur](https://github.com/react-native-community/react-native-blur): ^4.4.0
- [axios](https://axios-http.com/): ^1.7.2
- [i18next](https://www.i18next.com/): ^23.11.5
- [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native): ^6.7.2
- [native-base](https://nativebase.io/): ^3.4.28
- [react-i18next](https://react.i18next.com/): ^14.1.2
- [react-native-animated-numbers](https://github.com/n4kz/react-native-animated-numbers): ^0.6.0
- [react-native-barcode-mask](https://github.com/alesgenova/react-native-barcode-mask): ^1.2.4
- [react-native-biometrics](https://github.com/SelfLender/react-native-biometrics): ^3.0.1
- [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv): ^3.4.11
- [react-native-file-viewer](https://github.com/vinzscam/react-native-file-viewer): ^2.1.5
- [react-native-fs](https://github.com/itinance/react-native-fs): ^2.20.0
- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler): ^2.16.0
- [react-native-gifted-charts](https://github.com/FaridSafi/react-native-gifted-charts): ^1.4.10
- [react-native-html-to-pdf](https://github.com/christopherdro/react-native-html-to-pdf): ^0.12.0
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient): ^2.8.3
- [react-native-nfc-manager](https://github.com/whitedogg13/react-native-nfc-manager): ^3.14.14
- [react-native-pager-view](https://github.com/callstack/react-native-pager-view): ^6.3.0
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context): ^4.10.1
- [react-native-screens](https://github.com/software-mansion/react-native-screens): ^3.32.0
- [react-native-share](https://github.com/react-native-share/react-native-share): ^10.2.1
- [react-native-sound](https://github.com/zmxv/react-native-sound): ^0.11.2
- [react-native-svg](https://github.com/react-native-svg/react-native-svg): ^12.5.1
- [react-native-swiper](https://github.com/leecade/react-native-swiper): ^1.6.0
- [react-native-tab-view](https://github.com/react-native-tab-view/react-native-tab-view): ^3.5.2
- [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera): ^4.0.3

## Usage
1. To start the application, run:
    ```bash
    npm start
    ```
2. Open the app on an emulator or a physical device:
    ```bash
    npx react-native run-android  # for Android
    npx react-native run-ios      # for iOS
    ```
## Mock API with Mockoon

To simulate API responses during development, you can use Mockoon, a tool for quickly creating mock APIs. Follow these steps to set up a mock API for T32 GROCERY:

1. **Download and Install Mockoon**:
   - Download Mockoon from [Mockoon's official website](https://mockoon.com/).
   - Install Mockoon on your machine.

2. **Create a New Mock API**:
   - Open Mockoon and click on the "Create a new mock API" button.
   - Define endpoints for your mock API that correspond to your application's backend API endpoints (e.g., `/receipts`, `/categories`, etc.).
   - For each endpoint, define response data in JSON format that resembles the actual data structure you expect from your backend.

3. **Configure Application to Use Mock API**:

- Using mock data inside the project, you can make bodies your endpoints.


### API USING


#### API With .env

- API_CATEGORIES_URL = http://<your IPv4 Address>:<your Mockoon Port>/Categories
- API_BASE_URL = http://<your IPv4 Address>:<your Mockoon Port>/
- API_CAMPAIGNS_URL = http://<your IPv4 Address>:<your Mockoon Port>/Campaigns
- API_STATUS_URL = http://<your IPv4 Address>:<your Mockoon Port>/status
- EMAIL_SERVICE_KEY = <your email service key>
- EMAIL_TEMPLATE_KEY = <your email template key>
- EMAIL_PUBLIC_KEY = <your email public key>

#### Example using
``` tsx
  const { data: responseData } = await axios.get(`${url}`)
```

## Screenshots
Include screenshots of application here.

![Login Screen](path/to/login-screen.png)
*Login Screen*

![Dashboard](path/to/dashboard.png)
*Dashboard*

![Product Management](path/to/product-management.png)
*Product Management*

![Sales Report](path/to/sales-report.png)
*Sales Report*


## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.
