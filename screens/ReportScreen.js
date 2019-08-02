import React, { Component } from 'react';
import { StyleSheet, View, Dimensions,ActivityIndicator } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Picker, Content, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import Graph from '../components/Graph';
import firebase from 'firebase';
const { width, height } = Dimensions.get('window');
import axios from 'axios';

export default class ReportScreen extends Component {
    state = {
        reportType: 1,
        loading:true
    }

    componentWillMount(){
            
        this.getDailyReport();
        
            
        
    }
    componentDidMount(){
        
    }
    getDailyReport(){
        this.setState({loading:true})
        axios.post(`http://34.74.104.48:8080/dailyreport`, {
            user_id : firebase.auth().currentUser.uid
        }).then(res => {
            const data = res.data;
            let percentengeDaily = []
            let labelDaily = []
            for(var i = 0; i <data.report.length;i++){
                percentengeDaily.push(data.report[i].avg_percentage)
                labelDaily.push(data.report[i].date)

            }
            const data1 = {
                labels: labelDaily,
                datasets: [{
                  data: percentengeDaily
                }]
              }
             this.setState({dailydata:data1,loading:false})
             this.getMonthlyReport();
        
          }).catch((error)=>{
              alert(error)
              this.setState({ loading : false })
          });
    }
    getMonthlyReport(){
        this.setState({loading:true})
        axios.post(`http://34.74.104.48:8080/monthlyreport`, {
            user_id : firebase.auth().currentUser.uid
        }).then(res => {
            const data = res.data;
            let percentengeMonthly = []
            let labelMonthly = []
            for(var i = 0; i <data.report.length;i++){
                percentengeMonthly.push(data.report[i].avg_percentage)
                labelMonthly.push(data.report[i].month)

            }
            const data2 = {
                labels: labelMonthly,
                datasets: [{
                  data: percentengeMonthly
                }]
              }
             this.setState({monthlydata:data2,loading:false})
             this.getYearlyReport();
          }).catch((error)=>{
              alert(error)
              this.setState({ loading : false })
          });
    }
    getYearlyReport(){
        this.setState({loading:true})
        axios.post(`http://34.74.104.48:8080/yearlyreport`, {
            user_id : firebase.auth().currentUser.uid
        }).then(res => {
            const data = res.data;
            let percentengeYearly = []
            let labelYearly = []
            for(var i = 0; i <data.report.length;i++){
                percentengeYearly.push(data.report[i].avg_percentage)
                labelYearly.push(data.report[i].year)

            }
            const data3 = {
                labels: labelYearly,
                datasets: [{
                  data: percentengeYearly
                }]
              }
             this.setState({yearlydata:data3,loading:false})
          }).catch((error)=>{
              alert(error)
              this.setState({ loading : false })
          });
    }

    _renderComponent = () => {
        if (this.state.reportType == "1")
            return (<Graph  data={this.state.dailydata}/>)


        if (this.state.reportType == "2")
            return (<Graph data={this.state.monthlydata}/>)

        else
            return (<Graph  data={this.state.yearlydata}/>)

    }

    render() {
        if(this.state.loading==true){
            return(
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                  <ActivityIndicator size="large" color="#0000ff" />
         
                </View>)
        }
        else{
            return (
                <View style={styles.container}>
                    <View style={styles.buttoncontainer}>
                        {/* <Segment style={{backgroundColor: 'white'}}>
                <Button first  active={this.state.activePage === 1}
                  onPress={this.selectComponent(1)} >
                <Text>Daily Report</Text>
                </Button>
                <Button active={this.state.activePage === 2}
                  onPress= {this.selectComponent(2)}>
                    <Text>Monthly Report</Text>
                </Button>
                <Button last active={this.state.activePage === 3}
                  onPress= {this.selectComponent(3)} >
                    <Text>Yearly Report</Text>
                </Button>
              </Segment> */}
                        {/* <Button small primary style={styles.button}>
                    <Text>Daily Report</Text>
                  </Button> */}
                        <Button small bordered style={styles.button}>
                            <Text primary> Report Type </Text>
                            <Picker
    
                                selectedValue={this.state.reportType}
                                style={{ height: 50, width: width / 2, color: 'blue' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ reportType: itemValue })
                                }>
                                <Picker.Item label="Daily" value="1" />
                                <Picker.Item label="Monthly" value="2" />
                                <Picker.Item label="Yearly" value="3" />
                            </Picker>
                        </Button>
                        {/* <Button small primary style={styles.button}>
                    <Text>Yearly Report</Text>
                  </Button> */}
    
                    </View>
    
                    <Content padder>
                        {this._renderComponent()}
                    </Content>
    
                </View>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: width
    },
    buttoncontainer: {
        backgroundColor: 'white',
        width: width,
        marginVertical: 30,
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',

    }
})
