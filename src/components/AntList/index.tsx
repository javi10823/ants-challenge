import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Ant as AntType} from '../../types';
import Ant from '../../assets/images/ant.svg';
import {List} from 'react-native-paper';
import {styles} from './styles';

interface Props {
  ants: AntType[];
}

export const AntList: FC<Props> = ({ants}) => {
  const renderList = () =>
    ants.map((ant, index) => (
      <List.Accordion
        key={index}
        title={ant.name}
        left={() => (
          <View
            style={[
              styles.antContainer,
              {
                height: ant.length + 20,
              },
            ]}>
            <Ant fill={ant.color.toLowerCase()} />
          </View>
        )}>
        <View style={styles.detailsContainer}>
          <Text style={styles.colorText}>Color: {ant.color}</Text>
          <View style={styles.sizeContainer}>
            <Text style={styles.lengthText}>Length: {ant.length}</Text>
            <Text>Weigth: {ant.weigth}</Text>
          </View>
        </View>
      </List.Accordion>
    ));

  return (
    <List.Section style={styles.listContainer}>
      <ScrollView>{renderList()}</ScrollView>
    </List.Section>
  );
};
