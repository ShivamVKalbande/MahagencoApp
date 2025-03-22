import { colors } from "@/constant/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { View, Dimensions, StyleSheet, Pressable } from "react-native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LogoutModal from "./components/logoutModal";
import { useAuth } from "./store/authStore";

const queryClient = new QueryClient();
const { width, height } = Dimensions.get("window");

const screens = [
  { name: "index", showHeader: false },
  { name: "screen/otp", showHeader: false },
  { name: "screen/home", showHeader: false },
  { name: "screen/operations", title: "OPERATIONS" },
  { name: "screen/projects", title: "PROJECTS" },
  { name: "screen/material", title: "MATERIALS" },
  { name: "screen/finance", title: "FINANCE" },
  { name: "screen/fuel", title: "FUEL/COAL" },
  { name: "screen/fuelCombination", title: "FUEL OPTIMIZATION" },
  { name: "screen/bunker", title: "BUNKER COAL" },
  { name: "screen/hr", title: "HR DEPARTMENT" },
  { name: "screen/materialPo", title: "Material PO" },
  { name: "screen/materialPr", title: "Material PR" },
  { name: "screen/financePlant", title: "Finance Plant" },
  { name: "screen/projectDetail", title: "Project" },
];

function CustomHeader({ onLogout }) {
  return (
    <Pressable onPress={onLogout}>
      <MaterialCommunityIcons
        name="logout"
        size={25}
        color={colors.white}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export default function RootLayout() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const isLoggedIn = useAuth((s) => !!s.id);
  !isLoggedIn &&  <Link href={'screen/home'} />
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
              headerTitleStyle: { color: colors.white },
              headerTintColor: colors.white,
              headerRight: () => <CustomHeader onLogout={() => setLogoutModalVisible(true)} />,
              headerStyle: { backgroundColor: colors.lightblue },
            }}
          />
        ))}
      </Stack>

      {/* Logout Modal (moved to RootLayout for consistent rendering) */}
      <LogoutModal modalVisible={logoutModalVisible} setModalVisible={setLogoutModalVisible} />
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
