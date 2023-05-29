import { FlatList } from "native-base";
import StoryFeedItem from "../../../components/StoryFeedItem/StoryFeedItem";

const DATA = [
  {
    id: 1,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 2,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 3,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 4,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 5,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
  {
    id: 6,
    profileImage: require("../../../../assets/image3.png"),
    firstName: "Jacob",
    lastName: "Smith",
    postImage: require("../../../../assets/image8.png"),
    reactionCount: 275,
    commentCount: 79,
    title: "Things you should be doing in college as an international student",
  },
];

const StoryFeedList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      renderItem={(props) => <StoryFeedItem item={props.item} />}
      data={DATA}
      keyExtractor={(item) => `${item.id}`}
      style={{ flex: 1, flexGrow: 1 }}
    />
  );
};

export default StoryFeedList;
