import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

type CardProps = {
  title: string;
  description: string;
  price: number;
  imageUri: string;
};

const CardAudit = ({title, description, price, imageUri}: CardProps) => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckbox}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.underline} />
        <Image style={styles.image} source={{uri: imageUri}} />

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  checkboxContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 16,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {

    width: 250,
    height: 250,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6C00',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 8,
  },
});

export default CardAudit;
