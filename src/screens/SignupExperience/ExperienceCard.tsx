import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IExperience } from '@app-model';
import Util from '../../utils';

export default function ExperienceCard({
  handleDelete,
  experience,
}: {
  experience: IExperience;
  handleDelete?: () => void;
}) {
  const startDate = Util.convertToLong(new Date(experience.startDate));
  const endDate = Util.convertToLong(new Date(experience.endDate));

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <FontAwesome name="building" size={48} color="#c2c2c2" />
        <View style={styles.roleContainer}>
          <Text style={styles.role}>{experience.jobTitle}</Text>
          <Text>{experience.companyName}</Text>
          <Text>
            {startDate}
            {endDate ? ' - ' + endDate : ''}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDelete} style={[styles.deleteHandler]}>
        <AntDesign name="close" size={20} color={'black'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    borderColor: '#c2c2c2',
    backgroundColor: '#f4f7f8',
    marginVertical: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleContainer: {
    marginLeft: 10,
  },
  deleteHandler: {
    marginLeft: 10,
  },
  role: {
    fontSize: 19,
    fontWeight: '600',
  },
});
