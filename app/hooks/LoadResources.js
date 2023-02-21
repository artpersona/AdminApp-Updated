import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';

export default function LoadResources() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'SFUI Light': require('../assets/fonts/SFUIText-Light.ttf'),
          'SFUI Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadAssets();
  }, []);

  return isReady;
}