import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Picker } from "react-native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import LocationItem from "./LocationItem";
import { LocationContext } from "../../shared/contexts/LocationContext";
import { RFValue } from "react-native-responsive-fontsize";
const renderItem = ({ item }) => <LocationItem data={item} />;
const keyExtract = (item, index) => item.name;

function RefLocation() {
  const { refLocations } = useContext(LocationContext);

  return (
    <>
      <CustomHeader></CustomHeader>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <FlatList
          data={refLocations}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
          contentContainerStyle={{
            backgroundColor: "white",
            justifyContent: "center",
            width: "95%",
            alignSelf: "center",
          }}
          ListHeaderComponent={headerComponent}
          keyExtractor={keyExtract}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={8} // Reduce initial render amount
          updateCellsBatchingPeriod={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        />
      </View>
    </>
  );
}

const headerComponent = () => {
  return (
    <Text style={{ fontWeight: "bold", fontSize: RFValue(18) }}>Locations</Text>
  );
};

export default React.memo(RefLocation);
