import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const CustomScrollIndicator = ({ children, contentContainerStyle }) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setScrollPosition(contentOffset.y);
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setScrollHeight(height);
  };

  const handleContentSizeChange = (width, height) => {
    setContentHeight(height);
  };

  const showScrollbar = contentHeight > scrollHeight && scrollHeight > 0;
  
  const indicatorHeight = showScrollbar ? 80 : 0;

  const maxScrollDistance = contentHeight - scrollHeight;
  const indicatorTop = showScrollbar && maxScrollDistance > 0
    ? (scrollPosition / maxScrollDistance) * (scrollHeight - indicatorHeight)
    : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      
      {showScrollbar && (
        <View style={styles.scrollbarTrack}>
          <View
            style={[
              styles.scrollbarThumb,
              {
                height: indicatorHeight,
                transform: [{ translateY: indicatorTop }],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  scrollbarTrack: {
    width: 4,
    backgroundColor: '#F5F5F5',
    marginLeft: 4,
    borderRadius: 2,
  },
  scrollbarThumb: {
    width: 4,
    backgroundColor: '#573C84',
    borderRadius: 2,
  },
});

export default CustomScrollIndicator;
