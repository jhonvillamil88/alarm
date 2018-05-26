import React from 'react';
import { StyleSheet, Text, View, Alert, Vibration} from 'react-native';
import { CheckBox } from 'react-native-elements'; // 0.16.0
import DatePicker from 'react-native-datepicker'

//const Sound = require('react-native-sound');
//import {Sound} from 'react-native-sound';

export default class App extends React.Component {

  state = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    date:""
  };
  componentWillMount() {
    Alert.alert(
      'Alerta del sistema',
      'Alarma activada',
      [
        {text: 'OK', onPress: this.validateTime},
      ],
      { cancelable: false }
    )
    return { data:[] };
  }
  validateTime = ()=>{
      console.log("comienza la verificacion de dia y hora");
      var _this = this;
      var interval = setInterval(function(){
          
          let date = new Date(); 
          let day = date.getDay();
          let time = _this.format_time(date);

          let weekDay = _this.getDayText(day);
          
          if(_this.state[weekDay]){
            console.log("Dia valido, se validara hora");
            if(!_this.state.date)
                return;

            if( Date.parse('01/01/2011 '+time) >= Date.parse('01/01/2011 '+_this.state.date)  ){
              console.log("Ejecutar alarma");
              _this.vibrateStart();
              _this.soundStart();
              Alert.alert(
                'Alerta del sistema',
                'Se cumplio el alarma, Es hora de levantarse',
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
              );
              clearInterval(interval);
            }
          }
      },1000);
  }

  vibrateStart(){
    console.log("Vibrar");
    const DURATION = 10000 ;

    const PATTERN = [ 1000, 2000, 3000, 4000] ;
      Vibration.vibrate(DURATION) ;
  }
  soundStart(){
    console.log("Sonar");
/*let hello = new Sound('./src/resources/alarma.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(error)
  }
})

hello.play((success) => {
  if (!success) {
    console.log('Sound did not play')
  }
});*/
    
    //const player = await jhon("src/resources/alarma.mp3");
    //console.log(player);
     /*new Player("src/resource/alarma.mp3")
      .play()
      .on('ended', () => {
        // Enable button again after playback finishes
        this.setState({disabled: false});
      });*/
     /* let audio = new Player("alarma.mp3",{
            continuesToPlayInBackground: true
        });
      audio.prepare((err) => {
        console.log("Duracion "+audio.duration);
      });
      setTimeout(function(){
        console.log(audio);
        //audio.play();
        audio.prepare((err) => {
          console.log("Duracion "+audio.duration);
        });

      },5000);*/


     

     /* this.audio = new Player(
                        "network_source.mp3",
                        {
                            autoDestroy: true,
                            continuesToPlayInBackground: true
                        }
                    )
new Promise((resolve) => {
                        return resolve(this.audio)
                    })
                    .then(() => this.audio.play())*/

  }
  
  format_time(date_obj) {
    // formats a javascript Date object into a 12h AM/PM time string
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    var amPM = (hour > 11) ? "pm" : "am";
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
    if(hour < 10) {
      hour = "0" + hour;
    }
    if(minute < 10) {
      minute = "0" + minute;
    }
    return hour + ":" + minute +" "+ amPM;
  }

  getDayText(dayNumber){
    switch(dayNumber){
      case 0:
          return "sunday";
        break;
      case 1:
          return "monday";
        break;
      case 2:
          return "tuesday";
        break;
      case 3:
          return "wednesday";
        break;
      case 4:
          return "thursday";
        break;
      case 5:
          return "friday";
        break;
      case 6:
          return "saturday";
        break;
    }
  }
  render() {
    return (
       <View style={styles.container}>
          <Text>Alarma</Text>
          <Text>Selecciona los dias y la hora que requieres te despierte.</Text>
          <View style={styles.viewMain}>
            <View>
              <Text>Dias</Text>
               <CheckBox
                      title="Lunes" 
                      checked={this.state.monday}
                      onPress={() => this.setState({ monday: !this.state.monday })}
                />
                <CheckBox
                      title="Martes" 
                      checked={this.state.tuesday}
                      onPress={() => this.setState({ tuesday: !this.state.tuesday })}
                />
                <CheckBox
                      title="Miercoles" 
                      checked={this.state.wendesday}
                      onPress={() => this.setState({ wendesday: !this.state.wendesday })}
                />
                <CheckBox
                      title="Jueves" 
                      checked={this.state.thursday}
                      onPress={() => this.setState({ thursday: !this.state.thursday })}
                />
                <CheckBox
                      title="Viernes" 
                      checked={this.state.friday}
                      onPress={() => this.setState({ friday: !this.state.friday })}
                />
                <CheckBox
                      title="Sabado" 
                      checked={this.state.saturday}
                      onPress={() => this.setState({ saturday: !this.state.saturday })}
                />
                <CheckBox
                      title="Domingo" 
                      checked={this.state.sunday}
                      onPress={() => this.setState({ sunday: !this.state.sunday })}
                />
            </View>
            <View style={styles.container}>
              <Text>Hora</Text>
              <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="time"
                  placeholder="Seleccione la hora"
                  format="h:mm a"
                  minDate="2016-05-01"
                  maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
            </View>
          </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'8%'
  },
  viewMain:{
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  }
});
