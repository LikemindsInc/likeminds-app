import { GlobalStyles } from '../../theme/GlobalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

// const items = [
//   {
//     profilePicture:
//       'https://unsplash.com/photos/iFgRcqHznqg/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8fHwxNjg5ODg3MjMzfDA&force=true',
//     title: 'Abdul Ibrahim',
//     message: "Thanks! I'll check the space out",
//     ticket: '3345',
//     CreatedAt: '10 mins ago',
//   },
// ];

const IndividualList = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [mRead, setmRead] = useState(false);
  const [ticket, setTicket] = useState('0000');

  const readMessage = (ticket: any) => {
    setmRead(true);
    setTicket(ticket);
  };

  return (
    <ScrollView>
      {[].map((item: any) => (
        <TouchableOpacity
          style={[GlobalStyles.flewRow, styles.container]}
          onPress={() => readMessage(item.ticket)}
        >
          <View>
            <Image
              source={
                item.profilePicture && item.profilePicture.trim() !== ''
                  ? { uri: item.profilePicture }
                  : require('../../../assets/image9.png')
              }
              resizeMethod="auto"
              resizeMode="cover"
              style={styles.profilePhoto}
            />
          </View>
          <View>
            <View style={[GlobalStyles.flewRow]}>
              <Text
                style={[GlobalStyles.fontInterRegular, { fontWeight: '500' }]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  { fontSize: 10, marginLeft: -15, color: 'grey' },
                ]}
              >
                {item.CreatedAt}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  {
                    fontSize: 12,
                    color:
                      mRead == true && ticket == item.ticket
                        ? '#7DD1E4'
                        : '#9EA0A0',
                  },
                ]}
              >
                {item.message}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default IndividualList;
