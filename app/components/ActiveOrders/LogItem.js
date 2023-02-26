import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BranchContext} from '../../shared/contexts/BranchContext';
function LogItem({order}) {
  const {storeBranches} = useContext(BranchContext);

  const branch = storeBranches.filter(branch => branch.key == order.branch_key);

  const action = order.action == 1 ? 'Assigned to ' : 'Unassigned from ';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {action}
        {branch[0].name}
      </Text>
      <Text style={styles.subtext}>{order.dt_created}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 7,
    borderBottomWidth: 2,
    borderBottomColor: 'whitesmoke',
    borderRightWidth: 2,
    borderRightColor: 'whitesmoke',
    marginBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 12,
  },
});

export default LogItem;
