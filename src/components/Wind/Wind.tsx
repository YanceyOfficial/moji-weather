import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import cs from 'classnames';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import { windDirectFormat, getWindSpeed } from '../../utils/util';
const styles = require('./Wind.module.scss');

@inject('weatherStore')
@observer
class Wind extends Component<IWeatherProps, {}> {

  render() {
    const {
      weatherStore: { weatherData }
    } = this.props;

    const windSpeed = weatherData.observation.windSpeed;

    const windSpeedFanStyle = {
      animationDuration: `${getWindSpeed(windSpeed)}s`
    };

    return (
      <ContentWrapper title="Wind & Pressure">
        <View className={styles.wind_container}>
          <View className={styles.wind_main}>
            <View className={styles.wind_graph_group}>
              <View className={styles.wind_graph}>
                <View className={styles.graph_fan} style={windSpeedFanStyle} />
                <View className={styles.graph_pole} />
              </View>
              <View className={cs(styles.wind_graph, styles.wind_graph_small)}>
                <View className={styles.graph_fan} style={windSpeedFanStyle} />
                <View className={styles.graph_pole} />
              </View>
            </View>

            <View className={styles.wind_info}>
              <Text className={styles.wind_txt}>Wind</Text>
              <Text className={styles.wind_txt}>
                {windSpeed}{' '}mph{' '}
                {windDirectFormat(weatherData.observation.windDirectionCode)}
              </Text>
            </View>

            <View className={styles.barometric_pressure}>
              <Text className={styles.wind_txt}>Barometer</Text>
              <Text className={styles.wind_txt}>
                {weatherData.observation.barometricPressure.toFixed(1)}{' '}inches
              </Text>
            </View>
          </View>
          <View className={styles.split} />
        </View>
      </ContentWrapper>
    );
  }
}

export default Wind as ComponentType;