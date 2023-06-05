import React from "react";
import { FlatList } from "react-native";

import { PostCard } from "./PostCard";

export const PostList = ({ posts, showDeletePostButton = false }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard userData={item} showDeletePostButton={showDeletePostButton} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
