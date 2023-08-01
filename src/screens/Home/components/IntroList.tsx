import { FlatList } from "react-native";
import IntroListItem from "../../../components/IntroListItem/IntroListItem";
import useDimension from "../../../hooks/useDimension";

const DATA: any[] = [
  // {
  //   id: 1,
  //   title: "Premiering",
  //   description: "Beginners Guide",
  //   time: "02:45:13",
  // },
  // {
  //   id: 2,
  //   title: "Premiering",
  //   description: "Beginners Guide",
  //   time: "02:45:13",
  // },
  // {
  //   id: 3,
  //   title: "Premiering",
  //   description: "Beginners Guide",
  //   time: "02:45:13",
  // },
];

const IntroList = () => {
  const width = useDimension().width;
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => `${item.id}`}
      horizontal
      renderItem={({ item }) => <IntroListItem item={item} />}
      showsHorizontalScrollIndicator={false}
      style={{ width }}
    />
  );
};

export default IntroList;
