import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IEducation, IExperience } from '@app-model';
import Util from '../../utils';

export default function EducationCard({
  handleDelete,
  degree,
  itemId,
}: {
  degree: IEducation;
  itemId: number;
  handleDelete?: (id: number) => void;
}) {
  const startDate = Util.convertToLong(new Date(degree.startDate));
  const endDate = Util.convertToLong(new Date(degree.endDate));
  const { major, degree: study, school, id } = degree;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Ionicons name="school" size={44} color="#c2c2c2" />
        <View style={styles.roleContainer}>
          <Text style={styles.role}>{major}</Text>
          <Text>{study}</Text>
          <Text>{school}</Text>
          <Text>
            {startDate}
            {endDate ? ' - ' + endDate : ''}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete && handleDelete(itemId)}
        style={[styles.deleteHandler]}
      >
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
