import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NotificationItem from '../components/NotificationItem';
import { COLORS, SCALE, SIZES } from '../constants/theme';
import NotificationHeader from '../components/headers/NotificationHeader';
import { getTimeDifference } from '../utils/timeDuration';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../graphql/queries/Notification';

type notificationType = {
  id: number;
  header: string;
  message: string;
  time: string;
  type: string;
};

let Notification: notificationType[] = [];

const formatNotifications = (notifications: object[]): notificationType[] => {
  let id = 0;
  const formattedNotifications: notificationType[] = notifications.map((notification) => {
    const { entity, message, updatedAt, severity } = notification;
    const { name, phone } = JSON.parse(entity);
    id += 1;
    return {
      id: id,
      header: name || phone,
      message,
      time: updatedAt,
      type: severity.replace(/"/g, ''),
    };
  });

  // Sort the formatted notifications based on time in descending order (recent on first)
  const sortedNotifications = formattedNotifications.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeB - timeA;
  });

  return sortedNotifications.map((notification) => {
    const { time, ...rest } = notification;
    return {
      ...rest,
      time: getTimeDifference(time), // format time into minutes, hrs, days etc.
    };
  });
};
interface ITab {
  id: number;
  label: string;
}

const Tabs: ITab[] = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Critical' },
  { id: 3, label: 'Warning' },
  { id: 4, label: 'Info' },
];

type RenderOptionProps = {
  label: string;
  selectedTab: ITab;
  handlePress: () => void;
};

const RenderOption: React.FC<RenderOptionProps> = ({ label, selectedTab, handlePress }) => {
  const isActive = label === selectedTab.label;
  return (
    <TouchableOpacity
      testID={label}
      onPress={handlePress}
      style={isActive ? styles.activeTab : styles.inActiveTab}
    >
      <Text style={[styles.tabText, isActive ? styles.active : {}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const Notifications = ({ navigation }: { navigation: undefined }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [notificationArray, setNotificationArray] = useState(Notification);

  useQuery(GET_NOTIFICATIONS, {
    onCompleted: (data) => {
      Notification = formatNotifications(data.notifications);
      setNotificationArray(Notification);
    },
  });

  // const handleSearch = (text: string) => {
  //   setSearchValue(text);
  //   // TODO: filter the notification array
  // };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <NotificationHeader searchValue={searchValue} handleSearch={handleSearch} />
  //     ),
  //   });
  // }, [searchValue]);

  const handleTabPress = (tab: ITab) => {
    setActiveTab(tab);
    if (tab.label === 'All') {
      setNotificationArray(Notification);
    } else {
      const filteredArray = Notification.filter((item) => item['type'] === tab.label);
      setNotificationArray(filteredArray);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navBar}>
        {Tabs.map((tab) => (
          <RenderOption
            key={tab.id}
            label={tab.label}
            selectedTab={activeTab}
            handlePress={() => handleTabPress(tab)}
          />
        ))}
      </View>
      <ScrollView>
        {notificationArray.map((item) => {
          return <NotificationItem key={item.id} notification={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  active: {
    color: COLORS.primary70,
  },
  activeTab: {
    alignContent: 'center',
    borderBottomColor: COLORS.primary400,
    borderBottomWidth: SCALE(2),
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  inActiveTab: {
    alignContent: 'center',
    height: SIZES.s60,
    justifyContent: 'center',
    marginHorizontal: SIZES.m16,
  },
  mainContainer: {
    flex: 1,
  },
  navBar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderBottomWidth: SCALE(0.2),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s60,
    paddingLeft: SIZES.m16,
  },
  tabText: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
    fontWeight: '700',
  },
});
