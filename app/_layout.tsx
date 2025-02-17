import { colors } from "@/components/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View, Dimensions, StyleSheet } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const { width, height } = Dimensions.get("window");

const screens = [
  { name: "index", showHeader: false },
  { name: "screen/home", showHeader: false },
  { name: "screen/operations", title: "OPERATIONS" },
  { name: "screen/projects", title: "PROJECTS" },
  { name: "screen/material", title: "MATERIALS" },
  { name: "screen/finance", title: "FINANCE" },
  { name: "screen/fuel", title: "FUEL/COAL" },
  { name: "screen/bunker", title: "BUNKER COAL" },
  { name: "screen/hr", title: "HR DEPARTMENT" },
  { name: "screen/materialPo", title: "Material PO" },
  { name: "screen/materialPr", title: "Material PR" },
  { name: "screen/financePlant", title: "Finance Plant" },
];

function CustomHeader() {
  return (
    <View style={styles1.background}>
      <MaterialCommunityIcons
        name="dots-vertical"
        size={35}
        color={colors.skyblue}
        style={{ left: width * 0.9 }}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {screens.map(({ name, title = "", showHeader = true }) => (
          <Stack.Screen
            key={name}
            name={name}
            options={{
              headerShown: showHeader,
              headerTitle: title || undefined,
              headerTitleAlign: "center",
              headerTitleStyle: { color: colors.skyblue },
              headerTintColor: colors.skyblue,
              headerBackground: showHeader ? CustomHeader : undefined,
            }}
          />
        ))}
      </Stack>
    </QueryClientProvider>
  );
}

const styles1 = StyleSheet.create({
  background: {
    backgroundColor: colors.lightblue,
    height: height * 0.1,
    padding: 10,
    flexDirection: "row",
  },
});
