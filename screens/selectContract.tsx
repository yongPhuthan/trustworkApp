import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardContract from '../components/CardContract'

type Props = {}

const SelectContract = (props: Props) => {
  return (
    <View>
      <Text>selectContract</Text>
      <CardContract 
      price={30}
      title='test'
      description='desp'
      />
    </View>
  )
}

export default SelectContract

const styles = StyleSheet.create({})