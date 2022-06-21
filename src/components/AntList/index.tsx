import React, {FC, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Ant as AntType} from '../../types';
import Ant from '../../assets/images/ant.svg';
import {List} from 'react-native-paper';
import {styles} from './styles';

interface Props {
  ants: AntType[];
  odds: number[];
  loading: boolean;
  setAnts: (item: AntType[]) => void;
}

export const AntList: FC<Props> = ({ants, odds, loading, setAnts}) => {
  useEffect(() => {
    if (odds.length === ants.length) {
      const antsCopy: AntType[] = JSON.parse(JSON.stringify(ants));
      const antsWithOdds = antsCopy.map((ant, index) => ({
        ...ant,
        odds: odds[index],
      }));

      antsWithOdds.sort((a, b) => b.odds - a.odds);
      setAnts(antsWithOdds);
    }
  }, [odds]);

  const getDescription = (ant: AntType, index: number) =>
    ant?.odds || (loading && !odds[index] ? 'In Progress' : odds[index]);

  const renderList = () =>
    ants.map((ant, index) => (
      <List.Accordion
        key={index}
        title={ant.name}
        description={getDescription(ant, index)}
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
            <Text>weight: {ant.weight}</Text>
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
