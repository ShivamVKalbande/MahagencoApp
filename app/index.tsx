import { Image, SafeAreaView, ScrollView, StatusBar, Text, View, Dimensions, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import styles from './css/style'
import { colors } from '@/constant/color';
import image from '@/constant/image';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router';
import Card from './components/Card';
import LogoutModal from './components/logoutModal';
import { useAuth } from './store/authStore';
// import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
// const size = width * 0.25; // Size of the circle

const data = [
    {
        id: "1",
        title: "Year 2023",
        subTitle: "Mahagenco Target",
        value: "200 Unit",
        progress: 0.6,
        current: "150",
        unit: "Unit",
        aboveText: "Current",
        belowText: "Generation",
        meter: "Gain/Loss",
        secondTitle: "",
        innerStroke: colors.red,
    },
    {
        id: "2",
        title: "Year 2023",
        subTitle: "Budget Allocate",
        value: "23,43,41,41,140.82 Rs",
        progress: 0.6,
        current: "8,01,51,40,795",
        unit: "Rs",
        aboveText: "Budget",
        belowText: "Consumed",
        meter: "",
        secondTitle: "Budget Allocate",
        innerStroke: colors.red,
    },
];
const Home = () => {

    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const isLoggedIn = useAuth((s) => !!s.id);
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            setTimeout(() => {
                router.replace('/screen/home');
            }, 100); // Small delay to ensure RootLayout is mounted
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) return null;

    // const flatListRef = useRef(null);
    // const handleScroll = (event) => {
    //     const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    //     if (contentOffset.x <= 0) {
    //         flatListRef.current.scrollToOffset({ offset: contentSize.width / 2, animated: false });
    //     } else if (contentOffset.x >= contentSize.width - layoutMeasurement.width) {
    //         flatListRef.current.scrollToOffset({ offset: contentSize.width / 2, animated: false });
    //     }
    // };

    // const extendedData = [...data, ...data, ...data];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.lightblue} barStyle="dark-content" />
            <View
                style={styles.Scrollcontainer}
            >
                {/* Header Container */}
                <View style={styles.headerContainer}>
                    <Image
                        source={image.Whitelogo}
                        style={styles.logo}
                    />
                    <Pressable onPress={() => setLogoutModalVisible(true)}>
                        <MaterialCommunityIcons
                            // name={'dots-vertical'}
                            name={'logout'}
                            size={30}
                            color={colors.white}
                            style={styles.menu}
                        />
                    </Pressable>
                </View>
                {/* Main Container */}
                <View style={styles.mainBg}>
                    {/* Logout Modal (moved to RootLayout for consistent rendering) */}
                    <LogoutModal modalVisible={logoutModalVisible} setModalVisible={setLogoutModalVisible} />
                    {/* horizontal Slider start */}
                    {/* <FlatList
                        ref={flatListRef}
                        data={extendedData}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        initialScrollIndex={data.length}
                        getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
                        renderItem={({ item }) => <Card {...item} />}
                    /> */}
<ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={{ marginTop: 25, }}
                    >
                        {/* Card 1 */}
                        <Card
                            title="Year 2023"
                            subTitle="Mahagenco Target"
                            value="200 Unit"
                            progress={0.6}
                            current="150"
                            unit="Unit"
                            aboveText="Current"
                            belowText="Generation"
                            meter="Gain/Loss"
                            secondTitle=""
                            innerStroke={colors.red}
                        />
                        {/* Card 2 */}
                        <Card
                            title="Year 2023"
                            subTitle="Budget Allocate"
                            value="23,43,41,41,140.82 Rs"
                            progress={0.6}
                            current="8,01,51,40,795"
                            unit="Rs"
                            aboveText="Budget"
                            belowText="Consumed"
                            meter=""
                            secondTitle="Budget Allocate"
                            innerStroke={colors.red}
                        />
                    </ScrollView>

                    {/* horizontal Slider End */}
                    {/* Department Card Start */}
                    <View style={styles.departmentContainer}>
                        <Text style={styles.departmentHeading}>Departments</Text>
                        {/* department row start */}
                        <View style={styles.departmentRow}>
                            {/* box 1 */}
                            <Link href={'screen/operations'} asChild>
                                <Pressable style={styles.departmentBox}>
                                    <Image
                                        source={image.operation}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        OPERATIONS
                                    </Text>
                                </Pressable>
                            </Link>
                            {/* box 2 */}
                            <Link href={'screen/material'} asChild>
                                <Pressable style={styles.departmentBox}>
                                    <Image
                                        source={image.material}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        MATERIAL
                                    </Text>
                                </Pressable>
                            </Link>

                            {/* box 3 */}
                            <Link href={'screen/finance'} asChild>
                                <Pressable style={styles.departmentBox3}>
                                    <Image
                                        source={image.finance}
                                        style={styles.iconImage}
                                    />
                                    <Text>FINANCE</Text>
                                </Pressable>
                            </Link>
                        </View>
                        {/* department row end */}
                        {/* department row start */}
                        <View style={styles.departmentRow}>
                            {/* box 1 */}
                            <Link href={'screen/projects'} asChild>
                                <Pressable style={styles.departmentBox}>
                                    <Image
                                        source={image.projects}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        PROJECTS
                                    </Text>
                                </Pressable>
                            </Link>
                            {/* box 2 */}
                            <Link href={'screen/fuel'} asChild>
                                <Pressable style={styles.departmentBox}>
                                    <Image
                                        source={image.fuel}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        FUEL/COAL
                                    </Text>
                                </Pressable>
                            </Link>
                            {/* box 3 */}
                            <Link href={'screen/bunker'} asChild>
                                <Pressable style={styles.departmentBox3}>
                                    <Image
                                        source={image.bunker}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        BUNKER COAL
                                    </Text>
                                </Pressable>
                            </Link>
                        </View>
                        {/* department row end */}
                        {/* department row start */}
                        <View style={styles.departmentRow}>
                            {/* box 1 */}
                            <Link href={'screen/hr'} asChild>
                                <Pressable style={styles.departmentBox}>
                                    <Image
                                        source={image.hr}
                                        style={styles.iconImage}
                                    />
                                    <Text>
                                        HR DEPT
                                    </Text>
                                </Pressable>
                            </Link>
                        </View>
                        {/* department row end */}
                    </View>
                    {/* Department Card End */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;
