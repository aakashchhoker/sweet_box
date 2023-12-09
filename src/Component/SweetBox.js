import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import data from './SampleData.json';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SweetBox = ({isSubmitVisible,handleSubmitModal}) => {
  const [selectedSweets, setSelectedSweets] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  });
  const [boxIndex, setBoxIndex] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const handleSweetSelection = sweet => {
    // console.log('Selected Sweet:', sweet);
    if (boxIndex) {
      setSelectedSweets({
        ...selectedSweets,
        [boxIndex]: [sweet],
      });
    }
    setBottomSheetVisible(false);
  };

  const toggleBottomSheet = index => {
    setBoxIndex(index);
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  

  const getTotalCost = () => {
    let totalCost = 0;

    Object.keys(selectedSweets).forEach(boxIndex => {
      const selectedSweet = selectedSweets[boxIndex][0];
      if (selectedSweet) {
        totalCost += selectedSweet.price;
      }
    });

    return totalCost;
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.box}>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={() => toggleBottomSheet(1)}>
            <View style={styles.cornerBoxOne}>
              <Image
                source={{uri: selectedSweets[1]?.[0]?.image}}
                style={styles.selectedImage}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleBottomSheet(2)}>
            <View style={styles.cornerBoxTwo}>
              <Image
                source={{uri: selectedSweets[2]?.[0]?.image}}
                style={styles.selectedImage}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.secondBox}>
          <TouchableOpacity onPress={() => toggleBottomSheet(3)}>
            <View style={styles.verticalLineOne}>
              <Image
                source={{uri: selectedSweets[3]?.[0]?.image}}
                style={styles.selectedVerticalImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleBottomSheet(4)}>
            <View style={styles.verticalLineTwo}>
              <Image
                source={{uri: selectedSweets[4]?.[0]?.image}}
                style={styles.selectedVerticalImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleBottomSheet(5)}>
            <View style={styles.verticalLineThree}>
              <Image
                source={{uri: selectedSweets[5]?.[0]?.image}}
                style={styles.selectedVerticalImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleBottomSheet(6)}>
            <View style={styles.verticalLineFour}>
              <Image
                source={{uri: selectedSweets[6]?.[0]?.image}}
                style={styles.selectedVerticalImage}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity onPress={() => toggleBottomSheet(7)}>
            <View style={styles.cornerBoxThree}>
              <Image
                source={{uri: selectedSweets[7]?.[0]?.image}}
                style={styles.selectedImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleBottomSheet(8)}>
            <View style={styles.cornerBoxFour}>
              <Image
                source={{uri: selectedSweets[8]?.[0]?.image}}
                style={styles.selectedImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={{marginTop: 10, textAlign: 'right', marginRight: 10}}>
          Box Cost: {getTotalCost()}
        </Text>

        <ScrollView>
          <View style={styles.sweetList}>
            {Object.keys(selectedSweets).map(boxIndex => {
              const selectedSweet = selectedSweets[boxIndex][0];
              return (
                <View>
                  {selectedSweet ? (
                    <View style={styles.selectedSweets} key={boxIndex}>
                      {selectedSweet && (
                        <View style={styles.selectedRow}>
                          <Text style={styles.heading}>
                            {selectedSweet.name}
                          </Text>
                          <View>
                            <Text style={styles.subheading}>
                              {selectedSweet.price} Kg
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
        {/* <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitModal}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity> */}

      </View>

      <Modal
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => toggleBottomSheet(0)}>
        <View style={styles.bottomSheet}>
          <FlatList
            data={data.data.sweets}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSweetSelection(item)}>
                <View style={styles.sweetItem}>
                  <View style={styles.sweetRow}>
                    <Image
                      source={{uri: item?.image}}
                      style={styles.sweetImage}
                    />
                    <Text style={styles.sweet_name_font}>{item?.name}</Text>
                  </View>
                  <Text>{item?.price} Kg</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isSubmitVisible}
        onBackdropPress={() => handleSubmitModal()}>
        <View style={styles.boxReady}>
        <Image style={{width: 322}} source={require('../assets/box-ready.png')} />
          <Text style={{textAlign: 'center'}}>Your Sweet Box is Ready!</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SweetBox;

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  boxReady:{
    backgroundColor: 'white',
    padding: 16,
    height: 'auto',
    borderRadius: 10,
  },
  sweetImage: {
    width: 40,
    height: 40,
  },
  sweetItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sweetRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 20,
  },
  box: {
    marginTop: 50,
    width: width,
    height: height / 2,
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondBox: {
    // marginTop: 70,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '45deg'}],
    position: 'absolute',
    top: 70,
    left: 66,
  },
  verticalLineOne: {
    // marginTop: 50,
    width: width / 6,
    height: height / 3,
    backgroundColor: '#cb9a8c',
    // position: 'absolute'
    // transform: [{ rotate: '45deg' }]
  },
  verticalLineTwo: {
    // marginTop: 50,
    width: width / 6,
    height: height / 3,
    backgroundColor: '#ffd7af',
    // position: 'absolute'
    // transform: [{ rotate: '45deg' }]
  },
  verticalLineThree: {
    // marginTop: 50,
    width: width / 6,
    height: height / 3,
    backgroundColor: '#8a7b70',
    // position: 'absolute'
    // transform: [{ rotate: '45deg' }]
  },
  verticalLineFour: {
    // marginTop: 50,
    width: width / 6,
    height: height / 3,
    backgroundColor: '#ee5d6c',
    // position: 'absolute'
    // transform: [{ rotate: '45deg' }]
  },

  cornerBoxOne: {
    width: 100,
    height: 100,
    backgroundColor: '#8a7b70',
  },
  cornerBoxTwo: {
    width: 100,
    height: 100,
    backgroundColor: '#ffd7af',
  },
  cornerBoxThree: {
    width: 100,
    height: 100,
    backgroundColor: '#cb9a8c',
  },
  cornerBoxFour: {
    width: 100,
    height: 100,
    backgroundColor: '#70361c',
  },
  selectedSweets: {
    // width: width,
    height: 80,
    backgroundColor: '#ffa07a',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    // paddingHorizontal: 20
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
  },
  subheading: {
    fontSize: 14,
    fontWeight: 700,
    color: 'white',
  },
  sweet_name_font: {
    marginLeft: 10,
  },
  sweetList: {
    // display: 'flex',
    // flexDirection: 'row',
    // width: '50%'
  },
  selectedSweetImage: {
    // width: '100%',
    height: 'auto',
    resizeMode: 'contain',
    // position: 'absolute'
  },
  selectedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  selectedVerticalImage: {
    width: width / 6,
    height: height / 3,
    resizeMode: 'cover',
  },
  submitBtn: {
    backgroundColor: '#5999e6',
    // width: '100%',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#ffff',
  },
});
