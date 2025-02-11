import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';

import { COLORS, SCALE, SIZES } from '../../constants';
import { GET_NOTIFICATIONS_COUNT } from '../../graphql/queries/Notification';

const variables = {
  filter: {
    is_read: false,
  },
};

const HomeHeaderRight = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigation = useNavigation();

  useQuery(GET_NOTIFICATIONS_COUNT, {
    variables,
    onCompleted: (data) => {
      setNotificationCount(data.countNotifications);
    },
  });

  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={() => navigation.navigate('Notifications')}
        style={styles.iconContainer}
        android_ripple={{ borderless: true }}
      >
        <Ionicons testID="notificationIcon" name="notifications-outline" style={styles.icon} />
        {notificationCount.toString() !== '0' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HomeHeaderRight;

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: COLORS.error100,
    borderRadius: SIZES.r10,
    height: SIZES.s18,
    justifyContent: 'center',
    position: 'absolute',
    right: -SCALE(3),
    top: -SCALE(3),
    width: SIZES.s18,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: SIZES.f12,
    fontWeight: '500',
    includeFontPadding: false,
  },
  icon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.m20,
    justifyContent: 'center',
    marginLeft: SIZES.m10,
    width: SIZES.s30,
  },
  mainContainer: {
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    padding: SIZES.m10,
  },
});
