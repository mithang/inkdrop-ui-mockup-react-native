import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView
} from 'react-native'
import React, { memo, useEffect, useState } from 'react'
// Components
import Header from '@/components/header/header'
// Lib
import { Icon } from 'react-native-eva-icons'
import { bTaskee } from '@/themes/color'
import { useNavigation } from '@react-navigation/native'
import {
  eachWeekOfInterval,
  subDays,
  addDays,
  eachDayOfInterval,
  format,
  isSameDay
} from 'date-fns' // [][]
//redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
//data
import { LIST_DATA3, LIST_DATA4 } from '@/utils/data'
import { IData3 } from '@/utils/types'
//helpers
import { currencyFormat, getWeekDays } from '@/helpers'
import moment, { weekdays } from 'moment'

import { addInfoToList } from '@/redux/infoSlice'
import { addChoiceIndex } from '@/redux/choiceSlice'
import mutiSlice from '../redux/mutiSlice'
import { addMutiIndex } from '@/redux/mutiSlice'
import timeSlice, { addTimetoList } from '@/redux/timeSlice'
import TimeSlice from '../redux/timeSlice'

const CleanHouseScreen: React.FC = () => {
  //Use Hook
  const d = new Date()
  const [isSelected, setIsSelected] = useState(0)

  const [text, setText] = useState('')
  const [choice, setChoice] = useState(0)
  const [money, setMoney] = useState(280000)
  const dispatch = useDispatch()

  const weekDays = getWeekDays()
  console.log('TCL: CleanHouseScreen:React.FC -> weekDays', weekDays)

  useEffect(() => {
    // setA(weekDays)
    console.log('TCL: CleanHouseScreen:React.FC -> isSelected', isSelected)
  }, [weekDays, isSelected])

  // console.log('TCL: CleanHouseScreen -> dates', dates)
  const navigation = useNavigation()
  const handleScreen = () => {
    navigation.navigate('InputScreen')
  }
  // Redux
  const infoSlice = useSelector((state: RootState) => state.infoSlice)

  //Function
  const _renderData = ({ item, index }: { item: IData3; index: number }) => {
    const isActive = Boolean(choice === index)

    return (
      <TouchableOpacity
        onPress={() => {
          const newMoney: any = LIST_DATA3.find(item => item.id === index)
          if (newMoney) {
            setMoney(newMoney.mo)
          }
          setChoice(index)
          dispatch(addMutiIndex(choice))
        }}
        testID={`duration${index}`}
      >
        <View style={[styles.viewBox, isActive ? styles.viewBoxChoice : {}]}>
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <View>
              <Text style={styles.text}>{item.time} giờ</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>{item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  //
  const month = 1 + moment('2022-08-07', 'YYYY/MM/DD').month()
  const year = moment('2022-08-07', 'YYYY/MM/DD').year()
  return (
    <View style={styles.header}>
      <Header nameHeader="Dọn dẹp nhà" iconHeader={'arrow-ios-back-outline'} />

      <View style={styles.body}>
        <ScrollView>
          <View>
            <Text style={styles.text}>Địa chỉ</Text>

            <View style={styles.viewBox}>
              <View style={styles.flexDirectionRow}>
                <Icon
                  name="pin-outline"
                  fill={bTaskee}
                  width={25}
                  height={25}
                />
                <View style={styles.flexDirectionCol}>
                  <View style={{ paddingTop: 5 }}>
                    <Text style={styles.text}>
                      {infoSlice.InfoList.address ? (
                        <Text> {infoSlice.InfoList.address}</Text>
                      ) : (
                        'Hoàng Hoa Thám'
                      )}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 13, width: 240 }}>
                      {infoSlice.InfoList?.district ? (
                        <Text>
                          {infoSlice.InfoList?.district},
                          {infoSlice.InfoList.city}{' '}
                        </Text>
                      ) : (
                        'Hồ Chí Minh, Quận Tân Bình'
                      )}
                    </Text>
                  </View>
                  {/* <View style={{ paddingTop: 10 }}>
                    {LIST_DATA4?.[choiceSlice.index]?.id !== -1 ? (
                      <Text>{LIST_DATA4?.[choiceSlice.index]?.nameChoice}</Text>
                    ) : null}
                  </View> */}
                </View>
                <View style={{ paddingTop: 6 }}>
                  <TouchableOpacity onPress={handleScreen}>
                    <Text style={styles.text2} testID="Change">
                      Thay Đổi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* //View Time */}
          <View style={styles.viewTime}>
            <Text style={styles.text}>Thời lượng</Text>

            <FlatList
              data={LIST_DATA3}
              renderItem={_renderData}
              keyExtractor={(item, index) => `${item.toString()}-${index}`}
            />
          </View>
          <View style={{ paddingTop: 15 }}>
            <View>
              <Text style={styles.text}>Chọn thời gian làm việc</Text>

              <View style={{ paddingLeft: '68%' }}>
                <View>
                  {month < 10 ? (
                    <Text style={styles.text}>
                      Tháng 0{month}/{year}
                    </Text>
                  ) : (
                    <Text style={styles.text}>
                      Tháng {month}/{year}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 15
              }}
            >
              {weekDays.map((item: any, index: number) => {
                console.log('TCL: ', index)
                const weekday = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
                let days = weekday[item.getDay()]
                console.log('TCL: days', days)

                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIsSelected(index)
                      dispatch(
                        addTimetoList({
                          id: index,
                          date: days,
                          day: moment(weekDays[index]).format('DD/MM/YYYY')
                        })
                      )
                    }}
                    key={index}
                    testID={`week${index}`}
                  >
                    {index === isSelected ? (
                      <View
                        style={{
                          backgroundColor: bTaskee,
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 5
                        }}
                      >
                        <Text
                          style={[styles.textChoice, { fontWeight: 'bold' }]}
                        >
                          {days}
                        </Text>
                        <View style={{ marginTop: 10 }}>
                          {item.getDate() < 10 ? (
                            <Text style={styles.textChoice}>
                              0{item.getDate()}
                            </Text>
                          ) : (
                            <Text style={styles.textChoice}>
                              {item.getDate()}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View
                        key={index}
                        style={{
                          paddingVertical: 10,
                          paddingHorizontal: 10,
                          borderRadius: 5,
                          backgroundColor: '#fff',
                          shadowRadius: 1,
                          borderWidth: 0.5,
                          borderColor: '#b0acac'
                        }}
                      >
                        <Text style={styles.textChoice2}>{days}</Text>
                        <View style={{ marginTop: 10, marginLeft: 2 }}>
                          {item.getDate() < 10 ? (
                            <Text style={styles.dontChoice}>
                              0{item.getDate()}
                            </Text>
                          ) : (
                            <Text style={styles.dontChoice}>
                              {item.getDate()}
                            </Text>
                          )}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <View
            style={{
              marginTop: 15
            }}
          >
            <Text style={styles.text}>Ghi chú cho người làm</Text>

            <TextInput
              style={{
                marginTop: 10,
                borderColor: 'gray',
                backgroundColor: '#fff',
                borderWidth: 1,
                padding: 10,
                paddingBottom: 70,
                borderRadius: 5
              }}
              placeholder="Bạn có yêu cầu gì thêm, hãy nhập ở đây nhé"
              onChangeText={setText}
              value={text}
              testID={'textAdress'}
            />
          </View>
        </ScrollView>
        <View style={styles.viewBox3}>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity
              testID="btnTieptheo"
              onPress={() => {
                navigation.navigate('ChoiceScreen')

                dispatch(addInfoToList({ ...infoSlice.InfoList, text, money }))

                dispatch(addMutiIndex(choice))
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: -9,
                  flexDirection: 'row'
                }}
              >
                <View>
                  {money ? (
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                      {currencyFormat(money)}
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                      {currencyFormat(money)}
                    </Text>
                  )}
                </View>
                <View style={{ marginLeft: 175 }}>
                  <Text style={{ color: '#fff' }}>Tiếp Theo</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default memo(CleanHouseScreen)

const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  body: {
    padding: 15
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
  viewBox: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',

    width: 'auto'
  },
  flexDirectionRow: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  },
  flexDirectionCol: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingBottom: 1
  },
  text2: {
    color: bTaskee
  },
  viewTime: {
    paddingTop: 15
  },
  viewBoxChoice: {
    shadowColor: bTaskee,

    marginTop: 10,
    borderColor: bTaskee,
    borderWidth: 1,
    borderRadius: 5
  },
  viewBox3: {
    marginTop: 43,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: '#2CB55E',
    width: 'auto'
  },
  textChoice: {
    fontSize: 15,
    color: '#fff'
  },

  textChoice2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  dontChoice: {
    fontSize: 14,
    color: '#000'
  }
})
