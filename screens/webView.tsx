import React, {useState, useContext, useEffect, useMemo} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeProvider, Header, Icon, Button } from 'react-native-elements';
import { Share } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {Store} from '../redux/Store';
import {HOST_URL} from "@env"

type RootStackParamList = {
  WebViewScreen: { id: string };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebViewScreen'>;
  route: RouteProp<RootStackParamList, 'WebViewScreen'>;
};


const WebViewScreen = ({navigation, route}: Props) => {
  // const [url, setUrl] = useState('http://localhost:3000/preview');
  const {
    state: {

      isEmulator
    },
    dispatch,
  }: any = useContext(Store);
  const {id} = route.params;

  // const [urlPdf, setUrlPdf] = useState(`http://localhost:3000/preview/doc/${id}`);
  const [url, setUrl]  = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [urlPdf, setUrlPdf] = useState('')

  const firstPart = id?.substring(0, 8);


  const [index, setIndex] = useState(0);
  const [contentType, setContentType] = useState('webpage');

  
  const handleShare = async() => {
    try {
        const result = await Share.share({
          message: url,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error?.message || 'Something went wrong') ;
      }
  };
useEffect(() => {

  if (isEmulator) {
   setUrl(`http://${HOST_URL}:3000/preview/${firstPart}`);
    setUrlPdf(`http://${HOST_URL}:3000/preview/doc/${firstPart}`);
  } else {
   setUrl(`https://www.trustwork.co/preview/${firstPart}`);
   setUrlPdf(`http://www.trustwork.co/preview/doc/${firstPart}`);

  }
  setIsLoading(false)
}, [])
console.log('id'  + id)
console.log('isEmulator'  + isEmulator)
console.log('url'  + url)
console.log('firstPast'  + firstPart)

  return (
    <>
    {isLoading ? (''):(
          <View style={{ flex: 1 }}>
          <Header
            centerComponent={{ text: 'WebView App', style: { color: '#fff' } }}
            rightComponent={
              <Icon
                name="share"
                type="font-awesome"
                color="#fff"
                onPress={handleShare}
              />
            }
            containerStyle={styles.header}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Webpage"
              onPress={() => setContentType('webpage')}
              type={contentType === 'webpage' ? 'solid' : 'outline'}
              containerStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
            <Button
              title="Preview PDF"
              onPress={() => setContentType('pdf')}
              type={contentType === 'pdf' ? 'solid' : 'outline'}
              containerStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
          {contentType === 'webpage' ? (
            <WebView source={{ uri: url }} />
          ) : (
            <WebView source={{ uri: urlPdf }} />
    
          )}
        </View>
    )}

    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007aff',
    borderBottomWidth: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonTitle: {
    color: '#007aff',
  },
  pdfPreview: {
    textAlign: 'center',
    margin: 20,
  },
});

export default WebViewScreen;
