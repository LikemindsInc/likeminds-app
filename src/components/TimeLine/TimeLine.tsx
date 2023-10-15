import { FC, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../../theme/colors';

interface IProps {
  data: {
    title: JSX.Element | string;
    description: JSX.Element[] | JSX.Element;
  }[];
}

const TimeLine: FC<IProps> = ({ data }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
      {data.map((item, i) => (
        <View style={styles.contentWrapper} key={i}>
          <View
            style={{
              borderLeftWidth: 4,
              borderLeftColor: colors.navyBlue,
              marginLeft: 4,
              position: 'relative',
            }}
          >
            <View style={styles.dotWrapper}></View>
            <View style={[styles.lineWrapper]}></View>
          </View>
          <View style={[styles.mainContent]}>
            <View style={styles.titleContainer}>{item.title}</View>
            <View style={[styles.descriptionContent]}>{item.description}</View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 700,
    paddingLeft: 15,
    flex: 1,
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  mainContent: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 10,
  },
  descriptionContent: {
    marginBottom: 20,
  },
  dotWrapper: {
    width: 20,
    height: 20,
    backgroundColor: colors.navyBlue,
    borderRadius: 10,
    position: 'absolute',
    left: -12,
    top: 0,
  },
  lineWrapper: {
    width: 10,
    marginLeft: 5,
    backgroundColor: 'green',
  },
});

export default TimeLine;
