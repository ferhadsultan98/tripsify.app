import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

const DocumentUpload = ({ 
  title, 
  required,
  description, 
  notes = [], 
  onUpload, 
  file,
  showBorder = true
}) => {
  const handleUpload = () => {
    // File picker açılacaq
    onUpload('file.jpg');
  };

  return (
    <View style={[styles.container, showBorder && styles.containerBorder]}>
      <Text style={styles.title}>
        {title} {required && <Text style={styles.required}>*</Text>}
      </Text>
      
      <Text style={styles.description}>{description}</Text>
      
      {notes.map((note, index) => (
        <View key={index} style={styles.noteContainer}>
          {/* <Text style={styles.bullet}>•</Text> */}
          <Text style={styles.noteText}>{note}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>+ Upload files</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.large,
    paddingBottom: spacing.large,
  },
  containerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.small,
  },
  required: {
    color: colors.error,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    color: '#616161',
    lineHeight: 28.8,
    letterSpacing: 0.2,
    marginBottom: spacing.small,
  },
  noteContainer: {
    flexDirection: 'row',
    marginBottom: spacing.small,
    paddingRight: spacing.medium,
  },
  bullet: {
    fontSize: 18,
    color: '#616161',
    marginRight: 8,
    lineHeight: 28.8,
  },
  noteText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#616161',
    lineHeight: 28.8,
    letterSpacing: 0.2,
  },
  uploadButton: {
    width: 168,
    height: 48,
    borderRadius: 1000,
    backgroundColor: 'rgba(120, 120, 120, 0.20)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default DocumentUpload;
