import React, {FC, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Device} from 'react-native-ble-plx';
import {COLORS} from '../constants/Theme';

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  goBack: () => void;
  sendSelectedDevices: (devices: Device[]) => void;
};

const DeviceModal: FC<DeviceModalProps> = props => {
  const {devices, visible, goBack, sendSelectedDevices} = props;
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);

  return (
    <Modal
      style={modalStyle.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}>
      <SafeAreaView style={modalStyle.modalTitle}>
        <Text style={modalStyle.modalTitleText}>
          Tap on a device to connect
        </Text>

        <FlatList
          contentContainerStyle={modalStyle.modalFlatlistContiner}
          data={devices}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (selectedDevices.includes(item)) {
                  console.log();
                  setSelectedDevices(
                    selectedDevices.filter(itm => itm !== item),
                  );
                } else {
                  setSelectedDevices([...selectedDevices, item]);
                }
              }}
              style={
                selectedDevices.includes(item)
                  ? modalStyle.ctaButtonSelected
                  : modalStyle.ctaButton
              }>
              <Text
                style={
                  selectedDevices.includes(item)
                    ? modalStyle.ctaButtonTextSelected
                    : modalStyle.ctaButtonText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<ActivityIndicator size="large" color="#000" />}
        />

        <TouchableOpacity
          onPress={() => {
            if (selectedDevices.length === 0) {
              ToastAndroid.show('please select a device to connect', 1000);
            } else {
              sendSelectedDevices(selectedDevices);
              setSelectedDevices([]);
            }
          }}
          style={modalStyle.ctaButton}>
          <Text style={modalStyle.ctaButtonText}>Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goBack} style={modalStyle.ctaButton}>
          <Text style={modalStyle.ctaButtonText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCellOutline: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  modalTitle: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  modalTitleText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#000',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonSelected: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  ctaButtonTextSelected: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default DeviceModal;
