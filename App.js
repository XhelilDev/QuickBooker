import { useEffect, useState, useContext, useRef } from 'react';
import { StatusBar, View } from 'react-native';
import 'expo-dev-client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { bookingContext } from './store/booking-context';
import { signInAnonymouslyFunction, fetchBookings, auth } from './util/httpFirebase';
import { GlobalStyles } from './constants/styles';
import RecentBookings from './screens/RecentBookings';
import AllBookings from './screens/AllBookings';
import ManageBooking from './screens/ManageBooking';
import IconButton from './components/UI/IconButton';
import BookingsContextProvider from './store/booking-context';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-9937294921073271/2904607421';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.accent600,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageBooking');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentBookings}
        options={{
          title: 'Recent Bookings',
          tabBarLabel: 'Recent Bookings',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />,
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }
        }}
      />
      <BottomTabs.Screen
        name="AllBookings"
        component={AllBookings}
        options={{
          title: 'All Bookings',
          tabBarLabel: 'All Bookings',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const bannerRef = useRef(null);
  const { setUid } = useContext(bookingContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (user) {
        setUid(user.uid);
        const bookings = await fetchBookings(user.uid);
        setBookings(bookings);
      } else {
        try {
          const uid = await signInAnonymouslyFunction();
          setUid(uid);
          const bookings = await fetchBookings(uid);
          setBookings(bookings);
        } catch (error) {
          console.error('Error signing in anonymously:', error);
        }
      }
    };

    checkUser();
  }, [setUid]);

  return (
    <>
      <StatusBar style="auto" />
      <BookingsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageBooking"
              component={ManageBooking}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
          {/*Banner Ad outside of the navigator */}
           <View style={{ alignItems: 'center', marginTop: 10 }}>
            <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
          </View>
        </NavigationContainer>
      </BookingsContextProvider>
    </>
  );
}
