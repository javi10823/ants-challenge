import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from '../../ui';

export const Home = () => {
  const [antsData, setAntsData] = useState<Ant[]>([]);
  const [newOdd, setNewOdd] = useState<number>(0);

  const getAntsData = async () => {
    try {
      const response = await (
        await fetch('https://sg-ants-server.herokuapp.com/ants')
      ).json();

      if (response.ants) {
        setAntsData(response.ants);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback: (item: number) => void) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  const calculate = () => {
    for (let index = 0; index < antsData.length; index++) {
      const generate = generateAntWinLikelihoodCalculator();

      generate(setNewOdd);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={getAntsData} buttonText="fetch data" />
    </SafeAreaView>
  );
};
