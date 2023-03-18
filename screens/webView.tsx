import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ThemeProvider, Header, Icon, Button } from 'react-native-elements';
import { Share } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type RootStackParamList = {
  WebViewScreen: { id: string };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebViewScreen'>;
  route: RouteProp<RootStackParamList, 'WebViewScreen'>;
};


const WebViewScreen = ({navigation, route}: Props) => {
  const [url, setUrl] = useState('http://localhost:3000/preview');
  const {id} = route.params;
  const [urlPdf, setUrlPdf] = useState(`http://localhost:3000/preview/doc/${id}`);

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
console.log('id'+id)
  return (
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
