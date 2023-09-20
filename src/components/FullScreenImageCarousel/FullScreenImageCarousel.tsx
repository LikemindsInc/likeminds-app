import { Component, FC, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageView from "react-native-image-viewing";

interface IProps {
  images: { uri: string }[];
  isVisible: boolean;
  onRequestClose: () => void;
}

const FullScreenImageCarousel: FC<IProps> = ({
  images,
  isVisible,
  onRequestClose,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageView
        images={images}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={onRequestClose}
        animationType="slide"
        doubleTapToZoomEnabled
      />
    </View>
  );
};

export default FullScreenImageCarousel;
