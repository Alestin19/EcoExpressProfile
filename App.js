import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  // Estado del usuario
  const [user, setUser] = useState({
    name: 'Justin Peña',
    email: 'alestin19deseptiembre@gmail.com',
    phone: '0994195646',
    membership: 'Oro',
    points: 1250,
    address: 'Av. Principal 123, Quito',
    joinDate: 'Miembro desde Septiembre 2023',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({...user});

  // Función para seleccionar imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setTempUser({...tempUser, image: result.assets[0].uri});
    }
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Perfil actualizado', 'Tus cambios se guardaron correctamente');
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con degradado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil EcoExpress</Text>
      </View>

      {/* Foto de perfil editable */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: isEditing ? tempUser.image : user.image }}
          style={styles.profileImage}
        />
        {isEditing && (
          <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tarjeta de información */}
      <View style={styles.infoCard}>
        <View style={styles.infoSection}>
          <MaterialIcons name="person" size={22} color="#4CAF50" style={styles.icon} />
          <Text style={styles.infoText}>{user.name}</Text>
        </View>

        <View style={styles.infoSection}>
          <MaterialIcons name="email" size={22} color="#4CAF50" style={styles.icon} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <FontAwesome name="phone" size={22} color="#4CAF50" style={styles.icon} />
          {isEditing ? (
            <TextInput
              style={styles.editableField}
              value={tempUser.phone}
              onChangeText={(text) => setTempUser({...tempUser, phone: text})}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoText}>{user.phone}</Text>
          )}
        </View>

        <View style={styles.infoSection}>
          <Entypo name="location-pin" size={22} color="#4CAF50" style={styles.icon} />
          {isEditing ? (
            <TextInput
              style={styles.editableField}
              value={tempUser.address}
              onChangeText={(text) => setTempUser({...tempUser, address: text})}
            />
          ) : (
            <Text style={styles.infoText}>{user.address}</Text>
          )}
        </View>

        {/* Membresía y puntos */}
        <View style={styles.membershipContainer}>
          <View style={styles.membershipBadge}>
            <Ionicons name="ribbon" size={18} color="#FFD700" />
            <Text style={styles.membershipText}>Nivel {user.membership}</Text>
          </View>
          <Text style={styles.pointsText}>{user.points} Eco-Puntos</Text>
        </View>

        <Text style={styles.joinDateText}>{user.joinDate}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar perfil</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

// Estilos mejorados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 30,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editableField: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 5,
    marginLeft: 5,
  },
  membershipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE475',
  },
  membershipText: {
    marginLeft: 8,
    color: '#8B7500',
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  joinDateText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#888',
    fontSize: 14,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;