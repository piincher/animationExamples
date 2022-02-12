import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://cn.bing.com/images/search?view=detailV2&ccid=hz8H6%2b22&id=1E0DAF06F0035C047DE4E10FFF8010DA09DA485B&thid=OIP.hz8H6-22jVoZY9xFvh03yAHaDF&mediaurl=https%3a%2f%2fdiscoversdkcdn.azureedge.net%2fpostscontent%2freact_logo_20.jpg&exph=270&expw=648&q=react+picture&simid=608055270680367479&FORM=IRPRST&ck=C8F07326E8EB657DD695D3F822D7A07A&selectedIndex=12",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
];

export default function App() {
  const renderCard = (item) => {
    return (
      <Card title={item.text} image={{ uri: item.uri }} key={item.id}>
        <Text>I can customize</Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03a9fa"
          title={"view now"}
        />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Deck
        renderCard={renderCard}
        data={DATA}
        onSwipeLeft={() => {}}
        onSwipeRight={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
