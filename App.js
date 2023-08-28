import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [youSave, setYouSave] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [history, setHistory] = useState([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);


  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discount)) {
      setDiscountedPrice('Please enter valid input');
      setYouSave('');
      setFinalPrice('');
      return;
    }

    if (price < 0 || discount < 0 || discount > 100) {
      setDiscountedPrice('Please enter valid input');
      setYouSave('');
      setFinalPrice('');
      return;
    }

    const discountedPrice = price - (price * discount) / 100;
    const savings = price - discountedPrice;
    setDiscountedPrice(discountedPrice.toFixed(2));
    setYouSave(`You Save: RS.${savings.toFixed(2)} (${discount}% off)`);
    setFinalPrice(`Final Price: Rs.${discountedPrice.toFixed(2)}`);
  };

  const saveCalculation = () => {
    const calculation = {
      originalPrice,
      discountPercentage,
      discountedPrice,
    };
    setHistory([...history, calculation]);
    setOriginalPrice('');
    setDiscountPercentage('');
    setDiscountedPrice('');
    setYouSave('');
    setFinalPrice('');
  };

return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Discount Calculator</Text>
    </View>
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Original Price'
          placeholderTextColor="#666"
          value={originalPrice}
          onChangeText={setOriginalPrice}
        />
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Discount (%)'
          placeholderTextColor="#666"
          value={discountPercentage}
          onChangeText={setDiscountPercentage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateDiscount}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.result}>{discountedPrice}</Text>
        <Text style={styles.info}>{youSave}</Text>
        <Text style={styles.info}>{finalPrice}</Text>
      </View>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.button} onPress={saveCalculation}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setHistoryModalVisible(true)}>
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Modal visible={historyModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setHistoryModalVisible(false)}>
          <Text style={styles.closeIcon}>X</Text>
        </TouchableOpacity>
        <Text style={styles.historyTitle}>Calculation History</Text>
       <ScrollView>
        <View style={styles.historyContainer}>
          {history.length > 0 ? (
            <View style={styles.historyTable}>
              <View style={styles.historyRow}>
                <Text style={[styles.historyCell, styles.historyHeader]}>Original Price</Text>
                <Text style={[styles.historyCell, styles.historyHeader]}>Discount</Text>
                <Text style={[styles.historyCell, styles.historyHeader]}>Final Price</Text>
              </View>
              {history.map((calculation, index) => (
                <View style={styles.historyRow} key={index}>
                  <Text style={styles.historyCell}>{calculation.originalPrice}</Text>
                  <Text style={styles.historyCell}>{calculation.discountPercentage}%</Text>
                  <Text style={styles.historyCell}>{calculation.discountedPrice}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noHistoryText}>No calculation history available</Text>
          )}
        </View>
        </ScrollView>
      </View>
    </Modal>
  </View>
);

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    height: 60,
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    marginBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 5,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#009387',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  historyContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: 300, 
  },
  historyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  historyHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  historyCell: {
    padding: 30,
   
    backgroundColor: '#f0f0f0',
  },
});
export default DiscountCalculator;
