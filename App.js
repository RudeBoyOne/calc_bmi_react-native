import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [resultadoVisivel, setResultadoVisivel] = useState(false);

  const classificacaoIMC = (imc) => {
    let classificacao = '';
    switch (true) {
      case imc < 18.5:
        classificacao = 'Abaixo do peso';
        break;
      case imc < 25:
        classificacao = 'Peso normal';
        break;
      case imc < 30:
        classificacao = 'Sobrepeso';
        break;
      case imc < 35:
        classificacao = 'Obesidade grau I';
        break;
      case imc < 40:
        classificacao = 'Obesidade grau II';
        break;
      default:
        classificacao = 'Obesidade grau III';
    }
    return classificacao;
  };

  const calcularIMC = () => {
    const alturaReplace = altura.replace(',', '.');
    const pesoReplace = peso.replace(',', '.');
    const alturaEmMetros = parseFloat(alturaReplace);
    const pesoEmKg = parseFloat(pesoReplace);
    if (isNaN(alturaEmMetros) || isNaN(pesoEmKg) || alturaEmMetros <= 0) {
      alert('Por favor, insira valores válidos para peso e altura.');
      return;
    }
    const imc = (pesoEmKg / (alturaEmMetros * alturaEmMetros)).toFixed(2);
    setResultado(`Seu IMC é ${imc}\n${classificacaoIMC(imc)}`);
    setResultadoVisivel(true);
    setPeso('');
    setAltura('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IMC</Text>
      <View>
        <TextInput 
          style={styles.input} 
          placeholder="Peso em kg" 
          keyboardType="numeric" 
          onChangeText={setPeso}
          value={peso}
          />
        <TextInput 
          style={styles.input} 
          placeholder="Altura em metros" 
          keyboardType="numeric" 
          onChangeText={setAltura}
          value={altura}
          />
      </View>
      <View>
        <Pressable 
          style={styles.button} 
          onPress={calcularIMC} 
          >
            <Text>Calcular</Text>
        </Pressable>
      </View>

      <View>
      {resultadoVisivel && (
        <Text style={styles.resultado}>{resultado}</Text>
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title : {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    textAlign: 'center',
  },

  button: {
    marginTop: 10,
    backgroundColor: '#79da70ff',
    padding: 10,
    borderRadius: 7,
    width: 195,
    alignItems: 'center',
  },

  resultado: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
