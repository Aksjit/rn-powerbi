**Power Bi for React Native**

This component opens PowerBI reports. It uses the WebView on Android and iOS to display them.

**Installation**

$ npm install --save rn-powerbi

**Usage**

import PowerBi from 'rn-powerbi';

For a report to display you need at least five parts: AccessToken, Embed URL and the ID of the report. (these can be obtained thru the rest api)

<PowerBi
  accessToken="JITSOIENSSS...NAKSHEISAYA="
  embedUrl="https://app.powerbi.com/reportEmbed?reportId=bdddddddd-dddw123165c3b43&groupId=333s9bay3ee-da25-452e-b220-2134939383"
  id="333s9bay3ee-da25-452e-b220-2134939383"
/>


**Author**
Aksjit





