import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const {
    data: posts,
    isLoading,
    refretch,
  } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  // return <Text>{JSON.stringify(user)}</Text>;

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center ">
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  className="w-[90%] h-[90%] rounded-lg"
                />
              </View>

              <InfoBox
                title={user?.username}
                containerStyles={"mt-5"}
                titleStyles="text-lg"
              />
              <View className="mt-5 flex-row">
                <InfoBox
                  title={posts.length || 0}
                  subTitle="Posts"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox
                  title="1.2k"
                  subTitle="Followers"
                  titleStyles="text-xl"
                />
              </View>
            </View>
          );
        }}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <View>
              <VideoCard video={item} />
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subTitle="Try searching for something else"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});