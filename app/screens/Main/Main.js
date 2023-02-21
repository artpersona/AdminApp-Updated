import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

import FirebaseProvider from '../../shared/contexts/FirebaseContext';
import AuthProvider from '../../shared/contexts/AuthContext';
import BranchProvider from '../../shared/contexts/BranchContext';
import OrderProvider from '../../shared/contexts/OrderContext';
import StoreMenuProvider from '../../shared/contexts/StoreMenuContext';
import LocationProvider from '../../shared/contexts/LocationContext';
import ProductProvider from '../../shared/contexts/ProductContext';
import ModalView from '../../components/ModalView/ModalView';
import MainNavigation from './MainNavigation';

export default function Main() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <FirebaseProvider>
        <AuthProvider>
          <BranchProvider>
            <StoreMenuProvider>
              <LocationProvider>
                <ProductProvider>
                  <OrderProvider>
                    <NavigationContainer>
                      {/* <ModalView
                        visible={Updates.isAvailable}
                        onClose={() => {}}
                        ok_text={!Updates.isFetching ? 'UPDATE' : 'Please Wait'}
                        onPress1={() => Updates.updateToLatest()}
                        width="65%"
                        animation="bounceIn"
                        title="Heads up"
                        logoName="error"
                        description={
                          Updates.isFetching
                            ? 'Downloading latest update...'
                            : 'A new update is available.'
                        }
                      /> */}
                      <MainNavigation></MainNavigation>
                    </NavigationContainer>
                  </OrderProvider>
                </ProductProvider>
              </LocationProvider>
            </StoreMenuProvider>
          </BranchProvider>
        </AuthProvider>
      </FirebaseProvider>
    </SafeAreaProvider>
  );
}
