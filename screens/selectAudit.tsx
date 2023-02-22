import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardAudit from '../components/CardAudit'

type Props = {}

const SelectAudit = (props: Props) => {
  return (
    <View>
      <Text>selectAudit</Text>
      <CardAudit
      title='test1'
      description='dest'
      price={300}
      imageUri='https://camo.githubusercontent.com/11bb3dbcececfc4422668ce65aac365e64253e2c1a7c08929386ad8b3a3a2196/687474703a2f2f692e67697068792e636f6d2f336f365a7436684e484f64336b56783461592e676966'
      />
    </View>
  )
}

export default SelectAudit

const styles = StyleSheet.create({})