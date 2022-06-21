import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Ant} from '../../types';
import {Button} from '../../ui';
import {AntList} from '../../components';
import {styles} from './styles';

enum STEPS {
  LOADING = 'LOADING',
  FETCHING = 'FETCHING',
  SIMULATION = 'SIMULATION',
  RESULTS = 'RESULTS',
}

export const Home = () => {
  const [antsData, setAntsData] = useState<Ant[]>([]);
  const [newOdd, setNewOdd] = useState<number>(0);
  const [odds, setOdds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(STEPS.FETCHING);
  const [headerMessage, setHeaderMessage] = useState('');

  const getAntsData = async () => {
    setLoading(true);
    setStep(STEPS.LOADING);
    try {
      const response = await (
        await fetch('https://sg-ants-server.herokuapp.com/ants')
      ).json();

      if (response.ants) {
        setAntsData(response.ants);
      }
      setHeaderMessage('Not yet run');
      setStep(STEPS.SIMULATION);
    } catch (e) {
      console.log(e);
      setStep(STEPS.FETCHING);
    }
    setLoading(false);
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
    setLoading(true);
    setStep(STEPS.LOADING);
    setHeaderMessage('In progress');
    for (let index = 0; index < antsData.length; index++) {
      const generate = generateAntWinLikelihoodCalculator();

      generate(setNewOdd);
    }
  };

  useEffect(() => {
    if (newOdd !== 0 && odds.length !== antsData.length) {
      setOdds([...odds, newOdd]);
    }
    if (odds.length === 4) {
      setLoading(false);
      setHeaderMessage('All calculated');
      setStep(STEPS.RESULTS);
    }
  }, [newOdd]);

  const getButtonText = () => {
    switch (step) {
      case STEPS.LOADING:
        return 'Loading';
      case STEPS.FETCHING:
        return 'Get ants';
      case STEPS.SIMULATION:
        return 'Simulate Race';
      case STEPS.RESULTS:
        return 'Reset';
      default:
        return 'Get ants';
    }
  };

  const resetData = () => {
    setAntsData([]);
    setOdds([]);
    setNewOdd(0);
    setHeaderMessage('');
    setStep(STEPS.FETCHING);
  };

  const onButtonPress = () => {
    switch (step) {
      case STEPS.FETCHING:
        return getAntsData;
      case STEPS.SIMULATION:
        return calculate;
      default:
        return resetData;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.headerText}>{headerMessage}</Text>
      <AntList
        ants={antsData}
        setAnts={setAntsData}
        odds={odds}
        loading={loading}
      />
      <Button
        disabled={loading}
        onPress={onButtonPress()}
        buttonText={getButtonText()}
      />
    </SafeAreaView>
  );
};
