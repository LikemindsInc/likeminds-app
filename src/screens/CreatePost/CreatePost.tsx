import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import { Text } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import colors, { addOpacity } from '../../theme/colors';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { IPostState, clearCreatePostStatus } from '../../reducers/post_reducer';
import { createPostAction } from '../../actions/post';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { APP_SCREEN_LIST } from '../../constants';
import KeyboardDismisser from '../../components/KeyboardDismisser/KeyboardDismisser';
import { Video, ResizeMode } from 'expo-av';
import { useToast } from 'react-native-toast-notifications';
import { clearNetworkError } from '../../reducers/errorHanlder';

const CreatePost = () => {
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const video = useRef(null);
  const [videoSelected, setVideoSelected] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [status, setStatus] = useState({});
  const postState = useAppSelector(
    (state: any) => state.postReducer,
  ) as IPostState;

  const handleMediaSelect = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setVideoSelected([]);
        setImages([...images, ...result.assets].splice(0, 10));
      }
    } catch (error) {}
  };
  const handleVideoSelect = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        console.log(result);
        setImages([]);
        setVideoSelected(result.assets);
      }
    } catch (error) {}
  };
  const handleCreatePost = () => {
    dispatch(
      createPostAction({
        content: content.trim(),
        image: images,
        videos: videoSelected,
      }),
    );
  };

  useEffect(() => {
    if (postState.createPostStatus === 'completed') {
      setContent('');

      setImages([]);
      setVideoSelected([]);
      navigation.navigate(APP_SCREEN_LIST.HOME_SCREEN);
      dispatch(clearCreatePostStatus());
    } else if (postState.createPostStatus === 'failed') {
      console.log('error> ', postState.createPostError);
      dispatch(clearNetworkError());
      dispatch(clearCreatePostStatus());
    }
  }, [postState.createPostStatus]);

  useEffect(() => {
    navigation.addListener('blur', clearState);
    return () => {
      navigation.removeListener('blur', clearState);
    };
  }, []);

  const clearState = () => {
    setImages([]);
    setContent('');
    setVideoSelected([]);
    dispatch(clearCreatePostStatus());
  };

  return (
    <KeyboardDismisser>
      <View style={[GlobalStyles.container]}>
        <View
          style={[
            GlobalStyles.mb20,
            GlobalStyles.mt20,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Text
            style={[
              GlobalStyles.fontInterMedium,
              GlobalStyles.fontSize20,
              GlobalStyles.fontWeight700,
            ]}
          >
            New Post
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              clearState();
            }}
          >
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight700,
                { textTransform: 'uppercase' },
              ]}
            >
              x
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyles.flexOne]}>
          <Input
            placeholder="What’s on your mind"
            textAlignVertical="top"
            contentContainerStyle={styles.inputStyle}
            multiline={true}
            value={content}
            onChangeText={(value) => setContent(value)}
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(APP_SCREEN_LIST.POST_JOB_SCREEN)
              }
            >
              <FontAwesome5 name="toolbox" size={24} color={colors.navyBlue} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleVideoSelect}>
              <Entypo name="video-camera" size={24} color={colors.navyBlue} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMediaSelect}>
              <FontAwesome name="photo" size={24} color={colors.navyBlue} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="attachment" size={24} color={colors.navyBlue} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            <View style={styles.imagesWrapper}>
              {images.map((item, i) => {
                return (
                  <Image
                    key={i}
                    source={{ uri: item.uri }}
                    resizeMode="cover"
                    resizeMethod="auto"
                    style={styles.files}
                  />
                );
              })}
            </View>
            {images.length > 0 ? null : videoSelected.length > 0 ? (
              <View>
                <Video
                  ref={video}
                  style={{ width: 150, height: 150 }}
                  source={{
                    uri: videoSelected[0].uri,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
        <Button
          loading={postState.createPostStatus === 'loading'}
          onPress={handleCreatePost}
          title="Post Now"
        />
      </View>
    </KeyboardDismisser>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: colors.white,
    height: 300,
    paddingLeft: 0,
    alignItems: 'flex-start',
  },
  imagesWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginVertical: 20,
  },
  files: {
    width: 100,
    height: 100,
    aspectRatio: 1,
  },
  buttonWrapper: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#88969D' + addOpacity(20),
    borderBottomWidth: 1,
    borderBottomColor: '#88969D' + addOpacity(20),
    paddingVertical: 10,
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'row',
  },
});

export default CreatePost;
