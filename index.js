import React, { Component } from "react";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native";

const PowerBi = (props) => {
  let configuration = this.setConfiguration(props);

  merge = (target, source) => {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object)
        Object.assign(source[key], this.merge(target[key], source[key]));
    }
    Object.assign(target || {}, source);
    return target;
  };

  setConfiguration = (props) => {
    const { accessToken, embedUrl, id } = props;
    let embedConfiguration = {
      type: "report",
      tokenType: 0,
      accessToken,
      embedUrl,
      id,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: true,
        layoutType: 1, // => models.LayoutType.MobilePortrait
      },
    };
    if ("language" in props) {
      embedConfiguration.settings.localeSettings = {
        language: props.language,
        formatLocale: props.language,
      };
    }

    if ("embedConfiguration" in props) {
      embedConfiguration = this.merge(
        embedConfiguration,
        props.embedConfiguration
      );
    }

    return JSON.stringify(embedConfiguration);
  };

  getTemplate = (configuration) => `<!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" maximum-scale=0.5>
        <script src="https://cdn.jsdelivr.net/npm/powerbi-client@2.8.0/dist/powerbi.min.js"></script>
        <style>
            html,
            body,
            #reportContainer {
                width: 100%;
                height:70%;
                margin: 0;
                background-color: 'white';
                -webkit-overflow-scrolling: touch;
               
            }
            iframe {
                border: 0px;
            }
        </style>
    </head>
    
    <body>
        <div id="reportContainer"></div>
        <script>
        var models = window['powerbi-client'].models;
        var config = ${configuration};
        var reportContainer = document.getElementById('reportContainer');
        var report = powerbi.embed(reportContainer, config);
        </script>
    </body>
    </html>`;

  const html = this.getTemplate(configuration);
  const { webViewStyle, containerStyle } = props;
  return (
    <SafeAreaView style={containerStyle}>
      <WebView
        source={{ html: html }}
        style={webViewStyle}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
      />
    </SafeAreaView>
  );
};

export default PowerBi;
